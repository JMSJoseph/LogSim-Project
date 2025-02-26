import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './', // Use relative paths
  optimizeDeps: {
    include: ['custom_digitaljs'],
  },
  build: {
    rollupOptions: {
      external: ['jquery', 'jquery-ui'],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
  }
})
