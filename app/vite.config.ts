import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [react()],
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
        weddings: r('weddings/index.html'),
        corporate: r('corporate/index.html'),
        gift: r('gift/index.html'),
        cookies: r('cookies/index.html'),
        accessibility: r('accessibility/index.html'),
        responsibleService: r('responsible-service/index.html'),
      },
    },
  },
});
