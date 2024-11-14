import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseURL =
    mode === "local-dev" ? "http://localhost:3000" : "https://csworldfreelance.netlify.app";

  return {
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    plugins: [react()],
    define: {
      BaseUrl: JSON.stringify(baseURL),
    },
  };
});
