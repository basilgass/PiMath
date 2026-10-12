import {Fraction} from "../coefficients/fraction"
import type {FractionOrRandom, RandomFraction} from "./rndTypes"

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
    return v !== null && typeof v === 'object' && !Array.isArray(v)
}

/** Tells a random-draw description (`{ fraction }`) apart from an exact value (`2`, `'1/2'`, `Fraction`). */
export function isRandomFraction(value: FractionOrRandom): value is RandomFraction {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
    return typeof value === 'object' && value !== null && !(value instanceof Fraction)
}

/** Drops the entries set to `undefined`, so that "not provided" never overrides a default. */
function withoutUndefined(obj: object | undefined): Record<string, unknown> {
    return Object.fromEntries(Object.entries(obj ?? {}).filter(([, value]) => value !== undefined))
}

/**
 * Merges a config object with user overrides, deep-merging any plain-object sub-fields
 * (e.g. `allow`, `solution`). Prevents a partial sub-object from silently erasing the defaults.
 * An entry explicitly set to `undefined` counts as "not provided" and keeps the default
 * (callers in untyped JavaScript often build their configuration with possibly-undefined values).
 */
export function mergeConfig<T extends object>(defaults: T, user?: DeepPartial<T>): T {
    const merged = { ...defaults, ...withoutUndefined(user) } as T
    for (const key of Object.keys(defaults) as (keyof T)[]) {
        const d = defaults[key]
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
        const u = (user as Record<string, unknown>)?.[key as string]
        if (isPlainObject(d)) {
            merged[key] = { ...d as object, ...(isPlainObject(u) ? withoutUndefined(u) : {}) } as T[keyof T]
        }
    }
    return merged
}
