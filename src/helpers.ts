export function wrapParenthesis(str: string, tex = true): string {
    return tex ? `\\left( ${str} \\right)` : `(${str})`
}

export function wrapVert(str: string, tex = true): string {
    return tex ? `\\left\\vert ${str} \\right\\vert` : `|${str}|`
}

export function wrapNorm(str: string, tex = true): string {
    return tex ? `\\left\\Vect ${str} \\right\\Vect` : `||${str}||`
}

export function replace_in_array<T>(haystack: string[], search: string, target: string, start?: number, end?: number): T {
    return haystack.map((x, index) => {
        if (start !== undefined && index < start) {
            return x
        }
        if (end !== undefined && index > end) {
            return x
        }
        return x === search ? target : x
    }) as T
}
