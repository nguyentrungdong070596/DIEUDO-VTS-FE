import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // RẤT QUAN TRỌNG để load đúng đường dẫn khi deploy IIS

  plugins: [react(), tailwindcss()],
});
