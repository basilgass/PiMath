import type {IExpressionMultiply, InputAlgebra, InputValue, IPiMathObject} from "../pimath.interface"
import {Polynom} from "./polynom"
import type {Vector} from "../geometry"
import {operation_pow} from "./operations"

export type IMatrixValues = InputAlgebra<Polynom>[][]

export class Matrix implements IPiMathObject<Matrix>,
    IExpressionMultiply<Matrix> {
    #matrix_parenthesis = true
    #values: Polynom[][] = []

    constructor(rowCount?: number, colCount?: number) {
        if (rowCount) {
            colCount = colCount ?? rowCount
            this.fromDimensions(rowCount, colCount)
        }

        return this
    }

    public parse(values: IMatrixValues): this {
        return this.fromValues(values)

        return this
    }

    public clone(): Matrix {
        // Copy the matrix.
        const duplicates: IMatrixValues = []

        this.#values.forEach(row => {
            const dup_row: Polynom[] = []
            row.forEach(value => {
                dup_row.push(value.clone())
            })

            duplicates.push(dup_row)
        })

        return new Matrix().fromValues(duplicates)
    }

    get tex(): string {
        if (this.#values.length === 0) {
            return ""
        }

        const wrapper = this.#matrix_parenthesis ? 'pmatrix' : 'bmatrix'


        return [
            `\\begin{${wrapper}}`,
            ...this.rows.map(row => '\t' + row.map(p => p.display).join(' & ') + '\\\\'),
            `\\end{${wrapper}}`
        ].join('\n')
    }

    get display(): string {
        if (this.#values.length === 0) {
            return ""
        }

        const wrapper = this.#matrix_parenthesis ? ['(', ')'] : ['[', ']']

        return wrapper[0] +
            this.map(aij => aij.display)
                .map(row => `(${row.join(',')})`)
                .join(',') +
            wrapper[1]
    }

    public add(value: Matrix): this {
        if (!this.canBeAdded(value)) {
            throw new Error("Cannot add a matrix with different dimensions.")
        }
        this.forEach((aij, i, j) => {
            aij.add(value.values[i][j])
        })

        return this
    }

    public aij(i: number, j: number) {
        if (i < 0 || i > this.dimension.rows || j < 0 || j > this.dimension.cols) {
            return null
        }

        return this.#values[i][j]
    }

    get bmatrix(): this {
        this.#matrix_parenthesis = false
        return this
    }

    public canBeAdded(matrix: Matrix): boolean {
        const {rows, cols} = this.dimension
        const {rows: rows2, cols: cols2} = matrix.dimension

        return rows === rows2 && cols === cols2
    }

    public canBeInverted():boolean {
        if(!this.isSquare()){
            return false
        }

        const determinant = this.determinant()
        if(determinant.isZero()){
            return false
        }

        return true
    }

    public canBeMultiplied(matrix: Matrix): boolean {
        return this.dimension.cols === matrix.dimension.rows
    }

    public characteristic_polynom(letter?: string): Polynom {
        letter ??= 'k'

        return this.clone().subtract(
            new Matrix(this.dimension.rows).one().multiply(new Polynom(letter))
        ).determinant()
    }

    public cofactor(row: number, column: number): Polynom {
        // Remove a line.
        const coMatrix = this.clone()

        coMatrix.values.splice(row, 1)

        // Remove a column
        coMatrix.values.forEach(row => {
            row.splice(column, 1)
        })

        return coMatrix.determinant().multiply((-1) ** (row + column))
    }

    get cols(): Polynom[][] {
        // Return the rows of the transposed matrix !
        const arr = Array.from({length: this.dimension.cols}, () => {
            return Array.from({length: this.dimension.rows}, () => new Polynom())
        })

        this.forEach((aij, i, j) => {
            arr[j][i] = aij
        })

        return arr
    }

    public determinant(): Polynom {
        if (!this.isSquare()) {
            throw new Error('Matrix is not square')
        }

        // Use the first line.
        // For each value, create the cofactor matrix -> get the determinant
        const det = new Polynom()

        // It's a 1x1 matrix
        if (this.#values.length === 1) {
            return this.#values[0][0].clone()
        }

        // It's a matrix greater than 1x1
        this.values[0].forEach((aij, column) => {
            const C = this.cofactor(0, column)
            det.add(aij.clone().multiply(C))
        })

        return det
    }

    get dimension(): { rows: number, cols: number } {
        return {
            rows: this.#values.length,
            cols: this.#values[0].length,
        }
    }

    public flat(): Polynom[] {
        return this.#values.flat()
    }

    public forEach(callback: (aij: Polynom, row: number, column: number) => void): void {
        this.#values.forEach((row, i) => {
            row.forEach((aij, j) => {
                callback(aij, i, j)
            })
        })
    }

    public fromDimensions(rows: number, cols: number): this {
        this.#values = Array.from({length: rows}, () => {
            return Array.from({length: cols}, () => new Polynom())
        }) as unknown as Polynom[][]

        return this
    }

    public fromString(value: string): this {
        // value = ((a,b),(c,d),(e,f))
        if (value.startsWith('((') && value.endsWith("))")) {
            return this.fromString(value.substring(1, value.length - 1))
        }

        // value = (a,b),(c,d),(e,f)
        const arr = value.split('),(')

        this.#values = arr
            .map((row, index) => {
                // (a,b or c,d or e,f)
                if (index === 0) {
                    return row.substring(1).split(',')
                } else if (index === arr.length - 1) {
                    return row.substring(0, row.length - 1).split(',')
                }

                return row.split(',')
            })
            .map(rowItems =>
                rowItems.map(item => new Polynom(item))
            )

        return this
    }

    public fromValues(values: IMatrixValues): this {
        this.#values = []

        // Check dimensions of each rows.
        const L = values[0].length
        if (values.some(row => row.length !== L)) {
            throw new Error("Each line must be the same length")
        }

        values.forEach(row => {
            const dup_row: Polynom[] = []
            row.forEach(value => {
                dup_row.push(new Polynom(value))
            })

            this.#values.push(dup_row)
        })

        return this
    }

    public fromVectors(...vectors: Vector[]): this {

        this.#values = []

        // Each vectors must be the same dimension
        const L = vectors[0].dimension
        if (vectors.some(v => v.dimension !== L)) {
            throw new Error("Each vectors must be the same dimension")
        }

        this.fromDimensions(vectors[0].dimension, vectors.length)

        vectors.forEach((vector, column) => {
            vector.array.forEach((value, row) => {
                this.#values[row][column] = new Polynom(value)
            })
        })

        return this
    }

    public inverse(): this {
        if(!this.canBeInverted()){
            throw new Error('The matrix cannot be inverted.')
        }

        const cofactors_matrix = new Matrix().fromDimensions(this.dimension.rows, this.dimension.cols)
        cofactors_matrix.forEach((_, row, column)=>{
            cofactors_matrix.setValue(row, column, this.cofactor(row, column))
        })

        cofactors_matrix.transpose()

        // Copy the value to "this"
        const determinant = this.determinant()
        cofactors_matrix.forEach((aij, i, j)=>this.setValue(i,j, aij.divide(determinant).reduce()))

        return this
    }

    public isEqual(value: Matrix): boolean {
        // Two matrix are equals if they are the same dimension and all aij are equals.
        if (!this.canBeAdded(value)) {
            return false
        }

        let aij_are_equals = true
        this.forEach((aij, row, column) => {
            aij_are_equals &&= aij.isEqual(value.values[row][column])
        })

        return aij_are_equals
    }

    public isOne(): boolean {
        for (let row = 0; row < this.#values.length; row++) {
            for (let col = 0; col < this.#values[row].length; col++) {
                if (col === row && !this.#values[row][col].isOne()) {
                    return false
                }
                if (col !== row && !this.#values[row][col].isZero()) {
                    return false
                }
            }
        }

        return true
    }

    public isSquare(): boolean {
        return this.dimension.cols === this.dimension.rows
    }

    public isZero(): boolean {
        return this.flat().every(v => v.isZero())
    }

    public map<T>(callback: (aij: Polynom, row: number, column: number) => T): T[][] {
        const {rows, cols} = this.dimension

        const arr = Array.from({length: rows}, () => {
            return Array.from({length: cols}, () => undefined as T)
        })

        this.#values.forEach((row, i) => {
            row.forEach((aij, j) => {
                arr[i][j] = callback(aij, i, j)
            })
        })

        return arr
    }

    public multiply(value: InputValue<Polynom> | Matrix): this {
        if (value instanceof Matrix) {
            if (!this.canBeMultiplied(value)) {
                throw new Error(`Cannot multiply a matrix with incompatibles dimensions`)
            }

            // Multiply two matrix
            const result = new Matrix(this.dimension.rows, value.dimension.cols)
            result.forEach((_, i, j) => {
                // Multiply this.rows[i] by this.cols[j]
                const row = this.rows[i]
                const col = value.cols[j]

                const v = new Polynom()

                row.forEach((left, k) => {
                    v.add(left.clone().multiply(col[k]))
                })

                result.setValue(i, j, v)
            })

            this.#values = result.values
            return this
        }

        // Scalar multiplication
        this.forEach((aij, i, j) => {
            this.setValue(i, j, aij.multiply(value))
        })
        return this
    }

    public one(): this {
        this.forEach((aij, row, column) => {
            if (row === column) {
                aij.one()
            } else {
                aij.zero()
            }
        })
        return this
    }

    public opposite(): this {
        this.forEach((aij) => {
            aij.opposite()
        })
        return this
    }

    get pmatrix(): this {
        this.#matrix_parenthesis = true
        return this
    }

    public pow(value: number): this {
        return operation_pow(this as Matrix, value) as this
    }

    public reduce(): Matrix {
        throw new Error('Not yet implemented')
    }

    get rows(): Polynom[][] {
        return this.#values
    }

    public setValue(row: number, column: number, value: InputAlgebra<Polynom>): this {
        const {rows, cols} = this.dimension
        if ((row < 0 || row >= rows) ||
            column < 0 || column >= cols) {
            throw new Error(`${row}x${column} is out of range (${rows}x${cols})`)
        }

        this.#values[row][column] = new Polynom(value)
        return this
    }

    public subtract(value: Matrix): this {
        if (!this.canBeAdded(value)) {
            throw new Error("Cannot subtract a matrix with different dimensions.")
        }

        this.forEach((aij, i, j) => {
            aij.subtract(value.values[i][j])
        })

        return this
    }

    public transpose(): this {
        const temp = this.clone()

        temp.forEach((aij, i, j)=>{
            this.setValue(j, i, aij.clone())
        })

        return this
    }

    get values(): Polynom[][] {
        return this.#values
    }

    public zero(): this {
        this.forEach(aij => aij.zero())
        return this
    }
}