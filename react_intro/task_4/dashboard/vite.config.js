import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  webServer: {
    command: 'npm run dev -- --host 0.0.0.0',
    url: 'http://localhost:5173',
    reuseExistingServer: false,
    timeout: 120000,
  }
})
