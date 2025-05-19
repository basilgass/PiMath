/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite"
import { resolve } from "path"
import dtsPlugin from "vite-plugin-dts"

export default defineConfig({
	build: {
		lib: {
			name: "PiMath",
			fileName: "pimath",
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"]
		},
		outDir: "dist",
		copyPublicDir: false,
		sourcemap: true,
		emptyOutDir: true,
	},
	plugins: [
		dtsPlugin({
			include: ["src/**/*.ts"],
			outDir: "types"
		}), // generate .d.ts files for the src folder
	],
	rollupOptions: {
		external: ["vue"],
		output: {
			globals: {
				Vue: "Vue"
			}
		}
	}
})