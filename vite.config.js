import { resolve } from "path";
import { defineConfig } from "vite";
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/htmx.js"),
      formats: ["es"],
      name: "[name]",
      fileName: "[name]",
    },
    outDir: "assets",
    emptyOutDir: false,
    // plugins: [tailwindcss(), autoprefixer()],
  },
});
