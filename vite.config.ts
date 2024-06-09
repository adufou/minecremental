import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/minecremental', // from https://stackoverflow.com/questions/74518887/blank-page-when-deploying-a-react-app-to-github-pages-and-vite when doing https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [
        vue(),
        VueDevTools({
            launchEditor: 'phpstorm',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        coverage: {
            // you can include other reporters, but 'json-summary' is required, json is recommended
            reporter: ['text', 'json-summary', 'json'],
            // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
            reportOnFailure: true,
        },
    },
});
