/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define the root of your project if it's not the directory where vite.config.js is located
  // root: path.resolve(__dirname, './'), 

  ssr: {
    // Ensure Express is treated as an external dependency during the server build
    external: ['express'],
    noExternal: ['react-helmet-async']
  },
  optimizeDeps: {
    include: ['react-helmet-async'], // 👈 ensures Vite pre-bundles this module correctly
  },

  build: {
    // The 'outDir' should not be specified here if you are using separate
    // CLI commands for client and server builds with different --outDir flags.
    // Vite will automatically use 'dist' as a default if not specified elsewhere.

    // To fix the index.html not found error, we must ensure rollup knows about the html entry point:
    rollupOptions: {
      input: {
        // Use path.resolve to define the absolute path to your index.html
        main: path.resolve(__dirname, 'index.html'),
      },
      // Note: The output directories are handled by the CLI scripts in package.json
    },
  },
});
