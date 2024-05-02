import {defineConfig} from "vite";
import {resolve} from "path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			formats: ["es"],
		}
	},
	plugins: [
		dtsPlugin({include: ['lib']}), // generate .d.ts files for the lib folder
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