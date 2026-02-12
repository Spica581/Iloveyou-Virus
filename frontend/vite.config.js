import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
        }
      }
    },

    // ← This is the important part for Web Service
    preview: {
      host: true,
      port: 4173,
      allowedHosts: true [
        'frontend2-g0up.onrender.com',
        '.onrender.com',        // allows all *.onrender.com domains
        'localhost'
      ]
    }
  };
});