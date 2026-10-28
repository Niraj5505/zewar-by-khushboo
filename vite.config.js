import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        try {
          const urlPath = req.url.split('?')[0].replace('/api/', '');
          let modulePath;
          if (urlPath === 'health') {
            modulePath = './api/health.js';
          } else if (urlPath === 'auth/login') {
            modulePath = './api/auth/login.js';
          } else if (urlPath === 'auth/register') {
            modulePath = './api/auth/register.js';
          } else if (urlPath === 'auth/update') {
            modulePath = './api/auth/update.js';
          } else {
            return next();
          }

          const handlerModule = await import(modulePath);
          await handlerModule.default(req, res);
        } catch (err) {
          console.error('API Dev Middleware Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  base: '/',
  server: {
    port: 5173,
    host: true,
  },
});
