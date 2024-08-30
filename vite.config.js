import { defineConfig } from "vite"
import { resolve } from "path"
import dtsPlugin from "vite-plugin-dts"

export default defineConfig({
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
			output: resolve(__dirname, "dist"),
		}
	},
	plugins: [
		dtsPlugin({ include: ['src', "es2022"] }), // generate .d.ts files for the src folder
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
})