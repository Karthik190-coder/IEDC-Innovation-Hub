import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //new import
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()], //ADDED tailwind
})