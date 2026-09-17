import type {InputValue} from "../pimath.interface"
import type {Polynom} from "./polynom"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import type {Equation} from "./equation"
import {Solution} from "../analyze"
import {MathError} from "../errors"

export class EquationSolver {
    #bissectionDeltaX: number
    #bisectionSteps: number
    readonly #coeffs: Fraction[]
    readonly #variable: string

    constructor(left: Polynom | Equation, right?: Polynom, variable = "x") {
        this.#bissectionDeltaX = 1e-4
        this.#bisectionSteps = 0

        // Duck-type an Equation without importing it (avoids a circular import).
        // `in` walks the prototype chain, so it works whether `moveLeft` is an
        // instance field or a prototype method.
        let leftPolynom: Polynom
        if ('moveLeft' in left) {
            const equ = left
            leftPolynom = equ.left.clone().subtract(equ.right)
        } else {
            leftPolynom = left.clone().subtract(right ?? 0)
        }

        // Variable resolution: an explicit argument wins; otherwise use the
        // polynom's own single variable; fall back to "x" only for a constant
        // or multi-variable polynom.
        const vars = leftPolynom.variables
        this.#variable = variable !== "x"
            ? variable
            : (vars.length === 1 ? vars[0] : "x")

        // Dense coefficient vector, coeffs[i] = coefficient of x^i (index 0 =
        // constant term). getCoefficients() returns highest-degree first, so we
        // reverse once here. Throws MathError on a non-integer degree (strict
        // boundary).
        this.#coeffs = leftPolynom.getCoefficients().reverse()
    }

    get bissectionComplexityCounter(): number {
        return this.#bisectionSteps
    }

    get bissectionDeltaX() {
        return this.#bissectionDeltaX
    }

    set bissectionDeltaX(value: number) {
        this.#bissectionDeltaX = value
    }

    /**
     * Solve P(x) = 0. Cascade strategy: closed form for degree <= 2, exact
     * rational factorization then numeric fallback (Cardan for a residual
     * cubic, bisection for degree >= 4) beyond. Solutions are returned sorted
     * by value; `Solution.exact` distinguishes exact rationals / quadratic
     * radicals from approximate (Cardan / bisection) results.
     */
    solve(): Solution[] {
        const degree = this.#coeffs.length - 1

        if (degree <= 0) {
            return []
        }
        if (degree === 1) {
            return this.#solveLinearCoeffs(this.#coeffs)
        }
        if (degree === 2) {
            return this.#solveQuadraticCoeffs(this.#coeffs)
        }

        const {solutions, residual} = this.#solveByFactorizationCoeffs(this.#coeffs)
        const residualDegree = residual.length - 1

        if (residualDegree <= 0) {
            return solutions.sort((a, b) => a.value - b.value)
        }
        if (residualDegree === 1) {
            return solutions
                .concat(this.#solveLinearCoeffs(residual))
                .sort((a, b) => a.value - b.value)
        }
        if (residualDegree === 2) {
            return solutions
                .concat(this.#solveQuadraticCoeffs(residual))
                .sort((a, b) => a.value - b.value)
        }
        if (residualDegree === 3) {
            return solutions
                .concat(this.#solveCubicNumeric(residual))
                .sort((a, b) => a.value - b.value)
        }

        // Degree >= 4 residual: approximate via bisection.
        this.#bisectionSteps = 0
        return solutions
            .concat(this.#solveByBissectionCoeffs(residual))
            .sort((a, b) => a.value - b.value)
    }

    /**
     * Solve a cubic via the Cardan formulas. Always returns approximate
     * solutions (an irreducible cubic is not representable exactly).
     * @throws {MathError} when the polynom degree is not 3.
     */
    solveAsCardan(): Solution[] {
        if (this.#coeffs.length - 1 !== 3) {
            throw new MathError("The equation is not cubic.")
        }
        return this.#solveCubicNumeric(this.#coeffs)
    }

    #makeApproximativeSolution(value: number, output?: { tex: string, display: string }): Solution {
        const sol = new Solution()

        sol.exact = false
        sol.tex = output?.tex ?? null
        sol.display = output?.display ?? null
        sol.fraction = new Fraction(value)
        sol.fraction.exact = false
        sol.variable = this.#variable

        return sol
    }

    #makeSolution(value: InputValue<Fraction>): Solution {
        const sol = (value instanceof Fraction && !value.exact)
            ? this.#makeApproximativeSolution(value.value)
            : Solution.fromFraction(value)

        sol.variable = this.#variable

        return sol
    }

    /**
     * Exact evaluation of the polynom (coeffs[i] = coefficient of x^i) at r,
     * via Horner's scheme. No side effect on coeffs or r.
     */
    #hornerFraction(coeffs: Fraction[], r: Fraction): Fraction {
        const acc = new Fraction(0)
        for (let i = coeffs.length - 1; i >= 0; i--) {
            acc.multiply(r).add(coeffs[i])
        }
        return acc
    }

    /**
     * Floating-point evaluation at x, via Horner's scheme. Used as a cheap
     * pre-filter for rational-root candidates and by the bisection.
     */
    #hornerNumber(coeffs: Fraction[], x: number): number {
        let acc = 0
        for (let i = coeffs.length - 1; i >= 0; i--) {
            acc = acc * x + coeffs[i].value
        }
        return acc
    }

    /**
     * Synthetic division of the polynom by (x - r), assuming r is an exact
     * root. Returns the quotient coefficient vector (same convention,
     * length - 1). O(n). No side effect on the input.
     */
    #deflate(coeffs: Fraction[], r: Fraction): Fraction[] {
        const deg = coeffs.length - 1
        const q: Fraction[] = new Array<Fraction>(deg)
        q[deg - 1] = coeffs[deg].clone()
        for (let i = deg - 1; i >= 1; i--) {
            q[i - 1] = coeffs[i].clone().add(r.clone().multiply(q[i]))
        }
        return q
    }

    /**
     * Cauchy bound for the real roots: every real root lies in [-B, B] with
     * B = 1 + max_i |a_i / a_n|. Uses absolute values (a negative-coefficient
     * polynom must not shrink the bound).
     */
    #cauchyBound(coeffs: Fraction[]): number {
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
     * Rational-root-theorem candidates p/q (p | a0, q | a_deg) for a residual
     * polynom whose constant term is non-zero. Coefficients are first cleared
     * of denominators (multiply by the lcm) then reduced by their content
     * (gcd) to keep the divisor sets small. Candidates are de-duplicated by
     * reduced form.
     */
    #rationalRootCandidates(coeffs: Fraction[]): Fraction[] {
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
     * Exact factorization over the rationals on the coefficient vector.
     * Strips the zero root (with its multiplicity), then applies the rational
     * root theorem with a floating pre-filter and exact confirmation,
     * deflating by synthetic division. Returns the exact solutions found and
     * the residual coefficient vector (whose real roots, if any, are not
     * rational).
     */
    #solveByFactorizationCoeffs(coeffs: Fraction[]): { solutions: Solution[], residual: Fraction[] } {
        const solutions: Solution[] = []

        // Strip the zero root with its multiplicity (low-order zero coeffs).
        let k = 0
        while (k < coeffs.length - 1 && coeffs[k].isZero()) {
            k++
        }
        let residual = k > 0 ? coeffs.slice(k) : coeffs.slice()
        if (k > 0) {
            const zero = this.#makeSolution(0)
            zero.count = k
            solutions.push(zero)
        }

        // Rational root theorem with float pre-filter + exact confirmation.
        const candidates = this.#rationalRootCandidates(residual)
        const epsilon = 1e-9
        for (const f of candidates) {
            if (residual.length - 1 < 1) {
                break
            }
            // Cheap float sieve first.
            if (Math.abs(this.#hornerNumber(residual, f.value)) > epsilon) {
                continue
            }
            // Exact confirmation.
            if (!this.#hornerFraction(residual, f).isZero()) {
                continue
            }
            const sol = this.#makeSolution(f.clone())
            sol.count = 0
            while (residual.length - 1 >= 1 && this.#hornerFraction(residual, f).isZero()) {
                residual = this.#deflate(residual, f)
                sol.count++
            }
            solutions.push(sol)
        }

        return {solutions, residual}
    }

    /** Linear polynom a1·x + a0 -> x = -a0/a1. Exact. */
    #solveLinearCoeffs(coeffs: Fraction[]): Solution[] {
        const a0 = coeffs[0]
        const a1 = coeffs[1]
        return [this.#makeSolution(a0.clone().opposite().divide(a1))]
    }

    /**
     * Quadratic polynom a2·x^2 + a1·x + a0. Exact when the discriminant is a
     * perfect square (rational solutions), otherwise represented exactly by a
     * degree-2 Root ((-b ± √Δ)/2a). No real solution when Δ < 0.
     */
    #solveQuadraticCoeffs(coeffs: Fraction[]): Solution[] {
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
                const sol = this.#makeSolution(f1)
                sol.count = 2
                return [sol]
            }
            return [this.#makeSolution(f1), this.#makeSolution(f2)]
                .sort((x, y) => x.value - y.value)
        }

        // Irrational quadratic roots: exact via Root of index 2.
        const sol1 = new Solution()
        sol1.fraction = b.clone().opposite().divide(a2.clone())
        sol1.root.radical = delta.clone()
        sol1.root.factor = new Fraction().one().divide(a2.clone())
        sol1.exact = true
        sol1.variable = this.#variable

        const sol2 = new Solution()
        sol2.fraction = b.clone().opposite().divide(a2.clone())
        sol2.root.radical = delta.clone()
        sol2.root.factor = new Fraction().one().divide(a2.clone()).opposite()
        sol2.exact = true
        sol2.variable = this.#variable

        return [sol1, sol2].sort((x, y) => x.value - y.value)
    }

    /**
     * Numerical resolution of a residual cubic a3·x^3 + a2·x^2 + a1·x + a0
     * (already free of rational roots). Uses the depressed-cubic / Cardan
     * formulas; every solution is approximate (exact = false), since an
     * irreducible cubic is not representable exactly by a single Root.
     */
    #solveCubicNumeric(coeffs: Fraction[]): Solution[] {
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

        // De-duplicate repeated roots (double/triple roots on the boundary).
        const unique: number[] = []
        for (const r of roots.map(v => Numeric.numberCorrection(v, 6))) {
            if (!unique.some(u => Math.abs(u - r) < 1e-6)) {
                unique.push(r)
            }
        }

        return unique
            .map(v => this.#makeApproximativeSolution(v))
            .sort((x, y) => x.value - y.value)
    }

    /**
     * Approximate the real roots of a residual polynom (degree >= 4) by
     * scanning [-B, B] (B = Cauchy bound) for sign changes, then bisecting.
     * All solutions are approximate (exact = false).
     */
    #solveByBissectionCoeffs(coeffs: Fraction[]): Solution[] {
        const degree = coeffs.length - 1
        const B = this.#cauchyBound(coeffs)
        const slices = 100
        const dx = (2 * B) / slices

        const solutions: Solution[] = []
        let prevX = -B
        let prevF = this.#hornerNumber(coeffs, prevX)

        for (let step = 1; step <= slices; step++) {
            const x = Numeric.numberCorrection(-B + step * dx)
            const f = this.#hornerNumber(coeffs, x)

            if (f === 0) {
                solutions.push(this.#makeApproximativeSolution(x))
            } else if (prevF * f < 0) {
                const root = this.#bisect(coeffs, prevX, x)
                if (root !== null) {
                    solutions.push(this.#makeApproximativeSolution(root))
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

    /** Bisection on [a, b] assuming a sign change; returns the approximate root. */
    #bisect(coeffs: Fraction[], a: number, b: number): number | null {
        let fa = this.#hornerNumber(coeffs, a)

        if (fa * this.#hornerNumber(coeffs, b) > 0) {
            return null
        }

        while ((b - a) / 2 > this.#bissectionDeltaX) {
            this.#bisectionSteps++
            const mid = (a + b) / 2
            const fmid = this.#hornerNumber(coeffs, mid)

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
}
