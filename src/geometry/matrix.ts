import { Fraction } from "../coefficients/fraction"
import { determinant } from "./geomMath"
import type { Vector } from "./vector"


export class Matrix {
    #values: Vector[] = []
    constructor(...values: Vector[]) {
        this.#values = values

        return this
    }

    get values(): Vector[] {
        return this.#values
    }

    get array(): Fraction[][] {
        return this.#values.map(v => v.array)
    }

    get dimension(): number[] {
        return [this.#values.length, this.#values[0].dimension]
    }

    isSquare(): boolean {
        return this.#values.length === this.#values[0].dimension
    }

    determinant(): Fraction {
        if (!this.isSquare()) {
            throw new Error('Matrix is not square')
        }

        return determinant(...this.values)
    }
}