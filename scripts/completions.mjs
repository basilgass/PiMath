/**
 * Generates `src/completions/data.ts`: the data an editor needs to complete code written with PiMath (names, static
 * members, signatures, options of the `Random` generators). Everything comes from `scripts/api-sitemap.mjs`, that is
 * from the types and the JSDoc of `src/index.ts`: nothing is written by hand.
 *
 * `npm run completions` writes the file (the build does it too); `--check` only compares, and exits with 1 when the
 * file on disk is not what the API gives (`npm run docs:check` runs it).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'src/completions/data.ts')
const check = process.argv.includes('--check')

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pimath-completions-'))
let api
try {
    execFileSync(process.execPath, [path.join(root, 'scripts/api-sitemap.mjs'), '--out', tmp], {stdio: ['ignore', 'ignore', 'inherit']})
    api = JSON.parse(fs.readFileSync(path.join(tmp, 'api-sitemap.json'), 'utf8'))
} finally {
    fs.rmSync(tmp, {recursive: true, force: true})
}

// ── helpers ──────────────────────────────────────────────────────────────────

/** The text shown next to a function: its first signature without the name, and the number of the other overloads. */
function detailOf(name, signatures) {
    const [first, ...others] = signatures
    const text = first.startsWith(name) ? first.slice(name.length) : first
    return others.length > 0 ? `${text} (+${others.length})` : text
}

function infoOf(description, throws = []) {
    return [description, ...throws.map(t => `Throws: ${t}`)].filter(Boolean).join('\n\n')
}

function entry(label, type, detail, info) {
    const result = {label, type}
    if (detail) result.detail = detail
    if (info) result.info = info
    return result
}

// ── names and namespaces ─────────────────────────────────────────────────────

const classes = api.classes
const globalPaths = Object.entries(api.global) // [['PiMath.Geometry.Point', 'Point'], ...]
const namespaceOf = path => (path.split('.').length === 3 ? path.split('.')[1] : null)

const globals = [entry('PiMath', 'namespace', undefined, 'The global object: every class and tool of the library.')]
const members = {PiMath: [], Geometry: [], Errors: []}
const signatures = {}
const options = {}

function classEntry(name) {
    const c = classes[name]
    const constructor = c.constructors.length > 0 ? detailOf(`new ${name}`, c.constructors) : undefined
    return entry(name, 'class', constructor, c.description)
}

for (const [p, name] of globalPaths) {
    const namespace = namespaceOf(p)
    let item
    if (name === 'Random') item = entry(name, 'namespace', undefined, 'Random generators of exercises: numbers, polynomials, equations, geometry...')
    else if (name === 'Numeric') item = entry(name, 'namespace', undefined, 'Functions on numbers: gcd, lcm, rounding, primes...')
    else item = classEntry(name)

    globals.push(item)
    if (namespace) members[namespace].push(item)
    else members.PiMath.push(item)
}
members.PiMath.push(entry('Geometry', 'namespace', undefined, 'Points, vectors, lines, circles, triangles, and their 3D counterparts.'))
members.PiMath.push(entry('Errors', 'namespace', undefined, 'The classes of the errors thrown by the library.'))

// ── constructors and static members ──────────────────────────────────────────

for (const [, name] of globalPaths) {
    const c = classes[name]
    if (!c) continue

    if (c.constructors.length > 0) signatures[`new ${name}`] = c.constructors

    const statics = c.members.filter(m => m.static && !m.deprecated)
    if (statics.length === 0) continue

    members[name] = statics.map(m => {
        const isCallable = m.kind === 'method' || m.kind === 'function property'
        return entry(m.name, isCallable ? 'method' : 'property', isCallable ? detailOf(m.name, m.signatures) : undefined, infoOf(m.description, m.throws))
    })
    for (const m of statics) {
        if (m.kind === 'method' || m.kind === 'function property') signatures[`${name}.${m.name}`] = m.signatures
    }
}

// ── Random ───────────────────────────────────────────────────────────────────

members.Random = []
for (const [name, g] of Object.entries(api.random.generators)) {
    members.Random.push(entry(name, 'function', detailOf(name, [g.signature]), infoOf(g.description, g.throws)))
    signatures[`Random.${name}`] = [g.signature]
    options[`Random.${name}`] = g.options.map(o => ({path: o.path, type: o.type, default: o.default, description: o.description}))
}
for (const [name, h] of Object.entries(api.random.helpers)) {
    members.Random.push(entry(name, 'function', detailOf(name, [h.signature]), infoOf(h.description, h.throws)))
    signatures[`Random.${name}`] = [h.signature]
}

// ── Numeric ──────────────────────────────────────────────────────────────────

members.Numeric = []
for (const [name, f] of Object.entries(api.numeric)) {
    members.Numeric.push(entry(name, 'function', detailOf(name, f.signatures), infoOf(f.description, f.throws)))
    signatures[`Numeric.${name}`] = f.signatures
}

// ── file ─────────────────────────────────────────────────────────────────────

const data = {version: api['pimath-version'], globals, members, signatures, options}

const content = [
    '// Generated by `npm run completions` (scripts/completions.mjs) from the types and the JSDoc of the library.',
    '// Do not edit by hand.',
    "import type {PiMathCompletions} from './types'",
    '',
    // A multi-line description keeps the line endings of the source: CRLF on Windows, LF on the CI. Same file everywhere.
    `export const completions: PiMathCompletions = ${JSON.stringify(data, null, 4).replace(/\\r\\n/g, '\\n')}`,
    '',
].join('\n')

const normalize = text => text.replace(/\r\n/g, '\n')

if (check) {
    const current = fs.existsSync(target) ? normalize(fs.readFileSync(target, 'utf8')) : ''
    if (current !== content) {
        console.error('src/completions/data.ts is out of date: run `npm run completions`.')
        process.exit(1)
    }
    console.log('completions: up to date')
} else {
    fs.writeFileSync(target, content)
    const count = Object.values(members).reduce((n, list) => n + list.length, 0)
    console.log(`completions: ${globals.length} names, ${count} members, ${Object.keys(signatures).length} signatures, ${Object.keys(options).length} generators with options`)
}
