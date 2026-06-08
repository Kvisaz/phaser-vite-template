import { defineConfig } from "vite";

export default defineConfig({
  root: "storybook",
  base: "./",
  publicDir: "../public",
  build: {
    outDir: "../docs/storybook",
    emptyOutDir: true,
    sourcemap: true,
    target: "es2015",
    rollupOptions: {
      output: {
        entryFileNames: "bundle.[hash].js",
        chunkFileNames: "bundle.[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8081,
    strictPort: true,
    fs: {
      allow: [".."],
    },
  },
});
