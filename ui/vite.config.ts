// ui/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: ".",      // Vite busca index.html en la raíz de ui/
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist",    // Salida: ui/dist
    emptyOutDir: true,
  },
  server: {
    port: 3001,        // Solo para `npm run dev`
  },
});
