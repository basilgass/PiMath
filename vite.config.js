import {defineConfig} from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/main.ts",
			name: "PiMath",
			fileName: "pimath"
		}
	},
	rollupOptions: {
		external: ["vue"],
		output: {
			globals: {
				vue: "Vue"
			}
		}
		// input: {
		// 	main: resolve(__dirname, "src/index.html"),
		// 	playground: "src/demo/playground.html"
		// }
	}
})