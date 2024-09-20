/**
 * Vector2D module contains everything necessary to handle 2d vectors.
 * @module Point
 */

import { Fraction } from "../coefficients/fraction"
import type { InputValue } from "../pimath.interface"
import { Vector } from "./vector"

export class Point extends Vector {

    constructor()
    constructor(value: Vector)
    constructor(start: Vector, end: Vector)
    constructor(...values: InputValue<Fraction>[])
    constructor(...values: Vector[] | InputValue<Fraction>[]) {
        super()

        // Initialize the vector
        if (values.length > 0) {
            this.parse(...values)
        }
    };

    public override parse(...values: Vector[] | InputValue<Fraction>[]): this {
        this.asPoint = true

        if (values.length === 1) {
            if (values[0] instanceof Vector) {
                this.array = values[0].copy()
                return this
            }

            if (typeof values[0] === 'string') {
                this.fromString(values[0])
                return this
            }
        }


        if (values.length > 1) {
            if (values.some(x => x instanceof Vector)) {
                throw new Error('Creating a point with  multiple argument requires an input fraction')
            }

            const nbs: Fraction[] = values.map(x => new Fraction(x as InputValue<Fraction>))

            if (nbs.some(x => x.isNaN())) {
                throw new Error('The value is not a valid point sting (a,b): ' + values.join(','))
            }

            this.array = nbs
        }

        return this
    }


    public override clone(): Point {
        const V = new Point()
        V.array = this.copy()
        V.asPoint = true
        return V
    }

}
