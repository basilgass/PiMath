import type {IAlgebra, IDisplayDigits, IEquation, InputValue, IPiMathObject, OutputStyle} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Equation} from "./equation"
import {Matrix} from "./matrix"
import {Polynom} from "./polynom"
import {Numeric} from "../numeric"
import {Solution} from "../analyze"
import {Vector} from "../geometry/vector"
import {assertDigits} from "../helpers"
import {DimensionError, IndexError, NotImplementedError} from "../errors"

export class LinearSystem implements IPiMathObject<LinearSystem>, IDisplayDigits,
    IEquation<LinearSystem>,
    IAlgebra {

    #equations: Equation[]
    #digits: number | null = null

    // Determine the variables in the linear asSystem, usually ['x', 'y']
    #variables: string[]

    constructor(...values: (string | Equation)[]) {
        this.#equations = []
        this.#variables = []

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    parse(...inputs: (string | Equation)[]): this {
        return this.fromEquations(...inputs.map(v => new Equation(v)))
    }

    fromEquations(...equations: Equation[]): this {
        const vars = [...new Set(equations.flatMap(e => e.variables))].sort()
        const matrix = equations.map(equ => {
            const cloned = equ.clone().reorder()
            const row = vars.map(v => cloned.left.monomByVariable(v).coefficient)
            const constant = cloned.right.monoms[0].coefficient
            return [...row, constant]
        })
        return this.fromComponents(matrix, vars.join(''))
    }

    fromComponents(matrix: InputValue<Fraction>[][], variables = 'xyz'): this {
        if (matrix.length === 0) {
            throw new DimensionError("Matrix must have at least one row")
        }
        const cols = matrix[0].length
        if (matrix.some(row => row.length !== cols)) {
            throw new DimensionError("All rows must have the same number of columns")
        }

        const vars = variables.split('').slice(0, cols - 1)
        this.#equations = matrix.map(row => {
            const P = new Polynom(vars.join(''), ...(row.slice(0, -1)))
            return new Equation(P, row[row.length - 1])
        })
        this.#findLetters()
        return this
    }

    fromMatrix(value: Matrix, variables = 'xyz'): this {
        return this.fromComponents(value.rows, variables)
    }

    fromVectors(...vectors: Vector[]): this {
        return this.fromMatrix(Matrix.fromVectors(...vectors))
    }

    copy(): this {
        throw new NotImplementedError("copy() is not yet implemented for LinearSystem")
    }

    clone(): LinearSystem {
        // direct copy: parsing the equations again would rebuild them and drop their display state
        const LS = new LinearSystem()
        LS.#equations = this.#equations.map(equ => equ.clone())
        LS.#variables = [...this.#variables]
        LS.#digits = this.#digits
        return LS
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        // kept on the system too: reordering for the output rebuilds the equations
        this.#digits = assertDigits(digits)
        this.#equations.forEach(e => e.withDigits(digits))
        return this
    }

    get tex(): string {
        // Build the array of values.
        // Reorder
        // This clone the asSystem :!!!
        //TODO: Avoid cloning this linear asSystem
        const LS = this.clone().reorder().withDigits(this.#digits)

        return this.buildTex(LS.equations)
    }

    get display(): string {
        const LS = this.clone().reorder().withDigits(this.#digits)
        return this.#toOutput(LS.equations, 'display')
    }

    static solutionAsDisplay(value: Solution[]): string {
        return `(${value.map(x=>x.display).join(";")})`
    }
    static solutionAsTex(value: Solution[]): string {
        return `\\left( ${value.map(x=>x.tex).join(" ; ")} \\right)`
    }
    add(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this {
        if (value instanceof LinearSystem) {
            const length = value.equations.length
            if (length !== this.#equations.length) {
                throw new DimensionError("The number of equations must be the same")
            }

            for (let i = 0; i < length; i++) {
                this.#equations[i].add(value.equations[i])
            }
        } else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new IndexError("Index out of range")
            }
            const equ = new Equation(value)
            this.#equations[index].add(equ)
        }

        return this
    }

    /**
     * Builds the LaTeX `\left\{...\right.` representation from an explicit equation list.
     *
     * Called by `tex` with the reordered clone. Pass `equations` directly when
     * generating a step-by-step derivation on a non-standard equation list.
     *
     * @param equations - Equations to render (typically from a cloned/reordered system).
     * @param operators - Per-equation multiplier annotations. `operators[i]` lists
     *   the multipliers shown as `\cdot k` next to equation i; each adds a `|l`
     *   column. Negative values are wrapped in `\left(...\right)`.
     */
    buildTex(equations: Equation[], operators?: (string[])[]): string {
        return this.#toOutput(equations, 'tex', operators)
    }

    degree(variable?: string): Fraction {
        return Fraction.max(...this.#equations.map(equ => equ.degree(variable)))
    }

    // ------------------------------------------
    get equations(): Equation[] {
        return this.#equations.map(e => e.clone())
    }

    set equations(value) {
        this.#equations = value

        // update the variables.
        this.#findLetters()
    }

    evaluate(): number | Fraction {
        throw new NotImplementedError("Method not implemented.")
    }

    hasVariable(variable: string): boolean {
        return this.#variables.includes(variable)
    }

    isEqual(value: LinearSystem): boolean {
        return this.equations.every((equ, index) => equ.isEqual(value.equations[index]))
    }

    isSolvable(): boolean {
        const aug = this.toAugmentedMatrix()
        return aug.isConsistent() && aug.rank() === this.#variables.length
    }

    get matrix(): [Matrix, Vector] {
        const [coeffs, vector] = this.#makeMatrix()
        return [Matrix.fromValues(coeffs), new Vector(...vector)]
    }

    /**
     * Builds the augmented matrix `[A|b]` for this system and marks the
     * partition at the variable count, enabling `isConsistent()` and
     * `reducedRowEchelonForm()` to interpret the coefficient vs. constant parts.
     */
    toAugmentedMatrix(): Matrix {
        const [coeffs, vector] = this.#makeMatrix()
        return Matrix.fromValues(coeffs.map((row, i) => [...row, vector[i]]))
            .withPartition(this.#variables.length)
    }

    mergeEquations(equation1: { id: number, factor: InputValue<Fraction> }, equation2: {
        id: number,
        factor: number
    }): Equation {
        // Set and clone the equations.
        const eq1multiplied = this.equations[equation1.id].clone().multiply(equation1.factor)
        const eq2multiplied = this.equations[equation2.id].clone().multiply(equation2.factor)

        // Add both equations together.
        return eq1multiplied.add(eq2multiplied)
    }

    multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this {
        // Multiply the asSystem by a number
        // the value can be an array of numbers
        // the value can be a number and the index of the equation to multiply
        if (Array.isArray(value)) {
            if (value.length !== this.#equations.length) {
                throw new DimensionError("The number of values must be the same as the number of equations")
            }

            for (let i = 0; i < value.length; i++) {
                this.#equations[i].multiply(value[i])
            }
            return this
        }

        if (index === undefined || index < 0 || index >= this.#equations.length) {
            throw new IndexError("Index out of range")
        }

        this.#equations[index].multiply(value)

        return this
    }

    reduce(): this {
        this.#equations.forEach(equ => equ.reduce())
        return this
    }

    // ------------------------------------------
    reorder(): this {
        for (const E of this.#equations) {
            E.reorder()
        }

        return this
    }

    /**
     * Solves the system by Gauss-Jordan elimination on the augmented matrix.
     *
     * - Unique solution: one `Solution` per variable, in `variables` order.
     * - No solution: returns `[]`.
     * - Infinite solutions: one `Solution` per variable with `.value === Infinity`.
     */
    solve(): Solution[] {
        const aug = this.toAugmentedMatrix()
        if (!aug.isConsistent()) return []
        if (aug.rank() < this.#variables.length) return this.#mapMatrixSolutions()
        const rref = aug.reducedRowEchelonForm()
        return this.#mapMatrixSolutions(rref.rows.slice(0, this.#variables.length))
    }

    /**
     * For each pair of equations (i, j), computes LCM-based multipliers that eliminate
     * `variable` by linear combination. The factors satisfy `f_i·coeff_i + f_j·coeff_j = 0`.
     *
     * Pairs are sorted by `|f_i| + |f_j|` (smallest multipliers first).
     * Requires that all variable terms are on the left side of each equation.
     */
    solve_compute_factors(variable: string):
        [{ id: number, factor: number }, { id: number, factor: number }][] {
        // when solving, every monoms with a variable is on the left !
        // and every coefficient are relative numbers.
        const result: [{ id: number, factor: number }, { id: number, factor: number }][] = []
        const coefficients = this.equations.map(equ => equ.left.monomByVariable(variable).coefficient.value)

        // search for a factor
        coefficients.forEach((reference, index) => {
            for (let i = index + 1; i < coefficients.length; i++) {
                const lcm = Numeric.lcm(reference, coefficients[i])

                const sign = reference < 0 ? -1 : 1
                result.push([
                    {
                        id: index, factor: sign * lcm / reference
                    }, {
                        id: i, factor: -sign * lcm / coefficients[i]
                    }])
            }
        })

        // Sort the value: prefer the smallest absolute values (1/-1, 2/-2, ...)
        return result.sort((a, b) => {
            return (Math.abs(a[0].factor) + Math.abs(a[1].factor)) - (Math.abs(b[0].factor) + Math.abs(b[1].factor))
        })
    }

    subtract(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this {
        if (value instanceof LinearSystem) {
            const length = value.equations.length
            if (length !== this.#equations.length) {
                throw new DimensionError("The number of equations must be the same")
            }

            for (let i = 0; i < length; i++) {
                this.#equations[i].subtract(value.equations[i])
            }
        } else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new IndexError("Index out of range")
            }
            const equ = new Equation(value)
            this.#equations[index].subtract(equ)
        }

        return this
    }

    get variables(): string[] {
        return this.#variables
    }

    set variables(value: string | string[]) {
        const vars = (typeof value === "string") ? value.split('') : [...value]
        vars.sort()
        this.#variables = vars
    }

    #findLetters(): this {
        this.#variables = this.#equations.reduce((acc: string[], equ) => {
            return [...new Set([...acc, ...equ.variables])]
        }, [])

        this.#variables.sort()
        return this
    }

    #makeMatrix(): [Fraction[][], Fraction[]] {
        // Make the matrix
        const matrix: Fraction[][] = []
        const vector: Fraction[] = []

        for (const E of this.#equations) {
            const row: Fraction[] = []

            const equ = E.clone().reorder()
            for (const L of this.variables) {
                const m = equ.left.monomByVariable(L)
                row.push(m.coefficient)
            }

            // Add the "no variable part"
            vector.push(equ.right.monoms[0].coefficient)

            // Add to the matrix
            matrix.push(row)
        }

        return [matrix, vector]
    }

    #mapMatrixSolutions(matrix?: Fraction[][]): Solution[] {
        const result: Solution[] = []

        if(!matrix){
            // infinite solutions
            this.variables.forEach(variable=>{
                const sol = Solution.fromFraction(Infinity)
                sol.variable = variable
                result.push(sol)
            })

            return result
        }

        matrix.forEach((x, index) => {

            const sol = Solution.fromFraction(x[x.length - 1])
            sol.variable = this.variables[index]

            result.push(sol)
        })

        return result
    }

    #toOutput(equations: Equation[], style: OutputStyle, operators?: (string[])[]): string {
        let variables: string[] = []
        for (const equ of equations) {
            variables = variables.concat(equ.variables)
        }
        variables = [...new Set(variables)].sort()

        const rows: string[] = []
        for (let i = 0; i < equations.length; i++) {
            const equ = equations[i]
            const cols: string[] = []

            for (const L of variables) {
                const m = equ.left.monomByVariable(L)
                if (cols.length === 0) {
                    cols.push(m.isZero() ? '' : (style === 'tex' ? m.tex : m.display))
                } else {
                    const sign = m.coefficient.sign() === 1 ? '+' : ''
                    cols.push(m.isZero() ? '' : sign + (style === 'tex' ? m.tex : m.display))
                }
            }

            cols.push('=')
            cols.push(style === 'tex' ? equ.right.tex : equ.right.display)

            if (style === 'tex' && operators?.[i] !== undefined) {
                cols[cols.length - 1] = cols[cols.length - 1] + ' \\phantom{\\quad}'
                for (const o of operators[i]) {
                    cols.push(`\\ \\cdot\\ ${o.startsWith('-') ? "\\left(" + o + "\\right)" : o}`)
                }
            }

            rows.push(style === 'tex' ? cols.join('&') : `(${cols.join(',')})`)
        }

        if (style === 'tex') {
            const operatorsColumns = operators?.[0]?.length ?? 0
            return `\\left\\{\\begin{array}{${"r".repeat(variables.length)}cl ${"|l".repeat(operatorsColumns)}}${rows.join('\\\\ ')}\\end{array}\\right.`
        }

        return `{${rows.join(',')}:}`
    }

}
