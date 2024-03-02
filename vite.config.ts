import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {},
  },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       // ...其他外部模块
  //       /^@babel\/runtime-corejs3/,
  //     ],
  //   },
  // },
});
