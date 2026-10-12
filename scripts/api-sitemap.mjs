/**
 * Generates the reference of the public API of PiMath: `.claude/specs/api-sitemap.md` (to read) and
 * `.claude/specs/api-sitemap.json` (for tools, e.g. the autocompletion of Scolcours).
 *
 * Everything comes from the types and the JSDoc of `src/index.ts`: nothing is written by hand. Run it with
 * `npm run api` after any change of the public API. It exits with an error when an option of a `Random`
 * generator has no type or no description, so that those parameters stay complete.
 */
import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const entry = path.join(root, 'src/index.ts')
const outDir = path.join(root, '.claude/specs')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const configFile = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile)
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root)
const program = ts.createProgram([entry], parsed.options)
const checker = program.getTypeChecker()
const indexFile = program.getSourceFile(entry)

const NO_TRUNCATION = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope

// ── helpers ──────────────────────────────────────────────────────────────────

const doc = symbol => ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()

function tagsOf(symbol) {
    const tags = symbol.getJsDocTags(checker)
    return {
        throws: tags.filter(t => t.name === 'throws').map(t => ts.displayPartsToString(t.text ?? []).trim()),
        deprecated: tags.some(t => t.name === 'deprecated'),
    }
}

const typeText = (type, node) => checker.typeToString(type, node, NO_TRUNCATION)

function isPrivateMember(symbol) {
    if (symbol.name.startsWith('#') || symbol.name.startsWith('__#')) return true
    const d = symbol.declarations?.[0]
    if (!d) return true
    const flags = ts.getCombinedModifierFlags(d)
    return Boolean(flags & (ts.ModifierFlags.Private | ts.ModifierFlags.Protected))
}

const fromStandardLibrary = symbol => symbol.declarations?.some(d => program.isSourceFileDefaultLibrary(d.getSourceFile()))

const resolve = symbol => (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol)

// ── the global object `PiMath` ───────────────────────────────────────────────

/** Paths of the entries of the `PiMath` object of `src/index.ts`, read from its object literal. */
function globalPaths() {
    const paths = new Map()

    function walk(literal, prefix) {
        for (const property of literal.properties) {
            if (ts.isShorthandPropertyAssignment(property)) {
                paths.set(property.name.text, `${prefix}.${property.name.text}`)
            } else if (ts.isPropertyAssignment(property) && ts.isObjectLiteralExpression(property.initializer)) {
                walk(property.initializer, `${prefix}.${property.name.getText()}`)
            } else if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.initializer)) {
                paths.set(property.initializer.text, `${prefix}.${property.name.getText()}`)
            }
        }
    }

    ts.forEachChild(indexFile, node => {
        if (!ts.isVariableStatement(node)) return
        for (const declaration of node.declarationList.declarations) {
            if (declaration.name.getText() === 'PiMath' && declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
                walk(declaration.initializer, 'PiMath')
            }
        }
    })
    return paths
}

const paths = globalPaths()

// ── exports ──────────────────────────────────────────────────────────────────

const moduleSymbol = checker.getSymbolAtLocation(indexFile)
const exported = checker.getExportsOfModule(moduleSymbol).map(symbol => ({name: symbol.name, symbol: resolve(symbol)}))

function kindOf(symbol) {
    const d = symbol.declarations?.[0]
    if (!d) return 'other'
    if (ts.isClassDeclaration(d)) return 'class'
    if (ts.isInterfaceDeclaration(d)) return 'interface'
    if (ts.isTypeAliasDeclaration(d)) return 'type'
    if (ts.isEnumDeclaration(d)) return 'enum'
    if (ts.isFunctionDeclaration(d)) return 'function'
    if (ts.isVariableDeclaration(d)) return 'const'
    return 'other'
}

// ── classes ──────────────────────────────────────────────────────────────────

function memberOf(symbol, isStatic, contextNode) {
    const d = symbol.declarations[0]
    const type = checker.getTypeOfSymbolAtLocation(symbol, d)
    const calls = type.getCallSignatures()
    const isAccessor = Boolean(symbol.flags & (ts.SymbolFlags.GetAccessor | ts.SymbolFlags.SetAccessor))
    const hasGetter = Boolean(symbol.flags & ts.SymbolFlags.GetAccessor)
    const hasSetter = Boolean(symbol.flags & ts.SymbolFlags.SetAccessor)

    let kind
    if (isAccessor) kind = hasGetter && hasSetter ? 'accessor' : hasGetter ? 'getter' : 'setter'
    else if (symbol.flags & ts.SymbolFlags.Method) kind = 'method'
    else if (calls.length > 0) kind = 'function property'
    else kind = 'property'

    const signatures = calls.length > 0 && !isAccessor
        ? calls.map(signature => `${symbol.name}${checker.signatureToString(signature, d, NO_TRUNCATION)}`)
        : [`${symbol.name}: ${typeText(type, d)}`]

    let description = doc(symbol)
    if (description === '' && calls.length > 0) {
        description = calls.map(signature => ts.displayPartsToString(signature.getDocumentationComment(checker)).trim()).find(Boolean) ?? ''
    }
    const {throws, deprecated} = tagsOf(symbol)

    const parent = d.parent
    return {
        name: symbol.name,
        kind,
        static: isStatic,
        readonly: Boolean(ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Readonly),
        signatures,
        description,
        throws,
        deprecated,
        declaredIn: ts.isClassDeclaration(parent) || ts.isInterfaceDeclaration(parent) ? parent.name?.text ?? null : null,
        documented: description !== '',
    }
}

function describeClass(name, symbol) {
    const declaration = symbol.declarations[0]
    const instanceType = checker.getDeclaredTypeOfSymbol(symbol)
    const staticType = checker.getTypeOfSymbolAtLocation(symbol, declaration)

    const extendsClause = declaration.heritageClauses?.find(c => c.token === ts.SyntaxKind.ExtendsKeyword)
    const implementsClause = declaration.heritageClauses?.find(c => c.token === ts.SyntaxKind.ImplementsKeyword)

    const keep = symbol => !isPrivateMember(symbol) && !fromStandardLibrary(symbol)
    const instance = checker.getPropertiesOfType(instanceType).filter(keep).map(s => memberOf(s, false, declaration))
    const statics = checker.getPropertiesOfType(staticType)
        .filter(s => s.name !== 'prototype' && keep(s))
        .map(s => memberOf(s, true, declaration))

    const constructors = staticType.getConstructSignatures().map(signature =>
        `new ${name}${checker.signatureToString(signature, declaration, NO_TRUNCATION)}`.replace(/: [A-Za-z0-9_<>, |\[\]]+$/, ''))

    return {
        kind: 'class',
        path: paths.get(name) ?? null,
        abstract: Boolean(ts.getCombinedModifierFlags(declaration) & ts.ModifierFlags.Abstract),
        extends: extendsClause?.types.map(t => t.getText()).join(', ') ?? null,
        implements: implementsClause?.types.map(t => t.getText()) ?? [],
        description: doc(symbol),
        constructors,
        members: [...statics, ...instance],
    }
}

// ── configuration options of Random ──────────────────────────────────────────

const withoutUndefined = text => text.replace(/ \| undefined$/, '')

/** The default announced by the JSDoc of an option, or null. */
function defaultOf(source) {
    const text = source.replace(/\s+/g, ' ')
    // "`false` (default)": the value comes first; "(default `10`)", "Default: random": it follows the word.
    const before = /(`[^`]+`)\s*\((?:the )?default\)/i.exec(text)
    const match = before ?? /[Dd]efault:?\s*(`[^`]+`|[^,;)]+?)(?=[,;)]|\.\s|\.$|$)/.exec(text)
    if (!match) return null
    return match[1].replace(/^`|`$/g, '').trim()
}

const isAnonymousObject = type => type.symbol?.name === '__type' && !type.getCallSignatures().length
const isConfigInterface = type => /^Random/.test(type.symbol?.name ?? '') && (type.symbol.flags & ts.SymbolFlags.Interface) !== 0

/** The members of `type` (or of a member of the union) that are objects whose options are worth listing. */
function objectParts(type) {
    const parts = type.isUnion() ? type.types : [type]
    return parts.filter(t => t.getProperties().length > 0 && (isAnonymousObject(t) || isConfigInterface(t)))
}

/** The options of a configuration type, flattened with dotted paths. A leaf without a description inherits its parent's. */
function optionsOf(type, node, prefix = '', inheritedDoc = null, seen = [], inheritedPath = null) {
    const options = []
    for (const property of checker.getPropertiesOfType(type)) {
        const declaration = property.declarations?.[0]
        if (!declaration) continue
        const propertyType = checker.getTypeOfSymbolAtLocation(property, declaration)
        const text = withoutUndefined(typeText(propertyType, declaration))
        const own = doc(property)
        const defined = propertyType.isUnion() ? propertyType.types.filter(t => !(t.flags & ts.TypeFlags.Undefined)) : [propertyType]
        const nested = objectParts(propertyType).filter(t => !seen.includes(t.symbol?.name))
        const optionPath = prefix + property.name
        const description = own || inheritedDoc || ''

        // A container without a description of its own (`allow?: { zero?, … }`) is not an option: its entries are.
        const isGroupOnly = own === '' && defined.length === 1 && nested.length === 1
        if (!isGroupOnly) {
            options.push({
                path: optionPath,
                type: text,
                optional: Boolean(property.flags & ts.SymbolFlags.Optional),
                // The entries of a category record (`allow: { vertical?: boolean | number, … }`) share the default of their parent.
                default: defaultOf(own) ?? (own === '' && /^(boolean \| number|number \| boolean)$/.test(text) ? defaultOf(inheritedDoc ?? '') : null),
                description,
                descriptionFrom: own ? optionPath : inheritedDoc ? inheritedPath : null,
            })
        }
        if (seen.length < 3) {
            for (const part of nested) {
                options.push(...optionsOf(part, node, `${optionPath}.`, own || inheritedDoc, [...seen, part.symbol?.name], own ? optionPath : inheritedPath))
            }
        }
    }
    return options
}

function describeRandom(randomSymbol) {
    const declaration = randomSymbol.declarations[0]
    const type = checker.getTypeOfSymbolAtLocation(randomSymbol, declaration)
    const generators = {}
    const helpers = {}

    for (const property of type.getProperties()) {
        const d = property.declarations[0]
        const propertyType = checker.getTypeOfSymbolAtLocation(property, d)
        const signature = propertyType.getCallSignatures()[0]
        if (!signature) continue

        const returns = typeText(signature.getReturnType(), d)
        const description = doc(property)
        const {throws} = tagsOf(property)
        const text = `${property.name}${checker.signatureToString(signature, d, NO_TRUNCATION)}`

        const first = signature.getParameters()[0]
        const firstType = first && checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(first, d))
        const isConfig = firstType && isConfigInterface(firstType)

        if (isConfig) {
            generators[property.name] = {
                path: `PiMath.Random.${property.name}`,
                signature: text,
                returns,
                config: firstType.symbol.name,
                description,
                options: optionsOf(firstType, d),
            }
        } else {
            helpers[property.name] = {path: `PiMath.Random.${property.name}`, signature: text, returns, description, throws}
        }
    }
    return {generators, helpers}
}

// ── namespaces made of functions (Numeric) ───────────────────────────────────

function describeFunctions(symbol, pathPrefix) {
    const d = symbol.declarations[0]
    const type = checker.getTypeOfSymbolAtLocation(symbol, d)
    const out = {}
    for (const property of type.getProperties()) {
        const pd = property.declarations?.[0]
        if (!pd) continue
        const propertyType = checker.getTypeOfSymbolAtLocation(property, pd)
        const signatures = propertyType.getCallSignatures().map(s => `${property.name}${checker.signatureToString(s, pd, NO_TRUNCATION)}`)
        if (signatures.length === 0) continue
        out[property.name] = {path: `${pathPrefix}.${property.name}`, signatures, description: doc(property), throws: tagsOf(property).throws}
    }
    return out
}

// ── types, interfaces, enums, functions ──────────────────────────────────────

function describeOther(name, symbol, kind) {
    const d = symbol.declarations[0]
    const base = {kind, description: doc(symbol)}
    if (kind === 'interface') {
        const type = checker.getDeclaredTypeOfSymbol(symbol)
        return {...base, members: checker.getPropertiesOfType(type).map(p => {
            const pd = p.declarations?.[0]
            return {name: p.name, type: pd ? withoutUndefined(typeText(checker.getTypeOfSymbolAtLocation(p, pd), pd)) : '', optional: Boolean(p.flags & ts.SymbolFlags.Optional), description: doc(p)}
        })}
    }
    if (kind === 'type') return {...base, definition: typeText(checker.getDeclaredTypeOfSymbol(symbol), d)}
    if (kind === 'enum') return {...base, members: d.members.map(m => ({name: m.name.getText(), value: checker.getConstantValue(m) ?? null}))}
    if (kind === 'function') {
        const type = checker.getTypeOfSymbolAtLocation(symbol, d)
        return {...base, signatures: type.getCallSignatures().map(s => `${name}${checker.signatureToString(s, d, NO_TRUNCATION)}`)}
    }
    return base
}

// ── assemble ─────────────────────────────────────────────────────────────────

const classes = {}
const others = {}
let random = null
let numeric = null

for (const {name, symbol} of exported) {
    const kind = kindOf(symbol)
    if (kind === 'class') classes[name] = describeClass(name, symbol)
    else if (name === 'Random') random = describeRandom(symbol)
    else if (name === 'Numeric') numeric = describeFunctions(symbol, 'PiMath.Numeric')
    else if (name === 'default') continue
    else others[name] = describeOther(name, symbol, kind)
}

const sitemap = {
    'pimath-version': pkg.version,
    global: Object.fromEntries([...paths.entries()].map(([name, p]) => [p, name])),
    random,
    numeric,
    classes,
    types: others,
}

// ── self-check ───────────────────────────────────────────────────────────────

const problems = []
let optionCount = 0
let defaultCount = 0
for (const [name, generator] of Object.entries(random.generators)) {
    for (const option of generator.options) {
        optionCount++
        if (option.default !== null) defaultCount++
        if (!option.type) problems.push(`Random.${name}: option "${option.path}" has no type`)
        if (!option.description) problems.push(`Random.${name}: option "${option.path}" has no description`)
    }
}
const classNames = Object.keys(classes)
const memberCount = classNames.reduce((n, c) => n + classes[c].members.length, 0)
const undocumented = classNames.reduce((n, c) => n + classes[c].members.filter(m => !m.documented).length, 0)

// ── Markdown ─────────────────────────────────────────────────────────────────

const cell = text => (text ?? '').replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|').trim()
const code = text => '`' + String(text).replace(/`/g, "'").replace(/\|/g, '\\|') + '`'

function renderMarkdown() {
    const out = []
    const push = (...lines) => out.push(...lines)

    push(`# PiMath API sitemap`, '',
        `Generated by \`npm run api\` from the types and the JSDoc of \`src/index.ts\` — do not edit by hand.`,
        `PiMath version: **${pkg.version}**. The same content, structured, is in \`api-sitemap.json\`.`, '',
        `Paths follow the global object \`PiMath\` (script tags) and the named exports of the module (\`import {Fraction} from 'pimath'\`).`,
        `"undocumented" marks a member whose source has no JSDoc description: only its signature is known.`, '')

    push(`## Contents`, '',
        `- [Global object](#global-object)`, `- [Random](#random)`, `- [Numeric](#numeric)`, `- [Classes](#classes)`, `- [Types, interfaces and enums](#types-interfaces-and-enums)`,
        `- [Coverage](#coverage)`, '')

    push(`## Global object`, '', `| Path | Export |`, `| --- | --- |`)
    for (const [p, name] of Object.entries(sitemap.global)) push(`| ${code(p)} | ${code(name)} |`)
    push('')

    push(`## Random`, '', `\`PiMath.Random\` — ${Object.keys(random.generators).length} generators (configuration object) and ${Object.keys(random.helpers).length} helpers.`, '')
    for (const [name, g] of Object.entries(random.generators)) {
        push(`### ${code(g.path)}`, '', `- Signature: ${code(g.signature)}`, `- Returns: ${code(g.returns)}`, `- Configuration type: ${code(g.config)}`)
        if (g.description) push('', cell(g.description))
        push('', `| Option | Type | Default | Description |`, `| --- | --- | --- | --- |`)
        for (const o of g.options) {
            const inherited = o.descriptionFrom !== null && o.descriptionFrom !== o.path
            const text = inherited ? `See ${code(o.descriptionFrom)}.` : cell(o.description)
            push(`| ${code(o.path)}${o.optional ? '' : ' (required)'} | ${code(o.type)} | ${o.default === null ? '' : code(o.default)} | ${text} |`)
        }
        push('')
    }
    push(`### Helpers`, '', `| Function | Returns | Description |`, `| --- | --- | --- |`)
    for (const h of Object.values(random.helpers)) {
        const throwsText = h.throws.length ? ` Throws: ${h.throws.map(cell).join('; ')}` : ''
        push(`| ${code(h.signature)} | ${code(h.returns)} | ${cell(h.description)}${throwsText} |`)
    }
    push('')

    push(`## Numeric`, '', `| Function | Description |`, `| --- | --- |`)
    for (const f of Object.values(numeric)) {
        push(`| ${f.signatures.map(code).join('<br>')} | ${cell(f.description) || '*undocumented*'} |`)
    }
    push('')

    push(`## Classes`, '')
    for (const [name, c] of Object.entries(classes)) {
        push(`### ${code(c.path ?? name)}${c.path ? '' : ' *(module export only)*'}`, '')
        const header = [c.abstract ? 'abstract class' : 'class', c.extends ? `extends ${c.extends}` : '', c.implements.length ? `implements ${c.implements.join(', ')}` : '']
        push(header.filter(Boolean).join(' '), '')
        if (c.description) push(cell(c.description), '')
        if (c.constructors.length) push(`Constructors:`, '', ...c.constructors.map(s => `- ${code(s)}`), '')
        push(`| Member | Kind | Signature | Declared in | Description |`, `| --- | --- | --- | --- | --- |`)
        for (const m of c.members) {
            const flags = [m.static ? 'static' : '', m.readonly ? 'readonly' : '', m.deprecated ? 'deprecated' : ''].filter(Boolean).join(' ')
            const throwsText = m.throws.length ? ` Throws: ${m.throws.map(cell).join('; ')}` : ''
            push(`| ${code(m.name)} | ${[flags, m.kind].filter(Boolean).join(' ')} | ${m.signatures.map(code).join('<br>')} | ${m.declaredIn ?? ''} | ${m.documented ? cell(m.description) : '*undocumented*'}${throwsText} |`)
        }
        push('')
    }

    push(`## Types, interfaces and enums`, '')
    for (const [name, t] of Object.entries(others)) {
        push(`### ${code(name)} — ${t.kind}`, '')
        if (t.description) push(cell(t.description), '')
        if (t.definition) push(code(t.definition), '')
        if (t.signatures) push(...t.signatures.map(s => `- ${code(s)}`), '')
        if (t.members) {
            if (t.kind === 'enum') push(...t.members.map(m => `- ${code(m.name)}${m.value === null ? '' : ` = ${code(m.value)}`}`), '')
            else push(`| Member | Type | Description |`, `| --- | --- | --- |`, ...t.members.map(m => `| ${code(m.name)}${m.optional ? '?' : ''} | ${code(m.type)} | ${cell(m.description)} |`), '')
        }
    }

    push(`## Coverage`, '',
        `- Classes: ${classNames.length}; public members listed: ${memberCount}; without a description: ${undocumented} (${Math.round(100 * undocumented / memberCount)} %).`,
        `- \`Random\` configuration options: ${optionCount}; with a default announced in the JSDoc: ${defaultCount}.`, '',
        `| Class | Members | Undocumented |`, `| --- | ---: | ---: |`)
    for (const c of classNames) {
        const members = classes[c].members
        push(`| ${code(c)} | ${members.length} | ${members.filter(m => !m.documented).length} |`)
    }
    push('')
    return out.join('\n')
}

// ── write ────────────────────────────────────────────────────────────────────

fs.mkdirSync(outDir, {recursive: true})
fs.writeFileSync(path.join(outDir, 'api-sitemap.json'), JSON.stringify(sitemap, null, 2) + '\n')
fs.writeFileSync(path.join(outDir, 'api-sitemap.md'), renderMarkdown())

console.log(`PiMath ${pkg.version}: ${classNames.length} classes, ${memberCount} members (${undocumented} without a description)`)
console.log(`Random: ${Object.keys(random.generators).length} generators, ${optionCount} options (${defaultCount} with a default), ${Object.keys(random.helpers).length} helpers`)
console.log(`Numeric: ${Object.keys(numeric).length} functions; types and enums: ${Object.keys(others).length}`)
if (problems.length > 0) {
    console.error(`\n${problems.length} problem(s) in the Random options:`)
    problems.forEach(p => console.error(' - ' + p))
    process.exit(1)
}
