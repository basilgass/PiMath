import type {IDisplayDigits, IMatrixElement, InputAlgebra, InputValue} from "../pimath.interface"
import {assertDigits} from "../helpers"
import {Vector} from "../geometry/vector"
import {DimensionError, IndexError, InvalidArgumentError, MathError} from "../errors"

enum MatrixType {
    pmatrix,
    bmatrix,
    Bmatrix,
    vmatrix,
    Vmatrix
}

export abstract class AbstractMatrix<T extends IMatrixElement<T>> implements IDisplayDigits {
    #matrix_parenthesis: MatrixType = MatrixType.pmatrix
    #partition: number | null = null
    #values: T[][] = []

    protected abstract createElement(value?: InputValue<T>): T
    protected abstract createInstance(): this

    constructor(rowCount?: number, colCount?: number) {
        if (rowCount) {
            colCount = colCount ?? rowCount
            this.#loadFromDimensions(rowCount, colCount)
        }
    }

    parse(value: string | InputAlgebra<T>[][] | Vector[]): this {
        if (typeof value === 'string') return this.#loadFromString(value)
        if (value.length > 0 && value[0] instanceof Vector) return this.#loadFromVectors(...(value as Vector[]))
        return this.#loadFromValues(value as InputAlgebra<T>[][])
    }

    copy(value: AbstractMatrix<T>): this {
        this.#values = value.#values.map(row => row.map(v => v.clone()))
        this.#partition = value.#partition
        return this
    }

    clone(): this {
        const duplicates: T[][] = []
        this.#values.forEach(row => {
            duplicates.push(row.map(v => v.clone()))
        })
        const result = this.createInstance().#loadFromValues(duplicates)
        result.#partition = this.#partition
        return result
    }

    get tex(): string {
        if (this.#values.length === 0) return ""

        if (this.#partition !== null) {
            const {cols} = this.dimension
            const colSpec = 'c'.repeat(this.#partition) + '|' + 'c'.repeat(cols - this.#partition)
            const [lDel, rDel] = this.#resolveTeXdelimiters()
            const rows = this.#values.map(row => '\t' + row
                .map(p => p.tex)
                .join(' & ') + '\\\\'
            )
            return [`\\left${lDel}\\begin{array}{${colSpec}}`, ...rows, `\\end{array}\\right${rDel}`].join('\n')
        }

        const wrapper = this.#resolveTeXwrapper()
        const output = [
            `\\begin{${wrapper}}`,
            ...this.#values
                .map(row => '\t' + row
                    .map(p => p.tex)
                    .join(' & ') + '\\\\'
                ),
            `\\end{${wrapper}}`
        ].join('\n')

        return output
    }

    #resolveWrapper(): [string, string] {
        if (this.#matrix_parenthesis === MatrixType.vmatrix) return ['|', '|']
        if (this.#matrix_parenthesis === MatrixType.Vmatrix) return ['||', '||']
        if (this.#matrix_parenthesis === MatrixType.bmatrix) return ['[', ']']
        if (this.#matrix_parenthesis === MatrixType.Bmatrix) return ['{', '}']
        return ['(', ')']
    }

    #resolveTeXdelimiters(): [string, string] {
        if (this.#matrix_parenthesis === MatrixType.vmatrix) return ['|', '|']
        if (this.#matrix_parenthesis === MatrixType.Vmatrix) return ['\\|', '\\|']
        if (this.#matrix_parenthesis === MatrixType.bmatrix) return ['[', ']']
        if (this.#matrix_parenthesis === MatrixType.Bmatrix) return ['\\{', '\\}']
        return ['(', ')']
    }

    #resolveTeXwrapper(): string {
        if (this.#matrix_parenthesis === MatrixType.vmatrix) return 'vmatrix'
        if (this.#matrix_parenthesis === MatrixType.Vmatrix) return 'Vmatrix'
        if (this.#matrix_parenthesis === MatrixType.bmatrix) return 'bmatrix'
        if (this.#matrix_parenthesis === MatrixType.Bmatrix) return 'Bmatrix'
        return 'pmatrix'
    }

    get display(): string {
        if (this.#values.length === 0) return ""

        const p = this.#partition
        const wrapper = this.#resolveWrapper()
        const output = wrapper[0] +
            this.map(aij => aij.display)
                .map(row => {
                    if (p !== null) {
                        return `(${row.slice(0, p).join(',')}|${row.slice(p).join(',')})`
                    }
                    return `(${row.join(',')})`
                })
                .join(',') +
            wrapper[1]

        return output
    }

    /** @throws {DimensionError} if the dimensions don't match */
    add(value: AbstractMatrix<T>): this {
        if (!this.canBeAdded(value)) {
            throw new DimensionError("Cannot add a matrix with different dimensions.")
        }
        this.forEach((aij, i, j) => {
            aij.add(value.#values[i][j])
        })
        return this
    }

    /**
     * Returns element at position (i, j), or null if the index is out of bounds.
     */
    aij(i: number, j: number): T | null {
        if (i < 0 || i >= this.dimension.rows || j < 0 || j >= this.dimension.cols) {
            return null
        }
        return this.#values[i][j]
    }

    get asBmatrix(): this {
        this.#matrix_parenthesis = MatrixType.bmatrix
        return this
    }

    get asBraceMatrix(): this {
        this.#matrix_parenthesis = MatrixType.Bmatrix
        return this
    }

    canBeAdded(matrix: AbstractMatrix<T>): boolean {
        const {rows, cols} = this.dimension
        const {rows: rows2, cols: cols2} = matrix.dimension
        return rows === rows2 && cols === cols2
    }

    canBeInverted(): boolean {
        if (!this.isSquare()) return false
        return !this.determinant().isZero()
    }

    canBeMultiplied(matrix: AbstractMatrix<T>): boolean {
        return this.dimension.cols === matrix.dimension.rows
    }

    cofactor(row: number, column: number): T {
        // The minor of a 1x1 matrix is the empty matrix, whose determinant is 1.
        if (this.#values.length === 1) {
            return this.createElement(1)
        }

        const coMatrix = this.clone()
        coMatrix.#values.splice(row, 1)
        coMatrix.#values.forEach(r => {
            r.splice(column, 1)
        })
        return coMatrix.determinant().multiply((-1) ** (row + column))
    }

    get cols(): T[][] {
        return Array.from({length: this.dimension.cols}, (_, j) =>
            Array.from({length: this.dimension.rows}, (_, i) => this.#values[i][j].clone())
        )
    }

    /** @throws {DimensionError} if the matrix is not square */
    determinant(): T {
        if (!this.isSquare()) {
            throw new DimensionError('Matrix is not square')
        }
        if (this.#values.length === 1) {
            return this.#values[0][0].clone()
        }
        const det = this.createElement(0)
        this.#values[0].forEach((aij, column) => {
            const C = this.cofactor(0, column)
            det.add(aij.clone().multiply(C))
        })
        return det
    }

    get dimension(): {rows: number, cols: number} {
        return {
            rows: this.#values.length,
            cols: this.#values.length > 0 ? this.#values[0].length : 0,
        }
    }

    flat(): T[] {
        return this.#values.flat()
    }

    forEach(callback: (aij: T, row: number, column: number) => void): void {
        this.#values.forEach((row, i) => {
            row.forEach((aij, j) => {
                callback(aij, i, j)
            })
        })
    }

    #loadFromDimensions(rows: number, cols: number): this {
        this.#values = Array.from({length: rows}, () =>
            Array.from({length: cols}, () => this.createElement(0))
        )
        return this
    }

    /**
     * Parses a matrix from its display string format: `((a11,a12),(a21,a22))`.
     * The format matches the output of the `display` getter.
     */
    #loadFromString(value: string): this {
        if (value.startsWith('((') && value.endsWith('))')) {
            return this.#loadFromString(value.substring(1, value.length - 1))
        }
        const arr = value.split('),(')
        this.#values = arr
            .map((row, index) => {
                if (index === 0 && index === arr.length - 1) return row.slice(1, -1).split(',')
                if (index === 0) return row.substring(1).split(',')
                if (index === arr.length - 1) return row.substring(0, row.length - 1).split(',')
                return row.split(',')
            })
            .map(rowItems => rowItems.map(item => this.createElement(item)))
        return this
    }

    #loadFromValues(values: InputAlgebra<T>[][]): this {
        this.#values = []
        const L = values[0].length
        if (values.some(row => row.length !== L)) {
            throw new DimensionError("Each line must be the same length")
        }
        values.forEach(row => {
            this.#values.push(row.map(v => this.createElement(v as InputValue<T>)))
        })
        return this
    }

    /**
     * Builds the matrix by placing each vector as a column.
     * @throws {DimensionError} if vectors don't have the same dimension
     */
    #loadFromVectors(...vectors: Vector[]): this {
        this.#values = []
        const L = vectors[0].dimension
        if (vectors.some(v => v.dimension !== L)) {
            throw new DimensionError("Each vectors must be the same dimension")
        }
        this.#loadFromDimensions(vectors[0].dimension, vectors.length)
        vectors.forEach((vector, column) => {
            vector.array.forEach((value, row) => {
                this.#values[row][column] = this.createElement(value)
            })
        })
        return this
    }

    /**
     * Reduces this matrix to (reduced) row echelon form in place.
     * Rows are swapped to find non-zero pivots; each pivot row is scaled so the
     * pivot equals 1; rows above (RREF) or below (REF) the pivot are eliminated.
     */
    #gaussReduce(reduced: boolean): this {
        const {rows, cols} = this.dimension
        let pivotRow = 0

        for (let col = 0; col < cols && pivotRow < rows; col++) {
            let found = -1
            for (let row = pivotRow; row < rows; row++) {
                if (!this.#values[row][col].isZero()) {
                    found = row
                    break
                }
            }
            if (found === -1) continue

            if (found !== pivotRow) {
                [this.#values[pivotRow], this.#values[found]] = [this.#values[found], this.#values[pivotRow]]
            }

            const pivot = this.#values[pivotRow][col].clone()
            this.#values[pivotRow] = this.#values[pivotRow].map(v => v.clone().divide(pivot).reduce())

            for (let row = reduced ? 0 : pivotRow + 1; row < rows; row++) {
                if (row === pivotRow) continue
                const factor = this.#values[row][col].clone()
                if (factor.isZero()) continue
                this.#values[row] = this.#values[row].map((v, j) =>
                    v.clone().subtract(factor.clone().multiply(this.#values[pivotRow][j])).reduce()
                )
            }

            pivotRow++
        }

        return this
    }

    /**
     * Inverts this matrix in place.
     * @throws {MathError} if the matrix is not invertible (singular or non-square)
     */
    inverse(): this {
        if (!this.canBeInverted()) {
            throw new MathError('The matrix cannot be inverted.')
        }
        const cofactors_matrix = this.createInstance().#loadFromDimensions(this.dimension.rows, this.dimension.cols)
        cofactors_matrix.forEach((_, row, column) => {
            cofactors_matrix.setValue(row, column, this.cofactor(row, column))
        })
        const transposed = cofactors_matrix.transpose()
        const determinant = this.determinant()
        transposed.forEach((aij, i, j) => this.setValue(i, j, aij.divide(determinant).reduce()))
        return this
    }

    isEqual(value: AbstractMatrix<T>): boolean {
        if (!this.canBeAdded(value)) return false
        let aij_are_equals = true
        this.forEach((aij, row, column) => {
            aij_are_equals &&= aij.isEqual(value.#values[row][column])
        })
        return aij_are_equals
    }

    isOne(): boolean {
        if (!this.isSquare()) return false
        for (let row = 0; row < this.#values.length; row++) {
            for (let col = 0; col < this.#values[row].length; col++) {
                if (col === row && !this.#values[row][col].isOne()) return false
                if (col !== row && !this.#values[row][col].isZero()) return false
            }
        }
        return true
    }

    isSquare(): boolean {
        return this.dimension.cols === this.dimension.rows
    }

    isZero(): boolean {
        return this.flat().every(v => v.isZero())
    }

    /**
     * Returns true if the augmented matrix `[A|b]` has a consistent system of
     * equations. A row `[0…0 | c≠0]` after row reduction signals inconsistency.
     * Always returns true when no partition has been set.
     */
    isConsistent(): boolean {
        if (this.#partition === null) return true
        const p = this.#partition
        const ref = this.rowEchelonForm()
        return !ref.rows.some(row =>
            row.slice(0, p).every(v => v.isZero()) &&
            row.slice(p).some(v => !v.isZero())
        )
    }

    map<U>(callback: (aij: T, row: number, column: number) => U): U[][] {
        const {rows, cols} = this.dimension
        const arr = Array.from({length: rows}, () =>
            Array.from({length: cols}, () => undefined as U)
        )
        this.#values.forEach((row, i) => {
            row.forEach((aij, j) => {
                arr[i][j] = callback(aij, i, j)
            })
        })
        return arr
    }

    /** @throws {DimensionError} if dimensions are incompatible for matrix multiplication */
    multiply(value: InputValue<T> | AbstractMatrix<T>): this {
        if (value instanceof AbstractMatrix) {
            if (!this.canBeMultiplied(value)) {
                throw new DimensionError(`Cannot multiply a matrix with incompatibles dimensions`)
            }
            const result = this.createInstance().#loadFromDimensions(this.dimension.rows, value.dimension.cols)
            result.forEach((_, i, j) => {
                const v = this.createElement(0)
                this.#values[i].forEach((left, k) => {
                    v.add(left.clone().multiply(value.#values[k][j]))
                })
                result.#values[i][j] = v
            })
            this.#values = result.#values
            return this
        }
        this.forEach((aij, i, j) => {
            this.setValue(i, j, aij.multiply(value))
        })
        return this
    }

    one(): this {
        this.forEach((aij, row, column) => {
            if (row === column) aij.one()
            else aij.zero()
        })
        return this
    }

    opposite(): this {
        this.forEach(aij => aij.opposite())
        return this
    }

    get asPmatrix(): this {
        this.#matrix_parenthesis = MatrixType.pmatrix
        return this
    }

    get asVmatrix(): this {
        this.#matrix_parenthesis = MatrixType.vmatrix
        return this
    }

    get asDoubleVmatrix(): this {
        this.#matrix_parenthesis = MatrixType.Vmatrix
        return this
    }

    /** @throws {InvalidArgumentError} if the exponent is not a non-negative integer */
    pow(value: number): this {
        if (!Number.isSafeInteger(value)) {
            throw new InvalidArgumentError('Can only raise item by an integer')
        }
        if (value < 0) {
            throw new InvalidArgumentError('Can only raise item by a non-negative integer')
        }
        if (value === 0) return this.one()
        const P = this.clone()
        for (let i = 1; i < value; i++) {
            this.multiply(P)
        }
        return this
    }

    /**
     * Returns the rank of this matrix — the number of non-zero rows after
     * reduction to row echelon form.
     */
    rank(): number {
        const ref = this.rowEchelonForm()
        return ref.rows.filter(row => row.some(v => !v.isZero())).length
    }

    reduce(): this {
        this.forEach(aij => aij.reduce())
        return this
    }

    /**
     * Returns a new matrix in reduced row echelon form (Gauss-Jordan).
     * Each pivot column has exactly one non-zero entry (value 1). Does not
     * modify the receiver.
     */
    reducedRowEchelonForm(): this {
        return this.clone().#gaussReduce(true)
    }

    /**
     * Returns a new matrix in row echelon form (forward Gauss elimination).
     * The matrix is upper-triangular with each pivot normalised to 1. Does not
     * modify the receiver.
     */
    rowEchelonForm(): this {
        return this.clone().#gaussReduce(false)
    }

    get rows(): T[][] {
        return this.#values.map(row => row.map(v => v.clone()))
    }

    setValue(row: number, column: number, value: InputValue<T>): this {
        const {rows, cols} = this.dimension
        if ((row < 0 || row >= rows) || column < 0 || column >= cols) {
            throw new IndexError(`${row}x${column} is out of range (${rows}x${cols})`)
        }
        this.#values[row][column] = this.createElement(value)
        return this
    }

    /** @throws {DimensionError} if the dimensions don't match */
    subtract(value: AbstractMatrix<T>): this {
        if (!this.canBeAdded(value)) {
            throw new DimensionError("Cannot subtract a matrix with different dimensions.")
        }
        this.forEach((aij, i, j) => {
            aij.subtract(value.#values[i][j])
        })
        return this
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        assertDigits(digits)
        this.#values.forEach(row => row.forEach(aij => aij.withDigits(digits)))
        return this
    }

    /**
     * Returns a new matrix that is the transpose of this one.
     * Does not modify the receiver.
     */
    transpose(): this {
        const {rows, cols} = this.dimension
        const result = this.createInstance().#loadFromDimensions(cols, rows)
        this.forEach((aij, i, j) => {
            result.#values[j][i] = aij.clone()
        })
        return result
    }

    get values(): T[][] {
        return this.#values.map(row => row.map(v => v.clone()))
    }

    /**
     * Sets the column index that separates the coefficient columns from the
     * augmented column(s) in `display` and `tex` output. A `|` separator is
     * inserted before column `col`. The partition persists until overwritten.
     * @throws {IndexError} if `col` is not strictly between 0 and the column count
     */
    withPartition(col: number): this {
        const {cols} = this.dimension
        if (col <= 0 || col >= cols) {
            throw new IndexError(`Partition column ${col} is out of range (matrix has ${cols} columns)`)
        }
        this.#partition = col
        return this
    }

    zero(): this {
        this.forEach(aij => aij.zero())
        return this
    }
}
