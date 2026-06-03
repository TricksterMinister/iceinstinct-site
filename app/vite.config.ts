import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { composeWithGemini, type Choices } from './server/profilerHandler';

const r = (p: string) => resolve(__dirname, p);

// Read the Gemini key from the SERVER environment only. Order: process env,
// then a gitignored .env.server next to this config. This value lives in the
// Node process; it is never referenced from client code and never bundled.
function readServerKey(): string {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const f = r('.env.server');
  if (existsSync(f)) {
    const m = readFileSync(f, 'utf8').match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/m);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  return '';
}

// Local dev proxy: POST /api/profiler -> Gemini. Mirrors the prod serverless
// function contract so the client code is identical in dev and prod.
function profilerProxy(): Plugin {
  return {
    name: 'profiler-proxy',
    configureServer(server) {
      server.middlewares.use('/api/profiler', (req, res, next) => {
        if (req.method !== 'POST') return next();
        let body = '';
        req.on('data', (c) => { body += c; if (body.length > 1e4) req.destroy(); });
        req.on('end', async () => {
          let choices: Choices = {};
          try { choices = JSON.parse(body || '{}'); } catch { /* ignore */ }
          const recipe = await composeWithGemini(choices, readServerKey());
          res.setHeader('content-type', 'application/json');
          if (recipe) { res.statusCode = 200; res.end(JSON.stringify({ recipe })); }
          else { res.statusCode = 502; res.end(JSON.stringify({ error: 'compose_unavailable' })); }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), profilerProxy()],
  resolve: {
    // motion v11 ships its own React import path; dedupe so the dev-server
    // dependency optimizer does not load a second React copy (which causes
    // "Invalid hook call" when motion hooks run).
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Co-bundle React with motion so the dev optimizer pre-bundles them against
    // ONE React instance. Without this, motion's hooks (useSpring/useTransform)
    // run against a separate React dispatcher -> "Invalid hook call".
    include: ['react', 'react-dom', 'react/jsx-runtime', 'motion', 'motion/react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets-build',
    rollupOptions: {
      input: {
        home: r('index.html'),
        privacy: r('privacy/index.html'),
        terms: r('terms/index.html'),
        contact: r('contact/index.html'),
        offerings: r('offerings/index.html'),
        conciergePage: r('concierge/index.html'),
        gallery: r('gallery/index.html'),
        foundation: r('offerings/foundation/index.html'),
        simplicity: r('offerings/simplicity/index.html'),
        bespoke: r('offerings/bespoke/index.html'),
        omakase: r('offerings/omakase/index.html'),
        mystory: r('my-story/index.html'),
      },
    },
  },
});
