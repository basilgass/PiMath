import type {InputAlgebra, InputValue, IPiMathObject} from "../pimath.interface"
import {Polynom} from "./polynom"
import {Vector} from "../geometry/vector"
import {AbstractMatrix} from "./abstractMatrix"
import {Matrix} from "./matrix"
import {DimensionError} from "../errors"

export type IPolyMatrixValues = InputAlgebra<Polynom>[][]

/**
 * A matrix of {@link Polynom}s: the same operations as {@link Matrix}, with polynomial entries. It is the
 * tool for the characteristic polynomial of a matrix. Built like a `Matrix`: from an array of rows, a display
 * string, or a number of rows and columns.
 */
export class PolyMatrix extends AbstractMatrix<Polynom>
    implements IPiMathObject<PolyMatrix> {

    constructor()
    constructor(rows: number, cols?: number)
    constructor(value: string)
    constructor(values: InputAlgebra<Polynom>[][])
    constructor(valueOrRows?: string | number | InputAlgebra<Polynom>[][], cols?: number) {
        if (typeof valueOrRows === 'number' || valueOrRows === undefined) {
            super(valueOrRows, cols)
        } else {
            super()
            this.parse(valueOrRows)
        }
    }

    /**
     * Build a matrix from its display string, such as `"((x,1),(2,x+1))"`.
     */
    static fromString(value: string): PolyMatrix {
        return new PolyMatrix().parse(value)
    }

    /**
     * Build a matrix from an array of rows.
     * @throws {DimensionError} if the rows do not all have the same length.
     */
    static fromValues(values: InputAlgebra<Polynom>[][]): PolyMatrix {
        return new PolyMatrix().parse(values)
    }

    /**
     * Build a zero matrix. Without `cols`, the matrix is square.
     */
    static fromDimensions(rows: number, cols?: number): PolyMatrix {
        return new PolyMatrix(rows, cols)
    }

    /**
     * Build a matrix whose columns are the given vectors.
     * @throws {DimensionError} if the vectors do not all have the same dimension.
     */
    static fromVectors(...vectors: Vector[]): PolyMatrix {
        return new PolyMatrix().parse(vectors)
    }

    /**
     * Creates a `PolyMatrix` from a `Matrix` by converting each `Fraction` entry
     * to a constant `Polynom`.
     */
    static fromMatrix(m: Matrix): PolyMatrix {
        return PolyMatrix.fromValues(m.values.map(row => row.map(v => v.display)))
    }

    protected createElement(value?: InputValue<Polynom>): Polynom {
        return value !== undefined ? new Polynom(value) : new Polynom()
    }

    /** Returns a new `PolyMatrix` instance; `as this` satisfies the abstract contract for subclasses */
    protected createInstance(): this {
        return new PolyMatrix() as this
    }

    /**
     * Computes the characteristic polynomial `det(A − λI)` of this matrix.
     * @param variable - symbol used for the eigenvalue parameter (default: `'k'`)
     * @throws {DimensionError} if the matrix is not square
     */
    characteristic_polynom(variable?: string): Polynom {
        if (!this.isSquare()) {
            throw new DimensionError('characteristic_polynom requires a square matrix')
        }
        variable ??= 'k'
        return this.clone().subtract(
            new PolyMatrix(this.dimension.rows).one().multiply(new Polynom(variable))
        ).determinant()
    }
}
