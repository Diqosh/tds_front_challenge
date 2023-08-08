import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/tds_front_challenge/",
  build: {
    outDir: "dist",
  },
});
