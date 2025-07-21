import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /auth, /cars, etc to backend
      "/auth": {
        target: "http://52.74.26.144:8008",
        changeOrigin: true,
        secure: false,
      },
      "/client": {
        target: "http://52.74.26.144:8008",
        changeOrigin: true,
        secure: false,
      },
      "/device":{
        target: "http://52.74.26.144:8008",
        changeOrigin: true,
        secure: false,
      }
      // Add more endpoints as needed
    },
  },
});
