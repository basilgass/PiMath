import type {InputValue, IPiMathObject} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Root} from "../coefficients/root"
import {solveQuadratic} from "../algebra/polynomRoots"
import type {PolynomRoot} from "../algebra/polynomRoots"
import {InvalidArgumentError, ParseError} from "../errors"

/**
 * An equation / polynomial root as an exact decomposed value: a rational part
 * (`#fraction`) plus a radical part (`#root`).
 *
 * Invariant (maintained by the producers, not enforced by the type): `#fraction`
 * carries every rational part, and `#root` is either zero or a *genuinely
 * irrational* radical — never a perfect-power radical that would reduce to a
 * rational. `EquationSolver` / `fromQuadratic` only build a radical on the
 * non-square-discriminant branch, so a non-zero `#root` always accompanies a
 * truly irrational value.
 *
 * The `tex` / `display` composition relies on this: it runs the two-part
 * `(numerator ± radical)/denominator` layout only when both parts are non-zero,
 * i.e. on a real irrational. It does not re-simplify a manually built
 * perfect-power radical (e.g. `#fraction = 1`, `#root = √4`), which would render
 * as the unsimplified `1 +2` — an incoherent state the producers never create.
 */
export class Solution implements IPiMathObject<Solution> {
    #count: number
    #display: string | null
    #exact: boolean
    #fraction: Fraction
    #root: Root
    #tex: string | null
    #variable: string

    constructor() {
        this.#variable = 'x'
        this.#exact = false

        this.#display = null
        this.#tex = null

        this.#fraction = new Fraction().zero()
        this.#root = new Root()
        this.#count = 1
    }

    /**
     * LaTeX rendering. An explicit override (`set tex`) takes precedence;
     * otherwise the value is composed from its parts (see `#compose`): the
     * fraction or radical alone in the degenerate cases, else
     * `(numerator ± radical)/denominator` over a common denominator.
     */
    get tex(): string {
        if (this.#tex) return this.#tex

        return this.#compose(
            this.#fraction.tex,
            this.#root.tex,
            (numerator, R) => `${numerator} ${R.withSign.tex}`,
            (num, denominator) => `\\frac{ ${num} }{ ${denominator} }`
        )
    }

    set tex(value: string | null) {
        this.#tex = value
    }

    /**
     * ASCII rendering. Mirrors `tex` (override precedence, then `#compose`).
     * Returns `null` only when explicitly overridden to `null` via `set display`.
     */
    get display(): string {
        if(this.#display) return this.#display

        return this.#compose(
            this.#fraction.display,
            this.#root.display,
            (numerator, R) => `${numerator}${R.withSign.display}`,
            (num, denominator) => `(${num})/${denominator}`
        )
    }

    set display(value: string | null) {
        this.#display = value
    }

    /**
     * Shared `tex` / `display` layout: fraction-only and radical-only degenerate
     * cases, otherwise the `(numerator ± radical)/denominator` composition over a
     * common denominator. `joinNumerator` and `wrap` supply the format-specific
     * syntax so the branching logic lives in one place.
     */
    #compose(
        fractionPart: string,
        rootPart: string,
        joinNumerator: (numerator: number, radical: Root) => string,
        wrap: (numerator: string, denominator: number) => string
    ): string {
        if (this.#root.isZero()) return fractionPart

        if (this.#fraction.isZero()) return rootPart

        const [f] = Fraction.toSameDenominateur(this.#fraction, this.#root.factor)

        const R = this.#root.clone().multiply(f.denominator).reduce()
        const num = joinNumerator(f.numerator, R)

        if (f.denominator === 1) return num

        return wrap(num, f.denominator)
    }

    static fromFraction(value: InputValue<Fraction>): Solution {
        const sol = new Solution()
        sol.setExact()

        const F = new Fraction(value)
        sol.display = F.display
        sol.tex = F.tex

        sol.#fraction = F
        sol.#root = new Root()

        return sol
    }

    static fromRoot(value: InputValue<Root>): Solution {
        const sol = new Solution()
        sol.#root = new Root(value)
        sol.#exact = true
        return sol
    }

    /** Wrap a raw `PolynomRoot` (fraction + radical parts) into a Solution, mapping its multiplicity to `count`. */
    static fromPolynomRoot(root: PolynomRoot): Solution {
        const sol = new Solution()
        sol.#fraction = root.fraction.clone()
        sol.#root = root.root.clone()
        sol.#exact = root.exact
        sol.#count = root.multiplicity
        return sol
    }

    /**
     * Solve A·x² + B·x + C = 0. Returns `[]` when the discriminant is negative,
     * a single solution (with `count === 2`) for a double root, otherwise the two
     * solutions. Irrational roots are kept exact (index-2 `Root`).
     */
    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[] {
        const [a, b, c] = [A, B, C].map(x => new Fraction(x))
        // Coefficients low->high: [constant, x, x^2] = [C, B, A].
        return solveQuadratic([c, b, a]).map(root => Solution.fromPolynomRoot(root))
    }

    /**
     * Parse a string representation of a solution. Three strict forms:
     *
     * - Pure rational : `2/5`, `-3`, `1.23`
     * - Pure radical  : `sqrt(5)`, `-2sqrt(3)`, `sqrt(5)/3`, `2sqrt(3)/5`
     * - Combined      : `(-1+sqrt(5))/2`, `(3-2sqrt(7))/4`
     *
     * @throws {ParseError} if the string matches none of the supported forms.
     */
    static fromString(value: string): Solution {
        const s = value.trim()

        // Combined: (integer ± [coeff]sqrt(radicand)) / denominator
        const combined = /^\(([+-]?\d+)([+-])(\d*)sqrt\((\d+)\)\)\/(\d+)$/.exec(s)
        if (combined) {
            const [, numStr, sign, coeffStr, radStr, denomStr] = combined
            const q = +denomStr
            const sol = new Solution()
            sol.#fraction = new Fraction(+numStr, q)
            const coeff = coeffStr === '' ? 1 : +coeffStr
            const rootFactor = new Fraction(sign === '-' ? -coeff : coeff, q)
            const root = new Root()
            root.index = 2
            root.radical = new Fraction(+radStr)
            root.factor = rootFactor
            sol.#root = root
            sol.#exact = true
            return sol
        }

        // Pure radical: delegate entirely to Root.fromString
        if (s.includes('sqrt') || s.includes('root')) {
            const sol = new Solution()
            sol.#fraction = new Fraction().zero()
            sol.#root = Root.fromString(s)
            sol.#exact = true
            return sol
        }

        // Pure rational
        const frac = Fraction.fromString(s)
        if (frac.isNaN()) throw new ParseError(`Cannot parse "${value}" as a Solution`)
        return Solution.fromFraction(frac)
    }

    /**
     * Router that builds a Solution from a supported input by delegating to the
     * matching factory: `Fraction` -> `fromFraction`, `Root` -> `fromRoot`,
     * `PolynomRoot` -> `fromPolynomRoot`, and a same-type `Solution` -> `copy`.
     */
    static parse(value: Fraction | Root | PolynomRoot | Solution): Solution {
        if (value instanceof Solution) return new Solution().copy(value)
        if (value instanceof Fraction) return Solution.fromFraction(value)
        if (value instanceof Root) return Solution.fromRoot(value)

        return Solution.fromPolynomRoot(value)
    }

    /**
     * Copy the math state of another Solution into `this` (parts are cloned).
     * Display overrides are *not* transferred, and any stale `#display`/`#tex`
     * on `this` is dropped so the getters recompute from the new state.
     */
    copy(value: Solution): this {
        this.#fraction = value.#fraction.clone()
        this.#root = value.#root.clone()
        this.#exact = value.#exact
        this.#count = value.#count
        this.#variable = value.#variable
        this.#display = null
        this.#tex = null

        return this
    }

    /** Full duplicate of this Solution, including the display state (`#display`/`#tex`). */
    clone(): Solution {
        const sol = new Solution()
        sol.#fraction = this.#fraction.clone()
        sol.#root = this.#root.clone()
        sol.#exact = this.#exact
        sol.#count = this.#count
        sol.#variable = this.#variable
        sol.#display = this.#display
        sol.#tex = this.#tex

        return sol
    }

    /** Multiplicity of the root (always >= 1; defaults to 1). A double root reports 2, etc. */
    get count(): number {
        return this.#count
    }

    /**
     * Whether the value is faithfully exact: `true` for an exact rational or a
     * quadratic irrational carried by an index-2 `Root`, `false` for a floating
     * (Cardan / bisection) approximation. Never mark a float value exact.
     */
    get exact(): boolean {
        return this.#exact
    }

    get fraction(): Fraction {
        return this.#fraction
    }

    isZero(): boolean {
        return this.#fraction.isZero() && this.#root.isZero()
    }

    /**
     * Reduce the radical and rational parts to their canonical form, in place,
     * and return `this`. Deliberate exception to the clone-and-commit atomicity
     * convention: `Root.reduce` / `Fraction.reduce` are total (never throw), so
     * the receiver cannot be left half-mutated.
     */
    reduce(): this {
        this.#root.reduce()
        this.#fraction.reduce()

        return this
    }

    get root(): Root {
        return this.#root
    }

    setExact(value = true): this {
        this.#exact = value
        return this
    }

    get value(): number {
        return this.fraction.value + this.root.value
    }

    get variable(): string {
        return this.#variable
    }

    set variable(value: string | undefined) {
        if (value === undefined) {
            return
        }

        if (!/^[a-z]$/.test(value)) {
            throw new InvalidArgumentError(`variable expects a single lowercase letter, got "${value}"`)
        }

        this.#variable = value
    }
}