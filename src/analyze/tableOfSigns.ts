import type {InputAlgebra, IPiMathObject, TableOfSignsValues} from "../pimath.interface"
import {Factor, PolyFactor, Polynom} from "../algebra"
import {replace_in_array} from "../helpers"
import {NotImplementedError} from "../errors"
import {Solution} from "./solution"
import {Domain} from "./domain"
import {Interval} from "./interval"

// Internal types
interface TosRow { roots: Solution[], signs: TableOfSignsValues[] }
type FactorTosRow = TosRow & { factor: Factor }

/**
 * The table of signs of a polynom, a factor or a factored expression: its roots, the sign of the value between
 * them, and the `tkz-tab` LaTeX code to draw it. It also gives the intervals where the expression is positive or
 * negative, its zeros and its poles.
 * The signs are `+`, `-`, `z` (zero), `d` (pole), `h` (hatched interval, where the expression is not defined), and `t` (no root of the factor at that place).
 * @example
 * new TableOfSigns(new Polynom("x^2-1")).negative().display // "]-1;1["
 */
export class TableOfSigns implements IPiMathObject<TableOfSigns> {
    #roots: Solution[]
    #signs: TableOfSignsValues[]
    #factorRows: FactorTosRow[]

    // Display state
    #withFactors = false
    #label = 'f(x)'
    #tkzLgt = 2
    #tkzEspcl = 1.2

    constructor(value?: InputAlgebra<PolyFactor | Factor | Polynom>) {
        this.#roots = []
        this.#signs = ['']
        this.#factorRows = []
        if (value !== undefined) this.parse(value)
    }

    // -------------------------------------------------------------------------
    // parse / Static factories
    // -------------------------------------------------------------------------

    /**
     * Replace the table with the one of a polyfactor, a factor, a polynom, or anything a factor accepts.
     */
    parse(value: InputAlgebra<PolyFactor | Factor | Polynom>): this {
        if (value instanceof PolyFactor) return this.copy(TableOfSigns.fromPolyFactor(value))
        if (value instanceof Factor)     return this.copy(TableOfSigns.fromFactor(value))
        if (value instanceof Polynom)    return this.copy(TableOfSigns.fromPolynom(value))
        return this.copy(TableOfSigns.fromFactor(new Factor(value)))
    }

    /**
     * Build the table of a polynom.
     */
    static fromPolynom(p: Polynom): TableOfSigns {
        const tos = new TableOfSigns()
        const row = TableOfSigns.#computePolynomSigns(p)
        tos.#roots = row.roots
        tos.#signs = row.signs
        return tos
    }

    /**
     * Build the table of a factor. A negative power makes its roots poles, and an even power removes the negative signs.
     */
    static fromFactor(f: Factor): TableOfSigns {
        const tos = new TableOfSigns()
        const row = TableOfSigns.#computeFactorSigns(f)
        tos.#roots = row.roots
        tos.#signs = row.signs
        return tos
    }

    /**
     * Build the table of a product of factors. The table keeps one row per factor, shown with {@link withFactors}.
     */
    static fromPolyFactor(pf: PolyFactor): TableOfSigns {
        const tos = new TableOfSigns()
        const data = TableOfSigns.#computePolyFactorSigns(pf)
        tos.#roots = data.roots
        tos.#signs = data.signs
        tos.#factorRows = data.factorRows
        return tos
    }

    // -------------------------------------------------------------------------
    // Sign computation (moved from algebra classes)
    // -------------------------------------------------------------------------

    static #computePolynomSigns(p: Polynom): TosRow {
        const roots = p.roots
        let signs: TableOfSignsValues[] = new Array(2 * roots.length + 1)
            .fill('')
            .map((_x, index) => index % 2 === 0 ? '' : 'z')

        if (signs.length === 1) {
            const [a] = p.getCoefficients().map(x => x.value)
            signs = replace_in_array(signs, '', a > 0 ? '+' : a < 0 ? '-' : 'z') as TableOfSignsValues[]
        } else {
            const variable = p.variables[0] ?? 'x'
            const testingRoots = [
                roots[0].value - 1,
                ...roots.map((_root, index) =>
                    index === roots.length - 1
                        ? roots[index].value + 1
                        : (roots[index].value + roots[index + 1].value) / 2
                ),
            ]
            testingRoots.forEach((test, index) => {
                const sign = p.evaluate({[variable]: test}, true)
                signs[index * 2] = sign > 0 ? '+' : '-'
            })
        }

        return {roots, signs}
    }

    static #computeFactorSigns(f: Factor): TosRow {
        const pow = f.power.reduce()
        const tos = TableOfSigns.#computePolynomSigns(f.polynom)

        if (pow.isStrictlyNegative()) {
            tos.signs = replace_in_array(tos.signs, 'z', 'd') as TableOfSignsValues[]
        }

        if (pow.denominator % 2 === 0) {
            tos.signs = replace_in_array(tos.signs, '-', 'h') as TableOfSignsValues[]
        } else if (pow.numerator % 2 === 0) {
            tos.signs = replace_in_array(tos.signs, '-', '+') as TableOfSignsValues[]
        }

        return {roots: tos.roots, signs: tos.signs}
    }

    static #computePolyFactorSigns(pf: PolyFactor): { roots: Solution[], signs: TableOfSignsValues[], factorRows: FactorTosRow[] } {
        const roots = pf.roots
        const rootsKey = roots.map(x => x.value)

        const factorRows: FactorTosRow[] = pf.factorize().factors
            .map(factor => {
                const row = TableOfSigns.#computeFactorSigns(factor)
                return {factor: new Factor(factor), roots: row.roots, signs: row.signs}
            })

        // Align each factor sign row to the global roots list
        factorRows.forEach(item => {
            const emptySign = new Array<TableOfSignsValues>(2 * roots.length + 1).fill('')
            let sign = item.signs.shift()
            let root = item.roots.shift()

            const alignedSigns = emptySign.map((_s, index) => {
                if (index % 2 === 0) return sign ?? ''

                if (root?.value !== rootsKey[(index - 1) / 2]) return 't'

                const rootSign = item.signs.shift() as unknown as TableOfSignsValues
                sign = item.signs.shift()
                root = item.roots.shift()
                return rootSign
            })

            item.roots = roots
            item.signs = alignedSigns
        })

        // Build the product sign row
        const signs: TableOfSignsValues[] = factorRows
            .map(item => [...item.signs])
            .reduce<TableOfSignsValues[]>((a, b) => {
                if (a.length === 0) return b
                b.forEach((value, index) => {
                    switch (value) {
                        case 'd': a[index] = 'd'; break
                        case 'z': a[index] = a[index] === 'd' ? 'd' : 'z'; break
                        case 'h': a[index] = 'h'; break
                        case '-': a[index] = a[index] === 'h' ? 'h' : a[index] === '-' ? '+' : '-'; break
                    }
                })
                return a
            }, [])

        return {roots, signs, factorRows}
    }

    // -------------------------------------------------------------------------
    // IPiMathObject
    // -------------------------------------------------------------------------

    // Label for a factor line: use the absolute value of the power so that
    // denominator factors (negative power) are displayed without the minus sign.
    // |pow| = 1 → polynom only; |pow| ≠ 1 → clone with |pow| to get its tex.
    static #factorLabel(f: Factor): string {
        const absPow = f.power.clone().reduce()
        if (absPow.isStrictlyNegative()) absPow.opposite()
        if (absPow.isOne()) return f.polynom.tex
        const tmp = f.clone()
        tmp.power = absPow
        return tmp.tex
    }

    /**
     * LaTeX output using tkz-tab. Wrap in a `tikzpicture` environment.
     *
     * Options:
     * - {@link withFactors} — add a sign row per factor (only for PolyFactor input)
     * - {@link withLabel} — change the label of the product row (default: `f(x)`)
     * - {@link withTkzTabOptions} — override `lgt` and `espcl` (default: 2, 1.2)
     */
    get tex(): string {
        const bounds = [
            `\\footnotesize \\(-\\infty\\)`,
            ...this.#roots.map(r => `\\(${r.tex}\\)`),
            `\\footnotesize \\(+\\infty\\)`,
        ].join(', ')

        const showFactors = this.#withFactors && this.#factorRows.length > 0

        const lineLabels = [
            '/1',
            ...(showFactors
                ? this.#factorRows.map(fr => `\\(${TableOfSigns.#factorLabel(fr.factor)}\\)/1`)
                : []),
            '/.1',
            `\\(${this.#label}\\)/1`,
        ]

        const signLines = [
            ...(showFactors
                ? this.#factorRows.map(fr => `\\tkzTabLine{,${fr.signs.join(',')}}`)
                : []),
            `\\tkzTabLine{}`,
            `\\tkzTabLine{,${this.#signs.join(',')}}`,
        ]

        return [
            `\\begin{tikzpicture}`,
            `  \\tkzTabInit[lgt=${this.#tkzLgt},espcl=${this.#tkzEspcl}]`,
            `  {${lineLabels.join(',')}}`,
            `  {${bounds}}`,
            ...signLines.map(l => `  ${l}`),
            `\\end{tikzpicture}`,
        ].join('\n')
    }

    /** @throws {NotImplementedError} Always; ASCII display is not yet implemented. */
    get display(): string {
        throw new NotImplementedError('TableOfSigns.display is not yet implemented')
    }

    clone(): TableOfSigns {
        const tos = new TableOfSigns()
        tos.#roots = this.#roots.map(r => r.clone())
        tos.#signs = [...this.#signs]
        tos.#factorRows = this.#factorRows.map(fr => ({
            factor: new Factor(fr.factor),
            roots: fr.roots.map(r => r.clone()),
            signs: [...fr.signs],
        }))
        tos.#withFactors = this.#withFactors
        tos.#label = this.#label
        tos.#tkzLgt = this.#tkzLgt
        tos.#tkzEspcl = this.#tkzEspcl
        return tos
    }

    copy(value: TableOfSigns): this {
        this.#roots = value.#roots.map(r => r.clone())
        this.#signs = [...value.#signs]
        this.#factorRows = value.#factorRows.map(fr => ({
            factor: new Factor(fr.factor),
            roots: fr.roots.map(r => r.clone()),
            signs: [...fr.signs],
        }))
        return this
    }

    // -------------------------------------------------------------------------
    // Display modifiers (chainable)
    // -------------------------------------------------------------------------

    /** Show individual factor sign rows in the tkz-tab output (only for PolyFactor). */
    get withFactors(): this {
        this.#withFactors = true
        return this
    }

    /** Override the label of the product row (default: `f(x)`). */
    withLabel(label: string): this {
        this.#label = label
        return this
    }

    /**
     * Override tkz-tab layout options.
     * @param lgt  Width of the label column (default: 2).
     * @param espcl Column spacing (default: 1.2).
     */
    withTkzTabOptions(lgt: number, espcl: number): this {
        this.#tkzLgt = lgt
        this.#tkzEspcl = espcl
        return this
    }

    // -------------------------------------------------------------------------
    // Domain builders
    // -------------------------------------------------------------------------

    #buildDomain(
        intervalPred: (s: TableOfSignsValues) => boolean,
        rootPred: (s: TableOfSignsValues) => boolean,
    ): Domain {
        const n = this.#roots.length
        const intervals: Interval[] = []

        for (let k = 0; k <= n; k++) {
            if (intervalPred(this.#signs[2 * k])) {
                const left = k === 0 ? null : this.#roots[k - 1]
                const right = k === n ? null : this.#roots[k]
                intervals.push(Interval.fromBounds(left, right, true, true))
            }
        }

        for (let k = 0; k < n; k++) {
            if (rootPred(this.#signs[2 * k + 1])) {
                intervals.push(Interval.point(this.#roots[k]))
            }
        }

        return Domain.fromIntervals(intervals)
    }

    /** Intervals where f(x) > 0 (open boundaries at zeros). */
    positive(): Domain {
        return this.#buildDomain(s => s === '+', () => false)
    }

    /** Intervals where f(x) ≥ 0 (closed at zeros). */
    nonNegative(): Domain {
        return this.#buildDomain(s => s === '+' || s === 'z', s => s === 'z')
    }

    /** Intervals where f(x) < 0. */
    negative(): Domain {
        return this.#buildDomain(s => s === '-', () => false)
    }

    /** Intervals where f(x) ≤ 0. */
    nonPositive(): Domain {
        return this.#buildDomain(s => s === '-' || s === 'z', s => s === 'z')
    }

    /**
     * Definition domain: excludes poles (`'d'`), holes (`'h'`), and unresolved
     * slots (`''`). Includes zeros (`'z'`) and sign-changing roots at both
     * interval and root positions — so the zero polynomial, whose sole interval
     * slot carries `'z'`, correctly yields ℝ.
     */
    domain(): Domain {
        return this.#buildDomain(
            s => s !== 'h' && s !== 'd' && s !== '',
            s => s !== 'd' && s !== 'h',
        )
    }

    // -------------------------------------------------------------------------
    // Point collections
    // -------------------------------------------------------------------------

    /** Roots where f(x) = 0. */
    zeros(): Solution[] {
        return this.#roots
            .filter((_, k) => this.#signs[2 * k + 1] === 'z')
            .map(r => r.clone())
    }

    /** Points where f is undefined (vertical asymptotes). */
    poles(): Solution[] {
        return this.#roots
            .filter((_, k) => this.#signs[2 * k + 1] === 'd')
            .map(r => r.clone())
    }

    // -------------------------------------------------------------------------
    // Raw access
    // -------------------------------------------------------------------------

    /** Sorted roots (zeros, poles, holes). */
    get roots(): Solution[] {
        return this.#roots.map(r => r.clone())
    }

    /** Sign array of length 2n+1 (even = interval sign, odd = sign at root). */
    get signs(): TableOfSignsValues[] {
        return [...this.#signs]
    }

    /**
     * Per-factor sign rows (only populated when built from a PolyFactor).
     * Sign arrays are aligned to the global root list: a `'t'` value at an
     * odd (root) position means the factor has no root there — that global
     * root belongs to another factor.
     */
    get factors(): { factor: Factor, roots: Solution[], signs: TableOfSignsValues[] }[] {
        return this.#factorRows.map(fr => ({
            factor: fr.factor,
            roots: fr.roots.map(r => r.clone()),
            signs: [...fr.signs],
        }))
    }
}
