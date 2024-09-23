// vite.config.js
import { defineConfig } from "file:///C:/websites/PiMath/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dtsPlugin from "file:///C:/websites/PiMath/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\websites\\PiMath";
var vite_config_default = defineConfig({
  build: {
    lib: {
      name: "PiMath",
      fileName: "pimath",
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"]
    }
  },
  plugins: [
    dtsPlugin({
      include: ["src", "es2022"],
      outDir: "./types"
    })
    // generate .d.ts files for the src folder
  ],
  rollupOptions: {
    external: ["vue"],
    output: {
      globals: {
        Vue: "Vue"
      }
    }
    // input: {
    // 	main: resolve(__dirname, "src/index.html"),
    // 	playground: "src/demo/playground.html"
    // }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWJzaXRlc1xcXFxQaU1hdGhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdlYnNpdGVzXFxcXFBpTWF0aFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2Vic2l0ZXMvUGlNYXRoL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgZHRzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRidWlsZDoge1xyXG5cdFx0bGliOiB7XHJcblx0XHRcdG5hbWU6IFwiUGlNYXRoXCIsXHJcblx0XHRcdGZpbGVOYW1lOiBcInBpbWF0aFwiLFxyXG5cdFx0XHRlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxyXG5cdFx0XHRmb3JtYXRzOiBbXCJlc1wiXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cGx1Z2luczogW1xyXG5cdFx0ZHRzUGx1Z2luKHtcclxuXHRcdFx0aW5jbHVkZTogWydzcmMnLCBcImVzMjAyMlwiXSxcclxuXHRcdFx0b3V0RGlyOiBcIi4vdHlwZXNcIlxyXG5cdFx0fSksIC8vIGdlbmVyYXRlIC5kLnRzIGZpbGVzIGZvciB0aGUgc3JjIGZvbGRlclxyXG5cdF0sXHJcblx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0ZXh0ZXJuYWw6IFtcInZ1ZVwiXSxcclxuXHRcdG91dHB1dDoge1xyXG5cdFx0XHRnbG9iYWxzOiB7XHJcblx0XHRcdFx0VnVlOiBcIlZ1ZVwiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIGlucHV0OiB7XHJcblx0XHQvLyBcdG1haW46IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC5odG1sXCIpLFxyXG5cdFx0Ly8gXHRwbGF5Z3JvdW5kOiBcInNyYy9kZW1vL3BsYXlncm91bmQuaHRtbFwiXHJcblx0XHQvLyB9XHJcblx0fVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sU0FBUyxvQkFBb0I7QUFDM1EsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZUFBZTtBQUZ0QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDZjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLFFBQVE7QUFBQSxNQUN6QixRQUFRO0FBQUEsSUFDVCxDQUFDO0FBQUE7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDZCxVQUFVLENBQUMsS0FBSztBQUFBLElBQ2hCLFFBQVE7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNSLEtBQUs7QUFBQSxNQUNOO0FBQUEsSUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
