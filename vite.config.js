import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/game/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/game/hooks"),
      "@pages": path.resolve(__dirname, "src/game/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/game/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@customFirebase": path.resolve(__dirname, "src/firebase"),
      "@services": path.resolve(__dirname, "src/game/services"),
    },
  },
});
