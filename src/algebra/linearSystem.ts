import type {IAlgebra, IEquation, InputValue, IPiMathObject, literalType} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Equation} from "./equation"
import {Monom} from "./monom"
import {Polynom} from "./polynom"
import {Numeric} from "../numeric"
import type {Solution} from "../analyze/solution"

export class LinearSystem implements IPiMathObject<LinearSystem>,
    IEquation<LinearSystem>,
    IAlgebra<LinearSystem> {

    #equations: Equation[]
    // Solve steps for TeX output.
    #steps: string[] = []
    // Determine the letters in the linear asSystem, usually ['x', 'y']
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

    public get tex(): string {
        // Build the array of values.
        // Reorder
        // This clone the asSystem :!!!
        //TODO: Avoid cloning this linear asSystem
        const LS = this.clone().reorder()

        return this.buildTex(LS.equations)
    }

    get display() {
        // TODO : LinearSystem - display: implement the display of the linear asSystem
        return this.tex + 'as display'
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

        // Get the letters from the linear asSystem
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

    public degree(letter?: string): Fraction {
        return Fraction.max(...this.#equations.map(equ => equ.degree(letter)))
    }

    // ------------------------------------------
    public get equations(): Equation[] {
        return this.#equations
    }

    public set equations(value) {
        this.#equations = value

        // update the variables.
        this.#findLetters()
    }

    public evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction {
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

    public mergeEquations(equation1: { id: number, factor: InputValue<Fraction> }, equation2: {
        id: number,
        factor: number
    }): Equation {
        // Set and clone the equations.
        const eq1multiplied = this.equations[equation1.id].clone().multiply(equation1.factor)
        const eq2multiplied = this.equations[equation2.id].clone().multiply(equation2.factor)

        // Add both equations together.
        return eq1multiplied.add(eq2multiplied)
    }

    public multiply(value: InputValue<Fraction> | InputValue<Fraction>[], index?: number): this {
        // Multiply the asSystem by a number
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

    public reduce(): this {
        // reduce all equations at once.
        this.equations.forEach(equ=>equ.reduce())
        return this
    }

    // ------------------------------------------
    public reorder = (): this => {
        for (const E of this.#equations) {
            E.reorder()
        }

        return this
    }

    solve(): Solution[] {
        // TODO : à retravailler, car ce n'est ni l'endroit, ni l'intérêt de l'avoir ici.
        // 1. search in the equations if a variable has two same or opposite value = candidate for merging
        // 2. if 1 is false, search for a variable that has coefficient one
        // 3. if 2 is false, search for a variable that has a coefficient multiple of another.
        // 4. if 3 is false, multiply both lines.
        // => merge the equations and cycle.
        const output: string[] = [this.tex]

        const LS = this.clone()

        while (LS.variables.length>1){
            const letter = LS.variables[LS.variables.length-1]
            const emptyLS = new LinearSystem()
            const factors = LS.solve_compute_factors(letter).slice(0, LS.variables.length-1)
            factors.forEach(factor=> {
                emptyLS.equations.push(LS.mergeEquations(...factor))
            })

            LS.equations = emptyLS.equations

            output.push(LS.tex)

            // add the same but with a reduced value.
            LS.reduce()
            output.push(LS.tex)
        }

        console.log('\\begin{aligned}' + output.join('\\\\[2em]') + '\\end{aligned}')

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
            let pivot = augmentedMatrix[i][i].clone()
            if (pivot.isZero()) {
                // throw new Error('Divide by zero !')
                // Search a line below that would add it.
                const row_to_add = augmentedMatrix
                    .find((row, index) => {
                        return index > i && !row[i].isZero()
                    })

                if (row_to_add) {
                    augmentedMatrix[i].forEach((value, index) => value.add(row_to_add[index]))
                    pivot = augmentedMatrix[i][i].clone()
                } else {
                    throw new Error('Unsolvable...')
                }


            }

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

                // Check if the asSystem is undetermined (no solution or infinite solutions)
                // the j line must not be all zeros
                // the last element must be zero => the asSystem is undetermined
                // the last element must not be zero => the asSystem is impossible
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

    solve_compute_factors(letter: string):
        [{ id: number, factor: number }, { id: number, factor: number }][] {
        // when solving, every monoms with a variable is on the left !
        // and every coefficient are relative numbers.
        const result: [{ id: number, factor: number }, { id: number, factor: number }][] = []
        const coefficients = this.equations.map(equ => equ.left.monomByLetter(letter).coefficient.value)

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
