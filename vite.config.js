import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseURL =
    mode === "local-dev" ? "http://localhost:3000" : "https://api.cs-world.com.ua";

  return {
    plugins: [react()],
    define: {
      BaseUrl: JSON.stringify(baseURL),
    },
  };
});
