import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [process.env.RENDER_EXTERNAL_HOSTNAME || 'hospital-appointment-frontend-0v12.onrender.com'],
    port: process.env.PORT || 10000,
    host: true
  },
  server: {
    host: true,
    port: 5173
  }
})
