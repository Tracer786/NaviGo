import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/

// Add the @tailwindcss/vite plugin to your Vite configuration.
export default defineConfig({
  plugins: [react()],
  plugins: [
    tailwindcss(),
  ]
})

// https://tailwindcss.com/docs/installation/using-vite
