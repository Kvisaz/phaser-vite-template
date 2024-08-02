import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        host: '0.0.0.0',
        port: 8000,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
    },
});
