import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // proxy: {
    //   "/img": {
    //     target: "http://localhost:3001", // Update to port 3001
    //     secure: false,
    //     changeOrigin: true,
    //     // rewrite: (path) =>
    //     //   path.replace(
    //     //     /^\/img/,
    //     //     "/VIRTUAL_FARM_MARKET"
    //     //   ), // Update the path
    //   },
    // },
  },
});
