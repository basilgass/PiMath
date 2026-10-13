// Renders the LaTeX written in the JSDoc (`\(...\)`, `\[...\]`, `$...$`, `$$...$$`) with KaTeX.
// Same engine and version as the documentation site (`katex` in package.json); the integrity
// hashes are those of the files published by that version.
import { JSX } from "typedoc";

const KATEX = "https://cdn.jsdelivr.net/npm/katex@0.19.0/dist";

export function load(app) {
    app.renderer.hooks.on("head.end", () =>
        JSX.createElement(JSX.Fragment, null,
            JSX.createElement("link", {
                rel: "stylesheet",
                href: `${KATEX}/katex.min.css`,
                integrity: "sha384-3rdsX6e5mueWyoweR9NIVmtEsUkokpBT/0ALqKKIBMr9j4qhHkaIkAcGgsE6uVlp",
                crossorigin: "anonymous"
            }),
            JSX.createElement("script", {
                defer: true,
                src: `${KATEX}/katex.min.js`,
                integrity: "sha384-QFFtAGzvvj+bfgCGxXJlNZZR1nXEZgvG8tDLCCY1F19xl20WlfTYgguB4VcNdxYk",
                crossorigin: "anonymous"
            }),
            JSX.createElement("script", {
                defer: true,
                src: `${KATEX}/contrib/auto-render.min.js`,
                integrity: "sha384-bjyGPfbij8/NDKJhSGZNP/khQVgtHUE5exjm4Ydllo42FwIgYsdLO2lXGmRBf5Mz",
                crossorigin: "anonymous",
                onload: "renderMathInElement(document.body, {delimiters: [" +
                    "{left: '$$', right: '$$', display: true}," +
                    "{left: '\\\\[', right: '\\\\]', display: true}," +
                    "{left: '\\\\(', right: '\\\\)', display: false}," +
                    "{left: '$', right: '$', display: false}]});"
            })
        )
    );
}
