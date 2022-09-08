import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "@affinity-rpg/data",
      // the proper extensions will be added
      fileName: "affinity-rpg_data",
    },
  },
});
