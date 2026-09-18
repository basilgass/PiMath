import {Fraction} from "../coefficients"
import {Root} from "../coefficients/root"
import {Numeric} from "../numeric"
import {InvalidArgumentError, MathError} from "../errors"

/**
 * A polynomial root as raw data (no display state, no Solution class).
 * `fraction` is the rational part, `root` the radical part (a zero Root when
 * there is none). `exact` is faithful to the contract: true for an exact
 * rational or a quadratic irrational carried by an index-2 Root, false for a
 * Cardan / bisection (floating) value. `multiplicity` is always >= 1.
 */
export interface PolynomRoot {
    readonly fraction: Fraction
    readonly root: Root
    readonly exact: boolean
    readonly multiplicity: number
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

/** Exact evaluation at r via Horner. No side effect. */
function hornerFraction(coeffs: Fraction[], r: Fraction): Fraction {
    const acc = new Fraction(0)
    for (let i = coeffs.length - 1; i >= 0; i--) {
        acc.multiply(r).add(coeffs[i])
    }
    return acc
}

/** Floating-point evaluation at x via Horner. Cheap sieve / bisection helper. */
function hornerNumber(coeffs: Fraction[], x: number): number {
    let acc = 0
    for (let i = coeffs.length - 1; i >= 0; i--) {
        acc = acc * x + coeffs[i].value
    }
    return acc
}

/** Synthetic division by (x - r), assuming r is a root. Returns the quotient. */
function deflate(coeffs: Fraction[], r: Fraction): Fraction[] {
    const deg = coeffs.length - 1
    const q: Fraction[] = new Array<Fraction>(deg)
    q[deg - 1] = coeffs[deg].clone()
    for (let i = deg - 1; i >= 1; i--) {
        q[i - 1] = coeffs[i].clone().add(r.clone().multiply(q[i]))
    }
    return q
}

/** Cauchy bound: every real root lies in [-B, B], B = 1 + max_i |a_i / a_n|. */
function cauchyBound(coeffs: Fraction[]): number {
    const deg = coeffs.length - 1
    const an = coeffs[deg].value
    let max = 0
    for (let i = 0; i < deg; i++) {
        const ratio = Math.abs(coeffs[i].value / an)
        if (ratio > max) max = ratio
    }
    return 1 + max
}

/**
 * Rational-root candidates p/q (p | a0, q | a_deg). Coefficients are cleared of
 * denominators (× lcm) then reduced by their content (gcd) to bound the divisor
 * sets. De-duplicated by reduced form.
 */
function rationalRootCandidates(coeffs: Fraction[]): Fraction[] {
    const denomLcm = Numeric.lcm(...coeffs.map(c => c.denominator))
    const ints = coeffs.map(c => c.clone().multiply(denomLcm).value)

    const nonZero = ints.filter(v => v !== 0).map(v => Math.abs(v))
    const content = nonZero.length > 0 ? Numeric.gcd(...nonZero) : 1
    const prim = ints.map(v => v / content)

    const a0 = Math.abs(prim[0])
    const an = Math.abs(prim[prim.length - 1])

    const P = Numeric.dividers(a0)
    const Q = Numeric.dividers(an)

    const seen = new Set<string>()
    const out: Fraction[] = []
    for (const p of P) {
        for (const q of Q) {
            for (const sign of [1, -1]) {
                const f = new Fraction(sign * p, q)
                const key = `${f.numerator}/${f.denominator}`
                if (!seen.has(key)) {
                    seen.add(key)
                    out.push(f)
                }
            }
        }
    }
    return out
}

/**
 * Exact factorization over the rationals. Strips the zero root (with its
 * multiplicity), then applies the rational root theorem with a floating
 * pre-filter and exact confirmation, deflating by synthetic division. Returns
 * the exact roots found and the residual (whose real roots, if any, are not
 * rational).
 */
function solveByFactorization(coeffs: Fraction[]): { solutions: PolynomRoot[], residual: Fraction[] } {
    const solutions: PolynomRoot[] = []

    let k = 0
    while (k < coeffs.length - 1 && coeffs[k].isZero()) {
        k++
    }
    let residual = k > 0 ? coeffs.slice(k) : coeffs.slice()
    if (k > 0) {
        solutions.push(exactRoot(new Fraction(0), k))
    }

    const candidates = rationalRootCandidates(residual)
    const epsilon = 1e-9
    for (const f of candidates) {
        if (residual.length - 1 < 1) {
            break
        }
        // Cheap float sieve first.
        if (Math.abs(hornerNumber(residual, f.value)) > epsilon) {
            continue
        }
        // Exact confirmation.
        if (!hornerFraction(residual, f).isZero()) {
            continue
        }
        let multiplicity = 0
        while (residual.length - 1 >= 1 && hornerFraction(residual, f).isZero()) {
            residual = deflate(residual, f)
            multiplicity++
        }
        solutions.push(exactRoot(f.clone(), multiplicity))
    }

    return {solutions, residual}
}

/** Bisection on [a, b] assuming a sign change; returns the approximate root. */
function bisect(coeffs: Fraction[], a: number, b: number, deltaX: number): number | null {
    let fa = hornerNumber(coeffs, a)
    if (fa * hornerNumber(coeffs, b) > 0) {
        return null
    }
    while ((b - a) / 2 > deltaX) {
        const mid = (a + b) / 2
        const fmid = hornerNumber(coeffs, mid)
        if (fmid === 0) {
            return mid
        }
        if (fa * fmid < 0) {
            b = mid
        } else {
            a = mid
            fa = fmid
        }
    }
    return (a + b) / 2
}

/**
 * Approximate the real roots of a residual polynom (degree >= 4) by scanning
 * [-B, B] (B = Cauchy bound) in 100 slices for sign changes, then bisecting. All
 * roots are approximate (exact = false). Known limitation: two roots inside the
 * same slice (very close roots) are not separated, and one may be missed.
 */
function solveByBisection(coeffs: Fraction[], deltaX: number): PolynomRoot[] {
    const degree = coeffs.length - 1
    const B = cauchyBound(coeffs)
    const slices = 100
    const dx = (2 * B) / slices

    const solutions: PolynomRoot[] = []
    let prevX = -B
    let prevF = hornerNumber(coeffs, prevX)

    for (let step = 1; step <= slices; step++) {
        const x = Numeric.numberCorrection(-B + step * dx)
        const f = hornerNumber(coeffs, x)

        if (f === 0) {
            solutions.push(approxRoot(x))
        } else if (prevF * f < 0) {
            const root = bisect(coeffs, prevX, x, deltaX)
            if (root !== null) {
                solutions.push(approxRoot(root))
            }
        }

        if (solutions.length === degree) {
            break
        }
        prevX = x
        prevF = f
    }

    return solutions
}

/**
 * Solve P(x) = 0 on a coefficient vector (coeffs[i] = coefficient of x^i).
 * Normalizes trailing zeros, then cascades: closed form for degree <= 2, exact
 * rational factorization then a numeric fallback (Cardan for a residual cubic,
 * bisection for degree >= 4) beyond. Roots are returned sorted by value; an empty
 * vector or a constant (degree <= 0 after normalization) yields `[]`.
 * @param options.bisectionDeltaX half-interval width at which the degree->=4
 * bisection stops (default 1e-4); must be > 0.
 * @throws {InvalidArgumentError} when `bisectionDeltaX` is <= 0.
 */
export function solvePolynom(coeffs: Fraction[], options?: { bisectionDeltaX?: number }): PolynomRoot[] {
    const deltaX = options?.bisectionDeltaX ?? 1e-4
    if (deltaX <= 0) {
        throw new InvalidArgumentError("bisectionDeltaX must be > 0")
    }

    const c = normalize(coeffs)
    const degree = c.length - 1

    if (degree <= 0) {
        return []
    }
    if (degree === 1) {
        return solveLinear(c)
    }
    if (degree === 2) {
        return solveQuadratic(c)
    }

    const {solutions, residual} = solveByFactorization(c)
    const residualDegree = residual.length - 1

    if (residualDegree <= 0) {
        return sortByValue(solutions)
    }
    if (residualDegree === 1) {
        return sortByValue(solutions.concat(solveLinear(residual)))
    }
    if (residualDegree === 2) {
        return sortByValue(solutions.concat(solveQuadratic(residual)))
    }
    if (residualDegree === 3) {
        return sortByValue(solutions.concat(solveCubicCardan(residual)))
    }

    return sortByValue(solutions.concat(solveByBisection(residual, deltaX)))
}
