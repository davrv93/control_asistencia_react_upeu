
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/control_asistencia_react_upeu/', // Muy importante
  plugins: [react()],
  server: {
    port: 5173
  }
})
