import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local form submit → production API (env secrets live on Vercel)
      '/api': {
        target: 'https://www.tivonix.tech',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
