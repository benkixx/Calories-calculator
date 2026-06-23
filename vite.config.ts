import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative asset URLs keep the production build portable on GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
})
