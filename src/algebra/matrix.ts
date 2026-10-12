import type {InputAlgebra, InputValue, IPiMathObject} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Vector} from "../geometry/vector"
import {AbstractMatrix} from "./abstractMatrix"

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

    static fromString(value: string): Matrix {
        return new Matrix(value)
    }

    static fromValues(values: InputAlgebra<Fraction>[][]): Matrix {
        return new Matrix(values)
    }

    static fromDimensions(rows: number, cols?: number): Matrix {
        return new Matrix(rows, cols)
    }

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
