import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    server: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
      
      // ← Add this to fix the "Blocked request" error
      allowedHosts: [
        'frontend2-g0up.onrender.com',
        '.onrender.com',           // allows all *.onrender.com subdomains
        'localhost'
      ],

      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    },

    preview: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
      allowedHosts: [
        'frontend2-g0up.onrender.com',
        '.onrender.com'
      ]
    }
  };
});