import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // Local development only
    server: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',   // ← Fixed
          changeOrigin: true,
          secure: false,
        }
      }
    },

    // For `vite preview` command
    preview: {
      host: '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    },

    // Remove this line → it's not a valid Vite option
    // allowedHosts: ['frontend2-g0up.onrender.com'],
  };
});