import type {IAlgebra, IEquation, InputValue, IPiMathObject, ISolution, literalType} from "../pimath.interface"
import {Fraction} from "../coefficients/fraction"
import {Equation} from "./equation"
import {Monom} from "./monom"
import {Polynom} from "./polynom"

export class LinearSystem implements IPiMathObject<LinearSystem>,
    IEquation<LinearSystem>,
    IAlgebra<LinearSystem> {

    #equations: Equation[]

    // Determine the letters in the linear system, usually ['x', 'y']
    #variables: string[]

    constructor(...values: (string | Equation)[]) {
        this.#equations = []
        this.#variables = []

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    public parse = (...equations: (string | Equation)[]): this => {
        // make the original equations
        this.#equations = equations.map(value => new Equation(value))

        // get the letters.
        this.#findLetters()
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

    get display() {
        // TODO : LinearSystem - display: implement the display of the linear system
        return this.tex + 'as display'
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
        return this.#variables.includes(letter)
    }

    public isEqual(value: LinearSystem): boolean {
        return this.equations.every((equ, index) => equ.isEqual(value.equations[index]))
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
        //TODO: use Matrix class
        return this.#makeMatrix()
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

    public multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this {
        // Multiply the system by a number
        // the value can be an array of numbers
        // the value can be a number and the index of the equation to multiply
        if (Array.isArray(value)) {
            if (value.length !== this.#equations.length) {
                throw new Error("The number of values must be the same as the number of equations")
            }

            for (let i = 0; i < value.length; i++) {
                this.#equations[i].multiply(value[i])
            }
            return this
        }

        if (index === undefined || index < 0 || index >= this.#equations.length) {
            throw new Error("Index out of range")
        }

        this.#equations[index].multiply(value)

        return this
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

    solve(): ISolution[] {
        return []
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

    public get variables(): string[] {
        return this.#variables
    }

    public set variables(value: string | string[]) {
        const vars = (typeof value === "string") ? value.split('') : [...value]
        vars.sort()
        this.#variables = vars
    }

    #findLetters = (): this => {
        this.#variables = this.#equations.reduce((acc: string[], equ) => {
            return [...new Set([...acc, ...equ.variables])]
        }, [])
        //
        // // Find all letters used.
        // let variables = new Set<string>()
        //
        // for (const equ of this.#equations) {
        //     variables = new Set([...variables, ...equ.variables])
        // }
        //
        // this.#variables = [...variables]
        this.#variables.sort()
        return this
    }

    #makeMatrix = (): [Fraction[][], Fraction[]] => {
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

}
