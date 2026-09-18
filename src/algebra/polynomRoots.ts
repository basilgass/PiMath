import {Fraction} from "../coefficients"
import {Root} from "../coefficients/root"
import {Numeric} from "../numeric"
import {MathError} from "../errors"

/**
 * A polynomial root as raw data (no display state, no Solution class).
 * `fraction` is the rational part, `root` the radical part (a zero Root when
 * there is none). `exact` is faithful to the contract: true for an exact
 * rational or a quadratic irrational carried by an index-2 Root, false for a
 * Cardan / bisection (floating) value. `multiplicity` is always >= 1.
 */
export interface PolynomRoot {
    fraction: Fraction
    root: Root
    exact: boolean
    multiplicity: number
}

/** Numeric value of a root (rational + radical parts), used for sorting. */
function rootValue(r: PolynomRoot): number {
    return r.fraction.value + r.root.value
}

/** Build an exact rational root (no radical part). */
function exactRoot(fraction: Fraction, multiplicity = 1): PolynomRoot {
    return {fraction: fraction.clone(), root: new Root(), exact: true, multiplicity}
}

/** Build an approximate (float-backed) root (no radical part). */
function approxRoot(value: number, multiplicity = 1): PolynomRoot {
    const fraction = new Fraction(value)
    fraction.exact = false
    return {fraction, root: new Root(), exact: false, multiplicity}
}

/** Sort roots ascending by numeric value (in place) and return them. */
function sortByValue(roots: PolynomRoot[]): PolynomRoot[] {
    return roots.sort((a, b) => rootValue(a) - rootValue(b))
}

/** Strip trailing (high-degree) zero coefficients to recover the true degree. */
function normalize(coeffs: Fraction[]): Fraction[] {
    let end = coeffs.length
    while (end > 0 && coeffs[end - 1].isZero()) {
        end--
    }
    return coeffs.slice(0, end)
}

/**
 * @throws {MathError} when coeffs is not a dense degree-`degree` vector with a
 * non-zero leading coefficient (a closed form must honour its degree).
 */
function requireDegree(coeffs: Fraction[], degree: number, name: string): void {
    if (coeffs.length !== degree + 1 || coeffs[degree].isZero()) {
        throw new MathError(`${name} requires a degree-${degree} coefficient vector with a non-zero leading coefficient`)
    }
}

/**
 * Linear a1·x + a0 -> x = -a0/a1. Exact.
 * @throws {MathError} on a wrong length or a zero leading coefficient.
 */
export function solveLinear(coeffs: Fraction[]): PolynomRoot[] {
    requireDegree(coeffs, 1, "solveLinear")
    const a0 = coeffs[0]
    const a1 = coeffs[1]
    return [exactRoot(a0.clone().opposite().divide(a1))]
}
