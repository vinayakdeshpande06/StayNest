import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/user-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/admin-service': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin-service/, '')
      },
      '/ai-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
