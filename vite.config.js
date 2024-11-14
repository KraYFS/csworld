import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseURL =  "https://csworldfreelance.netlify.app";

  return {
    plugins: [react()],
    define: {
      BaseUrl: JSON.stringify(baseURL),
    },
  };
});
