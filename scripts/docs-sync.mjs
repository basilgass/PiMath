/**
 * Generates the parts of the documentation that come straight from the code: `docs/guide/_generated/*.md`.
 * The hand-written pages include them with `<!--@include: ./_generated/<file>.md-->`, so no page is ever
 * rewritten by this script and there is nothing to merge.
 *
 * Fragments:
 *  - `random-<generator>.md`: signature and table of options of each `Random` generator;
 *  - `random-coefficient.md`: the options shared by every `fraction` option (those of `Random.fraction`);
 *  - `members-<Class>.md`: the documented public members of each class;
 *  - `members-Numeric.md`: the functions of the `Numeric` object.
 *
 * The data are those of `scripts/api-sitemap.mjs` (types and JSDoc of `src/index.ts`). A member without a
 * JSDoc description is not listed: the coverage is printed instead, so that the gaps show up in the console
 * and not as empty rows in the site. Run it with `npm run docs:sync`.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'docs/guide/_generated')

// ── read the API ─────────────────────────────────────────────────────────────

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pimath-api-'))
try {
    execFileSync(process.execPath, [path.join(root, 'scripts/api-sitemap.mjs'), '--out', tmp], {stdio: ['ignore', 'ignore', 'inherit']})
} catch {
    console.error('docs:sync: the API analysis failed (see above).')
    process.exit(1)
}
const api = JSON.parse(fs.readFileSync(path.join(tmp, 'api-sitemap.json'), 'utf8'))
fs.rmSync(tmp, {recursive: true, force: true})

// ── Markdown helpers ─────────────────────────────────────────────────────────

/** Braces are escaped too: VitePress reads a trailing `{x: 1}` of a table cell as attributes (markdown-it-attrs). */
const escapeText = part => part.replace(/</g, '&lt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')

/** Escape what would be read as HTML outside the code spans (`<T>` in a description), and keep a table cell on one line. */
function cell(text) {
    return (text ?? '')
        .replace(/\{@link\s+([^}\s]+)(?:\s+[^}]*)?\}/g, '`$1`')
        .replace(/\s*\n\s*/g, ' ')
        .replace(/\|/g, '\\|')
        .split('`')
        .map((part, i) => (i % 2 === 0 ? escapeText(part) : part))
        .join('`')
        .trim()
}

/** A description shown as paragraphs (a generator): the line breaks and the lists are kept. */
function block(text) {
    return (text ?? '')
        .replace(/{@links+([^}s]+)(?:s+[^}]*)?}/g, '`$1`')
        .split('`')
        .map((part, i) => (i % 2 === 0 ? escapeText(part) : part))
        .join('`')
        .trim()
}

const code = text => '`' + String(text).replace(/`/g, "'").replace(/\|/g, '\\|') + '`'

/** The fragment is shown as it is: no Vue interpolation of `{{ }}` in the descriptions. */
const wrap = lines => ['::: v-pre', '', ...lines, '', ':::', ''].join('\n')

// ── Random ───────────────────────────────────────────────────────────────────

function optionRows(options) {
    const rows = ['| Option | Type | Default | Description |', '| --- | --- | --- | --- |']
    for (const o of options) {
        const inherited = o.descriptionFrom !== null && o.descriptionFrom !== o.path
        const text = inherited ? `See ${code(o.descriptionFrom)}.` : cell(o.description)
        rows.push(`| ${code(o.path)}${o.optional ? '' : ' (required)'} | ${code(o.type)} | ${o.default === null ? '' : code(o.default)} | ${text} |`)
    }
    return rows
}

const files = new Map()

for (const [name, g] of Object.entries(api.random.generators)) {
    const isCoefficient = name === 'fraction'
    // The options of the `fraction` option are those of Random.fraction: they are listed once, in random-coefficient.md.
    const options = isCoefficient ? g.options : g.options.filter(o => !o.path.startsWith('fraction.'))
    const lines = [code(g.signature), '']
    if (g.description) lines.push(block(g.description), '')
    lines.push(...optionRows(options))
    if (!isCoefficient && g.options.length !== options.length) {
        lines.push('', 'The `fraction` option takes the coefficient options of `Random.fraction`.')
    }
    if (g.throws.length > 0) lines.push('', '**Errors**', '', ...g.throws.map(x => `- ${cell(x)}`))
    files.set(`random-${name}.md`, wrap(lines))
}
files.set('random-coefficient.md', files.get('random-fraction.md'))

// ── classes ──────────────────────────────────────────────────────────────────

const coverage = []

for (const [name, c] of Object.entries(api.classes)) {
    const documented = c.members.filter(m => m.documented && !m.name.startsWith('_'))
    coverage.push({name, total: c.members.length, missing: c.members.length - c.members.filter(m => m.documented).length})
    if (documented.length === 0) continue

    const groups = [
        ['Static members', documented.filter(m => m.static)],
        ['Properties and getters', documented.filter(m => !m.static && m.kind !== 'method' && m.kind !== 'function property')],
        ['Methods', documented.filter(m => !m.static && (m.kind === 'method' || m.kind === 'function property'))],
    ]

    const lines = []
    if (c.constructors.length > 0) lines.push('**Constructors**', '', ...c.constructors.map(s => `- ${code(s)}`), '')
    for (const [title, members] of groups) {
        if (members.length === 0) continue
        lines.push(`**${title}**`, '', '| Member | Description |', '| --- | --- |')
        for (const m of members) {
            const throwsText = m.throws.length ? ` Throws: ${m.throws.map(cell).join('; ')}` : ''
            const flag = m.deprecated ? ' *(deprecated)*' : ''
            lines.push(`| ${m.signatures.map(code).join('<br>')} | ${cell(m.description)}${throwsText}${flag} |`)
        }
        lines.push('')
    }
    files.set(`members-${name}.md`, wrap(lines.slice(0, -1)))
}

// ── Numeric ──────────────────────────────────────────────────────────────────

{
    const functions = Object.values(api.numeric)
    const lines = ['| Function | Description |', '| --- | --- |']
    for (const fn of functions.filter(x => x.description)) {
        const throwsText = fn.throws.length ? ` Throws: ${fn.throws.map(cell).join('; ')}` : ''
        lines.push(`| ${fn.signatures.map(code).join('<br>')} | ${cell(fn.description)}${throwsText} |`)
    }
    files.set('members-Numeric.md', wrap(lines))
    coverage.push({name: 'Numeric', total: functions.length, missing: functions.filter(x => !x.description).length})
}

// ── write ────────────────────────────────────────────────────────────────────

fs.rmSync(outDir, {recursive: true, force: true})
fs.mkdirSync(outDir, {recursive: true})
for (const [file, content] of files) fs.writeFileSync(path.join(outDir, file), content)

const total = coverage.reduce((n, c) => n + c.total, 0)
const missing = coverage.reduce((n, c) => n + c.missing, 0)
console.log(`docs:sync: ${files.size} fragments written to docs/guide/_generated (PiMath ${api['pimath-version']})`)
console.log(`JSDoc coverage: ${total - missing}/${total} public members described (${Math.round(100 * (total - missing) / total)} %)`)
