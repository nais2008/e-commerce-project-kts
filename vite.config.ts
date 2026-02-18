import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      data: path.resolve(__dirname, "src/data"),
      constants: path.resolve(__dirname, "src/constants"),
      config: path.resolve(__dirname, "src/config"),
      types: path.resolve(__dirname, "src/types"),
      styles: path.resolve(__dirname, "src/styles"),
      utils: path.resolve(__dirname, "src/utils"),
      pages: path.resolve(__dirname, "src/pages"),
      providers: path.resolve(__dirname, "src/providers"),
      hooks: path.resolve(__dirname, "src/hooks"),
      shared: path.resolve(__dirname, "src/shared"),
      store: path.resolve(__dirname, "src/store"),
    },
  },
})
