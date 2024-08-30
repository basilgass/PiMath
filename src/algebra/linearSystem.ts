import type { IAlgebra, IEquation, InputValue, IPiMathObject, ISolution, literalType } from "../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { Equation } from "./equation"
import { Monom } from "./monom"
import { Polynom } from "./polynom"

/**
 * Linear system of equations
 * @class LinearSystem
 */
export class LinearSystem implements
    IPiMathObject<LinearSystem>,
    IEquation<LinearSystem>,
    IAlgebra<LinearSystem> {

    #equations: Equation[]

    // Determine the letters in the linear system, usually ['x', 'y']
    private _variables: string[]

    constructor(...equations: Equation[])
    constructor(...equationStrings: string[])
    constructor(...values: (string | Equation)[]) {
        this.#equations = []
        this._variables = 'xyz'.split('')

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    public parse = (...equations: (string | Equation)[]): this => {
        // make the original equations
        this.#equations = equations.map(value => new Equation(value))

        // get the letters.
        this._findLetters()
        return this
    }

    public clone = (): LinearSystem => {
        return new LinearSystem()
            .parse(...this.#equations.map(equ => equ.clone()))
    }

    public static fromMatrix(
        matrix: InputValue<Fraction>[][],
        letters = 'xyz'): LinearSystem {
        // Check that each row has the same number of columns
        const cols = matrix[0].length
        if (matrix.some(row => row.length !== cols)) {
            throw new Error("All rows must have the same number of columns")
        }

        // Determine the default letters. The number of letters are cols-1
        const vars = letters.split('')
            .splice(0, cols - 1)

        // Create a new LinearSystem
        return new LinearSystem(
            ...matrix.map(row => {
                const P = new Polynom(vars.join(''), ...row)
                return new Equation(P, 0)
            })
        )

    }

    public add(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this {
        if (value instanceof LinearSystem) {
            const length = value.equations.length
            if (length !== this.#equations.length) {
                throw new Error("The number of equations must be the same")
            }

            for (let i = 0; i < length; i++) {
                this.#equations[i].add(value.equations[i])
            }
        } else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new Error("Index out of range")
            }
            const equ = new Equation(value)
            this.#equations[index].add(equ)
        }

        return this
    }

    public buildTex = (equations: Equation[], operators?: (string[])[]): string => {
        let equStr: string[]
        let m: Monom
        let letters: string[] = []
        const equArray: string[] = []

        // Get the letters from the linear system
        for (const equ of equations) {
            letters = letters.concat(equ.letters())
        }

        letters = [...new Set(letters)]
        letters.sort()

        for (let i = 0; i < equations.length; i++) {
            const equ = equations[i]

            equStr = []
            for (const L of letters) {
                m = equ.left.monomByLetter(L)

                if (equStr.length === 0) {
                    equStr.push(m.isZero() ? '' : m.tex)
                } else {
                    equStr.push(m.isZero() ? '' : ((m.coefficient.sign() === 1) ? '+' : '') + m.tex)
                }
            }

            // Add the equal sign
            equStr.push('=')

            // Add the right hand part of the equation (should be only a number, because it has been reordered)
            equStr.push(equ.right.tex)

            // Add the operations if existing
            if (operators?.[i] !== undefined) {
                // add extra space at the end of the equation
                equStr[equStr.length - 1] = equStr[equStr.length - 1] + ' \\phantom{\\quad}'
                for (const o of operators[i]) {
                    equStr.push(`\\ \\cdot\\ ${o.startsWith('-') ? "\\left(" + o + "\\right)" : o}`)
                }
            }

            // Add to the list.
            equArray.push(equStr.join('&'))
        }

        let operatorsColumns = 0
        if (operators !== undefined && operators.length > 0) {
            operatorsColumns = operators[0].length
        }

        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl ${"|l".repeat(operatorsColumns)}}${equArray.join('\\\\ ')}\\end{array}\\right.`
    }

    public degree(letter?: string | undefined): Fraction {
        return Fraction.max(...this.#equations.map(equ => equ.degree(letter)))
    }

    // ------------------------------------------
    public get equations(): Equation[] {
        return this.#equations
    }

    public set equations(value) {
        this.#equations = value
    }

    public evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean | undefined): number | Fraction {
        throw new Error("Method not implemented.")
    }

    public hasVariable(letter: string): boolean {
        return this._variables.includes(letter)
    }

    public isEqual(value: InputValue<LinearSystem>): boolean {
        throw new Error("Method not implemented.")
    }

    public get isSolvable(): boolean {
        const V = this.variables

        // TODO: in some case, it is possible to resolve systems if there isn't the isSame number of vars and equations
        if (V.length !== this.#equations.length) {
            return false
        }

        //TODO: Must check if two equations isn't a linear combination of the others ?

        return true
    }

    public get matrix(): [Fraction[][], Fraction[]] {
        return this._makeMatrix()
    }

    public mergeEquations = (eq1: Equation, eq2: Equation, factor1: Fraction, factor2: Fraction): Equation => {
        // Set and clone the equations.

        const eq1multiplied = eq1.clone().multiply(new Fraction(factor1)),
            eq2multiplied = eq2.clone().multiply(new Fraction(factor2))

        // Add both equations together.
        eq1multiplied.left.add(eq2multiplied.left)
        eq1multiplied.right.add(eq2multiplied.right)

        return eq1multiplied
    }

    public multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): LinearSystem {
        // MUltiply the system by a number
        // the value can be an array of numbers
        // the value can be a number and the index of the equation to multiply
        throw new Error("Method not implemented.")
    }

    public reduce(): LinearSystem {
        throw new Error("Method not implemented.")
    }

    // ------------------------------------------
    public reorder = (): this => {
        for (const E of this.#equations) {
            E.reorder()
        }

        return this
    }

    // #endregion Properties and methods (24)

    // #region Getters And Setters (8)

    public solve = (withResolution?: boolean): this => {
        // Solve it by linear
        this._solutions = {}
        this._resolutionSteps = {}

        // Reorder all equations.
        this.reorder()

        if (withResolution === undefined) {
            withResolution = false
        }

        for (const letter of this.variables) {
            this._solutions[letter] = this._solveOneLetter(letter, withResolution)
        }

        // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
        return this
    }

    public solveMatrix = (): Fraction[] => {
        const [matrix, vector] = this.matrix
        // Solve the matrix

        // Make the augmented matrix (matrix + vector)
        const augmentedMatrix: Fraction[][] = matrix.map((row, index) => [...row, vector[index]])

        // Reduce the matrix
        for (let i = 0; i < matrix.length; i++) {
            // Find the pivot (the first non-zero element in the row)
            const pivot = augmentedMatrix[i][i].clone()

            // Normalize the row: divide all elements by the pivot
            // the pivot is now 1
            augmentedMatrix[i] = augmentedMatrix[i].map(x => x.divide(pivot))

            // reduce the other rows using the pivot.
            for (let j = 0; j < matrix.length; j++) {
                if (j === i) {
                    continue
                }

                const factor = augmentedMatrix[j][i].clone().opposite()
                for (let k = 0; k < augmentedMatrix[j].length; k++) {
                    augmentedMatrix[j][k].add(augmentedMatrix[i][k].clone().multiply(factor))
                }

                // Check if the system is undetermined (no solution or infinite solutions)
                // the j line must not be all zeros
                // the last element must be zero => the system is undetermined
                // the last element must not be zero => the system is impossible
                if (augmentedMatrix[j].slice(0, augmentedMatrix[j].length - 1).every(x => x.isZero())) {
                    if (augmentedMatrix[j][augmentedMatrix[j].length - 1].isZero()) {
                        return [new Fraction().infinite()]
                    } else {
                        return []
                    }
                }
            }
        }

        return augmentedMatrix.map(x => x[x.length - 1])
    }

    public stepTex = (letter: string): string => {
        const steps = this._resolutionSteps[letter]

        if (steps === undefined) {
            return ''
        }

        // steps = { equations[], operations: [[],[]]
        const tex: string[] = []
        for (let i = 0; i < steps.length; i++) {
            tex.push(this.buildTex(steps[i].equations, steps[i].operations))
        }

        return `\\begin{aligned}&${tex.join('\\\\&')}\\end{aligned}`
    }

    public subtract(value: InputValue<LinearSystem | Equation | Polynom>, index?: number): this {
        if (value instanceof LinearSystem) {
            const length = value.equations.length
            if (length !== this.#equations.length) {
                throw new Error("The number of equations must be the same")
            }

            for (let i = 0; i < length; i++) {
                this.#equations[i].subtract(value.equations[i])
            }
        } else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new Error("Index out of range")
            }
            const equ = new Equation(value)
            this.#equations[index].subtract(equ)
        }

        return this
    }

    public get tex(): string {
        // Build the array of values.
        // Reorder
        // This clone the system :!!!
        //TODO: Avoid cloning this linear system
        const LS = this.clone().reorder()

        return this.buildTex(LS.equations)
    }

    get display() {
        // TODO : LinearSystem - display: implement the display of the linear system
        return this.tex + 'as display'
    }
    public get variables(): string[] {
        return this._variables
    }

    public set variables(value: string | string[]) {
        const vars = (typeof value === "string") ? value.split('') : [...value]
        vars.sort()
        this._variables = vars
    }

    // #endregion Getters And Setters (8)

    // #region Private methods (4)

    private _findLetters = (): this => {
        // Find all letters used.
        let variables = new Set<string>()

        for (const equ of this.#equations) {
            variables = new Set([...variables, ...equ.variables])
        }

        this._variables = [...variables]
        this._variables.sort()
        return this
    }

    private _linearReduction(eq1: Equation, eq2: Equation, letter: string): { merged: Equation, factors: Fraction[] } {
        // Get the monom for the particular letter.
        const c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(),
            c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposite()

        // Reduce c1 and c2 by the gcd
        const gcdN = Numeric.gcd(c1.numerator, c2.numerator),
            gcdD = Numeric.gcd(c1.denominator, c2.denominator)
        c1.divide(gcdN).multiply(gcdD)
        c2.divide(gcdN).multiply(gcdD)

        // if one value is -1, use 1 and make the other one opposite
        if (c2.isNegativeOne()) {
            c1.opposite()
            c2.opposite()
        } else if (c1.isNegativeOne()) {
            c1.opposite()
            c2.opposite()
        }

        return {
            merged: this.mergeEquations(eq1, eq2, c2, c1),
            factors: [c2, c1]
        }
    }

    private _makeMatrix = (): [Fraction[][], Fraction[]] => {
        // Make the matrix
        const matrix: Fraction[][] = []
        const vector: Fraction[] = []

        for (const E of this.#equations) {
            const row: Fraction[] = []

            const equ = E.clone().reorder()
            for (const L of this.variables) {
                const m = equ.left.monomByLetter(L)
                row.push(m.coefficient)
            }

            // Add the "no letter part"
            vector.push(equ.right.monoms[0].coefficient)

            // Add to the matrix
            matrix.push(row)
        }

        return [matrix, vector]
    }

    /**
     * Linear reduction of the equations to have only one letter
     * @param letter    letter to isolate
     * @private
     */
    private _solveOneLetter(letter: string, withResolution: boolean): ISolution {
        // list of equations.
        let LE: Equation[] = this.clone().equations,
            reducedEquations: Equation[] = [],
            lastIndex

        this._resolutionSteps[letter] = []

        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for (const L of this.variables) {
            // Reset the stack
            reducedEquations = []

            // remove the setLetter from all equations using linear combinations
            if (L === letter) {
                continue
            }

            if (withResolution) {
                this._resolutionSteps[letter].push({
                    equations: LE.map(x => x.clone()),
                    operations: [...new Array(LE.length)].map(x => [...new Array(LE.length - 1)].map(x => ""))
                })
                lastIndex = this._resolutionSteps[letter].length - 1
            }

            // Linear reduction.
            for (let i = 0; i < LE.length - 1; i++) {
                const result = this._linearReduction(LE[i], LE[i + 1], L)
                reducedEquations.push(result.merged)

                if (withResolution) {
                    this._resolutionSteps[letter][lastIndex].operations[i][i] = result.factors[0].tex
                    this._resolutionSteps[letter][lastIndex].operations[i + 1][i] = result.factors[1].tex
                }
            }

            LE = [...reducedEquations]
        }

        // Solve the equations
        // let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        const E = LE[0]
        E.solve()
        const solution = E.solutions[0]

        if (withResolution) {
            this._resolutionSteps[letter].push({
                equations: [LE[0]],
                operations: [[LE[0].left.monoms[0].coefficient.tex]]
            })

            let P: Polynom
            if (solution.exact instanceof Fraction || typeof solution.exact === "string") {
                P = new Polynom(solution.exact)
            } else {
                P = new Polynom(solution.value)
            }

            this._resolutionSteps[letter].push({
                equations: [new Equation(new Polynom(letter), P)],
                operations: []
            })
        }
        return E.solutions[0]
    }

    // #endregion Private methods (4)
}
