import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [react()],
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
