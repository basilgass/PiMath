/**
 * Runs the code examples of the documentation (`docs/**\/*.md`, not the generated fragments) against the library
 * built from `src/`, and fails when an example throws or prints something else than what its comment announces.
 * Run it with `npm run docs:check`.
 *
 * Conventions of an example (a fenced block whose language is `js`):
 *  - `expr // result` compares the value of `expr` with `result`, the way `console.log` would show it
 *    (a string as it is; an array or an object as `util.inspect` writes it on one line);
 *  - `expr // e.g. result` only runs `expr`: the output is random, so it is not compared;
 *  - `expr // throws ParseError` expects `expr` to throw an error of that class (matched by name);
 *  - `console.log(expr) // result` is read like `expr // result`;
 *  - a comment on a line of its own is free text; a trailing comment is always an expected result;
 *  - an expression spread over several lines cannot be compared: put the result on a line of its own;
 *  - the block is run as it is: ```js no-run``` skips a block that cannot run (a fragment, a browser snippet);
 *  - the exports of the library (`Fraction`, `Point`...) are available as free names in every block, and `PiMath` is
 *    the default export; `import ... from 'pimath'` lines are accepted but not needed.
 *  - the blocks of a page are independent: each one declares what it uses.
 *
 * The library is built in a temporary folder, `dist/` is not touched.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import util from 'node:util'
import {execFileSync} from 'node:child_process'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {build} from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(root, 'docs')

// The data of the editor completion are generated from the API: they must be up to date.
execFileSync(process.execPath, [path.join(root, 'scripts/completions.mjs'), '--check'], {stdio: 'inherit'})

// ── build the library from src/ ──────────────────────────────────────────────

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pimath-docs-check-'))
await build({
    root,
    configFile: path.join(root, 'vite.config.js'),
    logLevel: 'error',
    // not minified: the messages show the real names of the classes
    build: {outDir, emptyOutDir: true, sourcemap: false, minify: false},
})
const module_ = await import(pathToFileURL(path.join(outDir, 'pimath.js')).href)
const PiMath = module_.default

const {examples: demoExamples} = await import(pathToFileURL(path.join(docsDir, '.vitepress/theme/demoExamples.mjs')).href)
const {runExample} = await import(pathToFileURL(path.join(docsDir, '.vitepress/theme/run.mjs')).href)

// ── find the examples ────────────────────────────────────────────────────────

function markdownFiles(dir) {
    return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) return ['.vitepress', '_generated', 'public', 'node_modules'].includes(entry.name) ? [] : markdownFiles(full)
        return entry.name.endsWith('.md') ? [full] : []
    })
}

/** The `js` blocks of a Markdown file: `{line, lines, skip}`, where `line` is the line of the first code line. */
function blocksOf(file) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
    const blocks = []
    for (let i = 0; i < lines.length; i++) {
        const open = /^```(\w*)\s*(.*)$/.exec(lines[i])
        if (!open) continue
        let end = i + 1
        while (end < lines.length && !/^```\s*$/.test(lines[end])) end++
        if (open[1] === 'js') blocks.push({line: i + 2, lines: lines.slice(i + 1, end), skip: /\bno-run\b/.test(open[2])})
        i = end
    }
    return blocks
}

// ── rewrite a block so that each commented expression is checked ─────────────

const STATEMENT = /^\s*(const|let|var|function|class|import|export|if|for|while|return|throw|try|catch|switch|else|\}|\{)\b/
const balanced = text => {
    let depth = 0
    // the brackets inside a string literal do not count
    for (const ch of text.replace(/'[^']*'|"[^"]*"/g, '')) depth += '([{'.includes(ch) ? 1 : ')]}'.includes(ch) ? -1 : 0
    return depth === 0
}

function prepare(block) {
    return block.lines.map((text, i) => {
        const importAll = /^\s*import\s+PiMath\s+from\s+['"]pimath['"]\s*;?\s*$/.test(text)
        if (importAll) return ''
        const importNames = /^\s*import\s*\{(.*)\}\s*from\s*['"]pimath['"]\s*;?\s*$/.exec(text)
        if (importNames) return `const {${importNames[1]}} = __module`

        const at = text.indexOf(' // ')
        if (at === -1) return text
        const expression = text.slice(0, at).trim()
        const expected = text.slice(at + 4).trim()
        const own = text.slice(0, at).trim() === ''
        if (own || STATEMENT.test(expression) || !balanced(expression) || /[,{(\[]$|=>$/.test(expression)) return text
        const value = expression.replace(/;$/, '')
        return `;__check(${block.line + i}, () => (${value}), ${JSON.stringify(expected)})`
    }).join('\n')
}

// ── run ──────────────────────────────────────────────────────────────────────

const failures = []
let checked = 0
let blocksRun = 0
let blocksSkipped = 0

const show = value => (typeof value === 'string' ? value : typeof value === 'object' && value !== null
    ? util.inspect(value, {breakLength: Infinity, depth: 4})
    : String(value))

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

for (const file of markdownFiles(docsDir)) {
    const relative = path.relative(root, file).replace(/\\/g, '/')
    for (const block of blocksOf(file)) {
        if (block.skip) {
            blocksSkipped++
            continue
        }
        blocksRun++
        const check = (line, thunk, expected) => {
            checked++
            const expectedError = /^throws (\w+)$/.exec(expected)?.[1]
            let actual
            try {
                actual = show(thunk())
                if (expectedError) {
                    failures.push(`${relative}:${line}: expected ${expectedError} to be thrown\n      got      ${actual}`)
                    return
                }
            } catch (error) {
                if (expectedError) {
                    if (error?.constructor?.name !== expectedError) {
                        failures.push(`${relative}:${line}: expected ${expectedError}\n      got      ${error?.constructor?.name}: ${error?.message}`)
                    }
                    return
                }
                failures.push(`${relative}:${line}: throws ${error?.constructor?.name ?? 'Error'}: ${error?.message}`)
                return
            }
            if (/^e\.g\.(\s|$)/.test(expected)) return
            if (actual !== expected) failures.push(`${relative}:${line}: expected ${expected}\n      got      ${actual}`)
        }
        try {
            // `console.log(x)` returns x, so that its value is the one compared with the comment.
            // `with` gives the exports of the library as free names, as if the page had imported them; a `const` of the
            // example shadows them.
            const body = `with (__module) {\n${prepare(block)}\n}`
            await new AsyncFunction('PiMath', '__module', '__check', 'console', body)(PiMath, module_, check, {log: value => value})
        } catch (error) {
            failures.push(`${relative}:${block.line}: the block throws ${error?.constructor?.name ?? 'Error'}: ${error?.message}`)
        }
    }
}

// The examples of the demo page must run, and show something.
for (const example of demoExamples) {
    let lines = 0
    try {
        runExample(example.code, module_, () => lines++)
        if (lines === 0) failures.push(`demo example "${example.title}": it shows nothing`)
    } catch (error) {
        failures.push(`demo example "${example.title}": throws ${error?.constructor?.name ?? 'Error'}: ${error?.message}`)
    }
    blocksRun++
}

fs.rmSync(outDir, {recursive: true, force: true})

console.log(`docs:check: ${blocksRun} blocks run (${blocksSkipped} skipped), ${checked} results compared`)
if (failures.length > 0) {
    console.error(`\n${failures.length} problem(s) in the examples:`)
    failures.forEach(f => console.error(' - ' + f))
    process.exit(1)
}
