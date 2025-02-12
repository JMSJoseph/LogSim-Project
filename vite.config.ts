import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './', // Use relative paths
  optimizeDeps: {
    include: ['custom_digitalJS'],
  },
  build: {
    rollupOptions: {
      external: ['jquery', 'jquery-ui'],
      output: {
        globals: {
          'jquery': 'jQuery'
        }
      }

    },
    commonjsOptions: {
      include: [/custom_digitalJS/, /node_modules/],
      transformMixedEsModules: true
    },
  }
})
