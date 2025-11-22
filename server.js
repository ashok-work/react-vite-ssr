/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

// Helper to get the current directory name in an ES module environment
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5173;

async function createServer() {
  const app = express();

  /** @type {import('vite').ViteDevServer} */
  let vite;

  if (!isProduction) {
    // Development Mode: Use Vite's development server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
      appType: 'custom',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve static files from the 'dist/client' directory
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }));
  }

  // Handle all requests (the main SSR logic)
  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template;
      let render;

      if (!isProduction) {
        // Dev: Use Vite's transformIndexHtml to inject HMR scripts and process HTML
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        // Load the server entry file dynamically using Vite
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        // Prod: Read the pre-built index.html and the server bundle
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
        // The production server bundle is dist/server/entry-server.js
        render = (await import('./dist/server/entry-server.js')).render;
      }

      // 2. Render the application (calling the function from entry-server.jsx)
      const { html: appHtml, preloadedState, helmet } = await render(url);

      // 3. Inject the app HTML and the Redux preloaded state into the template
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(
          `<!--preloaded-state-->`,
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
        )
        // Inject the collected <head> tags just before the closing </head> or anywhere in the head
        .replace(
          `</head>`,
          `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}</head>`
        );
      // 4. Send the rendered HTML response
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);

    } catch (e) {
      // If an error is caught, let Vite fix the stack trace (in dev)
      vite && vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

createServer();
