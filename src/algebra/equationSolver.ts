import type {Fraction} from "../coefficients"
import type {Polynom} from "./polynom"
import type {Equation} from "./equation"
import {Solution} from "../analyze"
import {InvalidArgumentError, MathError} from "../errors"
import type {PolynomRoot} from "../pimath.interface"
import {solveCubicCardan, solvePolynom} from "./polynomRoots"

/**
 * Internal service that solves P(x) = 0 for a Polynom or an Equation. Thin
 * adapter: it extracts a dense coefficient vector at the boundary and delegates
 * the arithmetic to the pure `polynomRoots` module, then wraps each raw root in
 * a Solution carrying the working variable.
 */
export class EquationSolver {
    readonly #coeffs: Fraction[]
    readonly #variable: string

    /**
     * Build a solver for P(x) = 0 from a polynom (optionally minus `right`, a
     * right-hand polynom subtracted from it) or from an equation (its members are
     * subtracted). The working variable defaults to the polynom's own single
     * variable, falling back to "x".
     * @throws {InvalidArgumentError} when `variable` is not a single lowercase letter.
     * @throws {MathError} when the resulting polynom has a non-integer degree.
     */
    constructor(left: Polynom | Equation, right?: Polynom, variable?: string) {
        if (variable !== undefined && !/^[a-z]$/.test(variable)) {
            throw new InvalidArgumentError(`EquationSolver expects a single lowercase variable, got "${variable}"`)
        }

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

        // Variable resolution: an explicit argument wins (tested with `!==
        // undefined` so an explicit "x" is honoured, not mistaken for the
        // default); otherwise use the polynom's own single variable; fall back to
        // "x" for a constant or multi-variable polynom.
        const vars = leftPolynom.variables
        this.#variable = variable ?? (vars.length === 1 ? vars[0] : "x")

        // Dense coefficient vector, coeffs[i] = coefficient of x^i (index 0 =
        // constant term). getCoefficients() returns highest-degree first, so we
        // reverse once here. Throws MathError on a non-integer degree.
        this.#coeffs = leftPolynom.getCoefficients().reverse()
    }

    /**
     * Solve P(x) = 0. Delegates the full cascade to solvePolynom; solutions are
     * sorted by value and `Solution.exact` distinguishes exact rationals /
     * quadratic radicals from approximate (Cardan / bisection) results.
     */
    solve(): Solution[] {
        return solvePolynom(this.#coeffs).map(root => this.#wrap(root))
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
        return solveCubicCardan(this.#coeffs).map(root => this.#wrap(root))
    }

    /** Wrap a raw root in a Solution carrying the solver's working variable. */
    #wrap(root: PolynomRoot): Solution {
        const sol = Solution.fromPolynomRoot(root)
        sol.variable = this.#variable
        return sol
    }
}
