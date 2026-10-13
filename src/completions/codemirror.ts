/**
 * Autocompletion of PiMath for a CodeMirror 6 editor.
 *
 * ```ts
 * import {javascriptLanguage} from '@codemirror/lang-javascript'
 * import {pimathCompletion, pimathSignatureHelp} from 'pimath/codemirror'
 *
 * extensions: [
 *     javascript(),
 *     javascriptLanguage.data.of({autocomplete: pimathCompletion()}),
 *     pimathSignatureHelp(),
 * ]
 * ```
 *
 * It suggests the names of the library (`Fra` gives `Fraction`), what follows a dot for `Random`, `Numeric` and the
 * static members of a class (`Line.fromPoints`), and the options of the configuration object of a generator
 * (`Random.equation({ de` gives `degree`). It does not know the type of a variable: after `P.` it suggests nothing.
 *
 * `@codemirror/autocomplete`, `@codemirror/state` and `@codemirror/view` are peer dependencies, needed only by
 * whoever imports this module.
 */
import type {Completion, CompletionContext, CompletionResult, CompletionSource} from '@codemirror/autocomplete'
import {type EditorState, type Extension, StateField} from '@codemirror/state'
import {EditorView, showTooltip, type Tooltip} from '@codemirror/view'
import {completions} from './data'
import {mergeCompletions} from './merge'
import type {CompletionEntry, OptionEntry, PiMathCompletions} from './types'

export interface PiMathCompletionOptions {
    /** Entries added to those of PiMath: the helpers of the project, the variables its code can use. */
    extend?: Partial<Omit<PiMathCompletions, 'version'>>
}

// ── what the code looks like around the cursor ───────────────────────────────

/** An opened bracket that is not closed yet at the cursor. */
interface Frame {
    open: '(' | '[' | '{'
    /** For `(`: what is called (`Random.equation`, `new Fraction`). For `{`: the key it is the value of, or `null`. */
    name: string | null
    /** Where the bracket is. */
    start: number
    /** Where the current argument or property starts (just after the last comma at this level). */
    segment: number
}

const CALLEE = /(\bnew\s+)?([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)\s*$/
const KEY = /([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:$/

/**
 * The brackets still open at the end of `text`, from the outermost one. Strings and comments are skipped.
 * Returns `null` when `text` ends inside a string or a comment, where nothing should be suggested.
 */
function openFrames(text: string): Frame[] | null {
    const stack: Frame[] = []
    let i = 0

    while (i < text.length) {
        const ch = text.charAt(i)
        const next = text.charAt(i + 1)

        if (ch === '/' && next === '/') {
            const end = text.indexOf('\n', i)
            if (end === -1) return null
            i = end + 1
        } else if (ch === '/' && next === '*') {
            const end = text.indexOf('*/', i + 2)
            if (end === -1) return null
            i = end + 2
        } else if (ch === '\'' || ch === '"' || ch === '`') {
            let j = i + 1
            while (j < text.length && text.charAt(j) !== ch && (ch === '`' || text.charAt(j) !== '\n')) {
                j += text.charAt(j) === '\\' ? 2 : 1
            }
            if (j >= text.length || text.charAt(j) !== ch) return null
            i = j + 1
        } else {
            if (ch === '(' || ch === '[' || ch === '{') {
                const before = text.slice(0, i)
                let name: string | null = null
                if (ch === '(') {
                    const call = CALLEE.exec(before)
                    if (call) name = `${call[1] ? 'new ' : ''}${call[2].replace(/\s+/g, '')}`
                } else if (ch === '{') {
                    const key = KEY.exec(before.trimEnd())
                    if (key) name = key[1].replace(/^['"]|['"]$/g, '')
                }
                stack.push({open: ch, name, start: i, segment: i + 1})
            } else if (ch === ')' || ch === ']' || ch === '}') {
                stack.pop()
            } else if (ch === ',') {
                const top = stack.at(-1)
                if (top) top.segment = i + 1
            }
            i++
        }
    }
    return stack
}

/** `PiMath.Geometry.Point` and `Point` name the same thing: the key used by the data is the short one. */
function normalizeName(name: string): string {
    const parts = name.split('.')
    if (parts.length > 1 && parts[0] === 'PiMath') parts.shift()
    if (parts.length > 1 && (parts[0] === 'Geometry' || parts[0] === 'Errors')) parts.shift()
    return parts.join('.')
}

function signatureKey(call: string): string {
    return call.startsWith('new ') ? `new ${normalizeName(call.slice(4))}` : normalizeName(call)
}

// ── completion ───────────────────────────────────────────────────────────────

interface ConfigContext {
    /** The generator, e.g. `Random.equation`. */
    generator: string
    /** The path of the object being written inside the configuration (`['allow']`), empty for the root. */
    path: string[]
    /** The beginning of the key being typed. */
    from: number
}

/** Where the cursor is when it is on the name of a key of the configuration object of a call, or `null`. */
function configContext(text: string, frames: Frame[]): ConfigContext | null {
    const top = frames.at(-1)
    if (top?.open !== '{') return null

    // Only a key is suggested: not what follows `key:`.
    const typed = /^\s*([\w$]*)$/.exec(text.slice(top.segment))
    if (!typed) return null

    const path: string[] = []
    let level = frames.length - 1
    while (level >= 0) {
        const frame = frames[level]
        if (frame.open !== '{' || frame.name === null) break
        path.unshift(frame.name)
        level--
    }

    const root = frames[level] as Frame | undefined
    const call = frames[level - 1] as Frame | undefined
    if (root?.open !== '{' || call?.open !== '(' || !call.name) return null
    // The configuration is the first argument.
    if (!text.slice(0, root.start).trimEnd().endsWith('(')) return null

    return {generator: signatureKey(call.name), path, from: text.length - typed[1].length}
}

function optionCompletions(generator: string, path: string[], all: Record<string, OptionEntry[]>): Completion[] {
    const options = all[generator] as OptionEntry[] | undefined
    if (!options) return []

    const prefix = path.length > 0 ? `${path.join('.')}.` : ''
    const found = new Map<string, Completion>()

    for (const option of options) {
        if (!option.path.startsWith(prefix)) continue
        const rest = option.path.slice(prefix.length)
        const label = rest.split('.')[0]

        // A group such as `allow` has no entry of its own: its options stand for it.
        if (rest !== label && found.has(label)) continue
        found.set(label, {
            label,
            type: 'property',
            apply: `${label}: `,
            detail: rest === label ? `${option.type}${option.default === null ? '' : ` = ${option.default}`}` : '{ ... }',
            info: rest === label ? option.description : undefined,
        })
    }
    return [...found.values()]
}

function source(data: PiMathCompletions): CompletionSource {
    return (context: CompletionContext): CompletionResult | null => {
        const text = context.state.sliceDoc(0, context.pos)
        const frames = openFrames(text)
        if (!frames) return null

        const config = configContext(text, frames)
        if (config) {
            const options = optionCompletions(config.generator, config.path, data.options)
            return options.length > 0 ? {from: config.from, options, validFor: /^[\w$]*$/} : null
        }

        const word = context.matchBefore(/[\w$.]*/)
        if (!word) return null
        const dot = word.text.lastIndexOf('.')

        if (dot === -1) {
            if (word.text === '' && !context.explicit) return null
            return {from: word.from, options: data.globals, validFor: /^[\w$]*$/}
        }

        const members = data.members[normalizeName(word.text.slice(0, dot))] as CompletionEntry[] | undefined
        if (!members) return null
        return {from: word.from + dot + 1, options: members, validFor: /^[\w$]*$/}
    }
}

/**
 * The completion source of PiMath, to give to the editor with `javascriptLanguage.data.of({autocomplete: ...})`
 * or `autocompletion({override: [...]})`.
 */
export function pimathCompletion(options: PiMathCompletionOptions = {}): CompletionSource {
    return source(options.extend ? mergeCompletions(completions, options.extend) : completions)
}

// ── signature help ───────────────────────────────────────────────────────────

function signatureTooltip(state: EditorState, data: PiMathCompletions): Tooltip | null {
    const text = state.sliceDoc(0, state.selection.main.head)
    const frames = openFrames(text)
    if (!frames) return null

    // The nearest call whose signature is known: `Random.equation({ degree: 2, ` is still inside `Random.equation(`.
    for (const frame of [...frames].reverse()) {
        if (frame.open !== '(' || !frame.name) continue

        const signatures = data.signatures[signatureKey(frame.name)] as string[] | undefined
        if (!signatures) continue

        return {
            pos: frame.start + 1,
            above: true,
            create() {
                const dom = document.createElement('div')
                dom.className = 'cm-signature-help'
                dom.textContent = signatures.join('\n')
                return {dom}
            },
        }
    }
    return null
}

/** A small box above the cursor with the signature of the function being called. */
export function pimathSignatureHelp(options: PiMathCompletionOptions = {}): Extension {
    const data = options.extend ? mergeCompletions(completions, options.extend) : completions

    const field = StateField.define<Tooltip | null>({
        create: state => signatureTooltip(state, data),
        update: (value, transaction) =>
            transaction.docChanged || transaction.selection ? signatureTooltip(transaction.state, data) : value,
        provide: f => showTooltip.from(f),
    })

    const theme = EditorView.baseTheme({
        '.cm-signature-help': {
            padding: '2px 8px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            whiteSpace: 'pre',
        },
    })

    return [field, theme]
}
