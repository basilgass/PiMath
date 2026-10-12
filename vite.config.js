/** @type {import('vite').UserConfig} */

import {defineConfig} from "vitest/config"
import {resolve} from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({mode}) => ({
	build: {
		lib: {
			name: "PiMath",
			fileName: "pimath",
			entry: resolve(import.meta.dirname, "src/index.ts"),
			formats: ["es"]
		},
		outDir: "dist",
		copyPublicDir: false,
		sourcemap: true,
		emptyOutDir: true,
	},
	test: {
		// The tests of the generators draw ten times more examples in the "full" mode (see tests/helpers/draws.ts):
		// the time allowed to a test follows, or a slow machine turns a long test into a failure.
		testTimeout: mode === "full" ? 30_000 : 5_000,
	},
	plugins: [
		vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
		tailwindcss()
	]
}))