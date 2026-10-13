/**
 * Runs the code of a demo example. The page of the demo and `npm run docs:check` use this same file, so that an
 * example that works in the check works in the page.
 *
 * The code is the body of a function. It receives:
 *  - `PiMath`, the default export of the library, and every named export (`Fraction`, `Polynom`, `Random`...) as a
 *    free name, like the examples of the guide;
 *  - `show(...values)`: displays values. An object with a `.tex` is drawn as LaTeX, an array is displayed element
 *    by element, anything else as text. Several values are put on one line, separated by `\quad`;
 *  - `showTex(latex)`: displays a LaTeX string.
 */

/** The lines of output that stand for a value: `{kind: 'tex' | 'text', value: string}`. */
export function toOutput(value) {
    if (Array.isArray(value)) {
        return value.flatMap(toOutput)
    }

    if (value !== null && typeof value === 'object') {
        // `tex` and `display` are getters: some classes throw instead of answering (Triangle).
        for (const [property, kind] of [['tex', 'tex'], ['display', 'text']]) {
            try {
                if (typeof value[property] === 'string') {
                    return [{kind, value: value[property]}]
                }
            } catch {
                // try the next property
            }
        }

        try {
            return [{kind: 'text', value: JSON.stringify(value)}]
        } catch {
            return [{kind: 'text', value: String(value)}]
        }
    }

    return [{kind: 'text', value: String(value)}]
}

/** The text written inside `\text{...}` of LaTeX. */
const escapeText = text => text.replace(/[\\{}%$#&_^~]/g, character => `\\${character}`)

/**
 * Puts several lines of output on one line. Text only stays text; as soon as there is LaTeX, the whole row is LaTeX
 * with a `\quad` between the values, and the text is written with `\text`.
 */
export function row(lines) {
    if (lines.every(line => line.kind === 'text')) {
        return [{kind: 'text', value: lines.map(line => line.value).join('    ')}]
    }

    const parts = lines.map(line => line.kind === 'tex' ? line.value : `\\text{${escapeText(line.value)}}`)
    return [{kind: 'tex', value: parts.join(' \\quad ')}]
}

/**
 * Run `code` against `library` (the module namespace of the built library).
 * `emit` is called with each line of output.
 * @throws whatever the code throws.
 */
export function runExample(code, library, emit) {
    const {default: PiMath, ...named} = library
    const names = Object.keys(named).filter(name => /^[A-Za-z_$][\w$]*$/.test(name))

    const show = (...values) => {
        const lines = values.map(toOutput)
        if (values.length === 1) {
            lines[0].forEach(emit)
        } else {
            row(lines.flat()).forEach(emit)
        }
    }
    const showTex = latex => emit({kind: 'tex', value: String(latex)})

    const body = new Function('PiMath', 'show', 'showTex', ...names, code)
    body(PiMath, show, showTex, ...names.map(name => named[name]))
}
