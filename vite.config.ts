import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        Icons({
            compiler: 'svelte',
        }),
    ],
    base: './', // Use relative paths
    optimizeDeps: {
        include: ['custom_digitaljs'],
    },
    build: {
        rollupOptions: {
            external: ['jquery', 'jquery-ui', 'custom_digitaljs'],
            output: {
                globals: {
                    jquery: 'jQuery',
                },
            },
        },
        commonjsOptions: {
            include: [/custom_digitaljs/, /node_modules/],
            transformMixedEsModules: true,
        },
    },
})
