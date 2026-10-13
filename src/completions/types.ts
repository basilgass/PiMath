/**
 * A suggestion of the editor. The shape is the one of a CodeMirror `Completion`, so it can be given to the editor as is.
 */
export interface CompletionEntry {
    /** The text inserted. */
    label: string
    /** The kind of the suggestion, which gives its icon in the editor. */
    type: 'class' | 'function' | 'method' | 'namespace' | 'property'
    /** Short text shown next to the label: the signature, or the type and the default of an option. */
    detail?: string
    /** The description, shown when the suggestion is selected. */
    info?: string
}

/** An option of the configuration object of a `Random` generator. */
export interface OptionEntry {
    /** Path of the option in the configuration object, with dots for the nested ones (`allow.zero`). */
    path: string
    /** The type of the option, as TypeScript writes it. */
    type: string
    /** The default announced by the documentation, or `null`. */
    default: string | null
    description: string
}

/**
 * Everything an editor needs to help writing code with PiMath. It is generated from the types and the documentation
 * of the library (`npm run completions`), so it cannot drift from the API.
 *
 * The keys name things the way the code does, without the `PiMath.` prefix: `Random`, `Fraction`, `Geometry`.
 */
export interface PiMathCompletions {
    /** The version of the library the data come from. */
    version: string
    /** The names usable on their own: `PiMath`, `Fraction`, `Random`... */
    globals: CompletionEntry[]
    /** What follows a dot: `Random`, `Numeric`, the static members of a class, and the namespaces `PiMath`, `Geometry`, `Errors`. */
    members: Record<string, CompletionEntry[]>
    /** The signatures of a function or a constructor (`Random.equation`, `new Fraction`), one per overload. */
    signatures: Record<string, string[]>
    /** The options of the configuration object of each generator (`Random.equation`). */
    options: Record<string, OptionEntry[]>
}
