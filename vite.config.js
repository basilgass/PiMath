/** @type {import('vite').UserConfig} */

import {defineConfig} from "vitest/config"
import {resolve} from "path"

export default defineConfig(({mode}) => ({
	build: {
		lib: {
			name: "PiMath",
			// `pimath` is the library; `completions` and `codemirror` are the optional helpers of the editors.
			fileName: (_format, entryName) => `${entryName}.js`,
			entry: {
				pimath: resolve(import.meta.dirname, "src/index.ts"),
				completions: resolve(import.meta.dirname, "src/completions/index.ts"),
				codemirror: resolve(import.meta.dirname, "src/completions/codemirror.ts"),
			},
			formats: ["es"]
		},
		rollupOptions: {
			external: [/^@codemirror\//],
			// The code shared by the entry points (the completion data) goes in one file with a stable name.
			output: {chunkFileNames: "shared.js"},
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
	}
}))