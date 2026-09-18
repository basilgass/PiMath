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

/**
 * Quadratic a2·x² + a1·x + a0. Exact when Δ is a perfect square (rational
 * roots), otherwise exact via a degree-2 Root ((-b ± √Δ)/2a). Returns [] when
 * Δ < 0.
 * @throws {MathError} on a wrong length or a zero leading coefficient.
 */
export function solveQuadratic(coeffs: Fraction[]): PolynomRoot[] {
    requireDegree(coeffs, 2, "solveQuadratic")
    const c = coeffs[0]
    const b = coeffs[1]
    const a = coeffs[2]

    const delta = b.clone().pow(2).subtract(a.clone().multiply(c).multiply(4))

    if (delta.isNegative()) {
        return []
    }

    const a2 = a.clone().multiply(2)

    if (delta.isSquare()) {
        const d = delta.sqrt()
        const f1 = b.clone().opposite().subtract(d).divide(a2.clone())
        const f2 = b.clone().opposite().add(d).divide(a2.clone())

        if (delta.isZero()) {
            return [exactRoot(f1, 2)]
        }
        return sortByValue([exactRoot(f1), exactRoot(f2)])
    }

    // Irrational roots: exact via a Root of index 2, sign carried by the factor.
    const root1 = new Root()
    root1.radical = delta.clone()
    root1.factor = new Fraction().one().divide(a2.clone())

    const root2 = new Root()
    root2.radical = delta.clone()
    root2.factor = new Fraction().one().divide(a2.clone()).opposite()

    const sol1: PolynomRoot = {
        fraction: b.clone().opposite().divide(a2.clone()),
        root: root1,
        exact: true,
        multiplicity: 1
    }
    const sol2: PolynomRoot = {
        fraction: b.clone().opposite().divide(a2.clone()),
        root: root2,
        exact: true,
        multiplicity: 1
    }

    return sortByValue([sol1, sol2])
}

/**
 * Residual cubic a3·x³ + a2·x² + a1·x + a0 via the depressed-cubic / Cardan
 * formulas. Every root is approximate (exact = false): an irreducible cubic is
 * not representable exactly by a single Root.
 * @throws {MathError} on a wrong length or a zero leading coefficient.
 */
export function solveCubicCardan(coeffs: Fraction[]): PolynomRoot[] {
    requireDegree(coeffs, 3, "solveCubicCardan")
    const a = coeffs[3].value
    const b = coeffs[2].value
    const c = coeffs[1].value
    const d = coeffs[0].value

    // Depressed cubic t^3 + p·t + q, with x = t - b/(3a).
    const p = (3 * a * c - b * b) / (3 * a * a)
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
    const shift = b / (3 * a)
    const epsilon = 1e-9

    const roots: number[] = []
    if (Math.abs(p) < epsilon) {
        // t^3 + q = 0 -> a single real root (triple when q = 0 too).
        roots.push(Math.cbrt(-q) - shift)
    } else {
        const discriminant = (q * q) / 4 + (p * p * p) / 27
        if (discriminant > epsilon) {
            // One real root.
            const sqrtDisc = Math.sqrt(discriminant)
            const u = Math.cbrt(-q / 2 + sqrtDisc)
            const v = Math.cbrt(-q / 2 - sqrtDisc)
            roots.push(u + v - shift)
        } else {
            // Three real roots (trigonometric form). p < 0 here.
            const m = 2 * Math.sqrt(-p / 3)
            const ratio = Math.max(-1, Math.min(1, (3 * q) / (p * m)))
            const theta = Math.acos(ratio)
            for (let i = 0; i < 3; i++) {
                roots.push(m * Math.cos(theta / 3 - (2 * Math.PI * i) / 3) - shift)
            }
        }
    }

    // De-duplicate repeated roots (double/triple on the boundary).
    const unique: number[] = []
    for (const r of roots.map(v => Numeric.numberCorrection(v, 6))) {
        if (!unique.some(u => Math.abs(u - r) < 1e-6)) {
            unique.push(r)
        }
    }

    return sortByValue(unique.map(v => approxRoot(v)))
}
