import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {},
  },
  base: "/nono/",
  // base: "/",

  // build: {
  //   rollupOptions: {
  //     external: [
  //       // ...其他外部模块
  //       /^@babel\/runtime-corejs3/,
  //     ],
  //   },
  // },
});
