export function wrapParenthesis(str: string, tex = true): string {
    return tex ? `\\left( ${str} \\right)` : `(${str})`
}

export function stripParenthesis(str: string): string {
    if(str.startsWith('(')){
        str = str.substring(1)
    }

    if(str.endsWith(')')){
        str = str.substring(0, str.length-1)
    }

    return str
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

export function splitIfOutsideParentheses(
    value: string,
    splitChar: string,
): string[] {
    if (splitChar.length !== 1) {
        throw new Error(`splitChar must be a single character, got: "${splitChar}"`)
    }

    let depth = 0,
        lastIndex = 0
    const result: string[] = []

    for (let i = 0; i < value.length; i++) {
        const ch = value[i]
        if (ch === "(") depth++
        else if (ch === ")") depth--
        else if (ch === splitChar && depth === 0) {
            result.push(value.substring(lastIndex, i))
            lastIndex = i + 1
        }
    }

    result.push(value.substring(lastIndex))

    return result
}
