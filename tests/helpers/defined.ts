/** The value itself, or a failure of the test when it is `null` or `undefined` (instead of a `!` assertion). */
export function defined<T>(value: T | null | undefined): T {
    if (value === null || value === undefined) {
        throw new Error('expected a value, got ' + String(value))
    }
    return value
}
