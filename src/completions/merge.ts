import type {PiMathCompletions} from './types'

/**
 * Adds the entries of `extra` to those of `base`, for a project that offers more names than PiMath (its own helpers,
 * the variables of its exercises). The result is a new object: neither argument is modified.
 */
export function mergeCompletions(base: PiMathCompletions, extra: Partial<Omit<PiMathCompletions, 'version'>>): PiMathCompletions {
    const members = {...base.members}
    for (const [key, entries] of Object.entries(extra.members ?? {})) {
        members[key] = [...(members[key] ?? []), ...entries]
    }

    return {
        version: base.version,
        globals: [...base.globals, ...(extra.globals ?? [])],
        members,
        signatures: {...base.signatures, ...extra.signatures},
        options: {...base.options, ...extra.options},
    }
}
