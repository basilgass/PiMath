
export function wrapParenthesis(str: string, tex = true): string {
    return tex ? `\\left( ${str} \\right)` : `(${str})`
}
export function wrapVert(str: string, tex = true): string {
    return tex ? `\\left\\vert ${str} \\right\\vert` : `|${str}|`
}
export function wrapNorm(str: string, tex = true): string {
    return tex ? `\\left\\Vect ${str} \\right\\Vect` : `||${str}||`
}