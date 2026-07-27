import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/suppliers': 'http://127.0.0.1:5000',
      '/supplier': 'http://127.0.0.1:5000',
      '/login': 'http://127.0.0.1:5000',
      '/register': 'http://127.0.0.1:5000'
    }
  }
})
