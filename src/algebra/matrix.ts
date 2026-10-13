import type {InputAlgebra, InputValue, IPiMathObject} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Vector} from "../geometry/vector"
import {AbstractMatrix} from "./abstractMatrix"

/**
 * A matrix of {@link Fraction}s. Built from a string (`"((1,2),(3,4))"`), an array of rows, or a number of rows
 * and columns (a zero matrix). The operations are those of {@link AbstractMatrix}.
 * @example
 * new Matrix([[1, 2], [3, 4]]).determinant().display // "-2"
 */
export class Matrix extends AbstractMatrix<Fraction>
    implements IPiMathObject<Matrix> {

    constructor()
    constructor(rows: number, cols?: number)
    constructor(value: string)
    constructor(values: InputAlgebra<Fraction>[][])
    constructor(valueOrRows?: string | number | InputAlgebra<Fraction>[][], cols?: number) {
        if (typeof valueOrRows === 'number' || valueOrRows === undefined) {
            super(valueOrRows, cols)
        } else {
            super()
            this.parse(valueOrRows)
        }
    }

    /**
     * Build a matrix from its display string, such as `"((1,2),(3,4))"`.
     */
    static fromString(value: string): Matrix {
        return new Matrix(value)
    }

    /**
     * Build a matrix from an array of rows.
     * @throws {DimensionError} if the rows do not all have the same length.
     */
    static fromValues(values: InputAlgebra<Fraction>[][]): Matrix {
        return new Matrix(values)
    }

    /**
     * Build a zero matrix. Without `cols`, the matrix is square.
     */
    static fromDimensions(rows: number, cols?: number): Matrix {
        return new Matrix(rows, cols)
    }

    /**
     * Build a matrix whose columns are the given vectors.
     * @throws {DimensionError} if the vectors do not all have the same dimension.
     */
    static fromVectors(...vectors: Vector[]): Matrix {
        return new Matrix().parse(vectors)
    }

    protected createElement(value?: InputValue<Fraction>): Fraction {
        return value !== undefined ? new Fraction(value) : new Fraction(0)
    }

    /** Returns a new `Matrix` instance; `as this` satisfies the abstract contract for subclasses */
    protected createInstance(): this {
        return new Matrix() as this
    }
}
