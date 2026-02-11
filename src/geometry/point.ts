/**
 * POint module contains everything necessary to handle 2d Points
 * It's a "wrapper" of the Vector class.
 * @module Point
 */

import {Fraction} from "../coefficients"
import type {InputValue} from "../pimath.interface"
import {Root} from "../coefficients/root"
import {TupleN} from "./TupleN"
import type {Vector} from "./vector"


export class Point extends TupleN {
    constructor(...values: (Point|Vector)[] | InputValue<Fraction>[]) {
        super()

        // Initialize the vector
        if (values.length > 0) {
            this.parse(...values)
        }
    };

    public parse(...values: (Point|Vector)[] | InputValue<Fraction>[]): this {
        if (values.length === 1) {
            if (values[0] instanceof TupleN) {
                this.array = values[0].copy()
                return this
            }

            if (typeof values[0] === 'string') {
                this.fromString(values[0])
                return this
            }
        }


        if (values.length > 1) {
            if (values.some(x => x instanceof Point)) {
                throw new Error('Creating a point with  multiple argument requires an input fraction')
            }

            const nbs: Fraction[] = values.map(x => new Fraction(x as InputValue<Fraction>))

            if (nbs.some(x => x.isNaN())) {
                throw new Error('The given values are not a valid point string (a,b): ')
            }

            this.array = nbs
        }

        return this
    }

    public clone(): Point {
        return new Point(...this.copy())
    }

    get tex(): string {
        return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`
    }

    get display(): string {
        return `(${this.array.map(x => x.display).join(';')})`
    }

    distanceTo(B: Point): Root {
        if (this.dimension !== B.dimension) {
            throw new Error('The two points must have the same dimensions.')
        }

        const AB = this.array
            .map((x, index) => B.array[index].clone().subtract(x))

        const distance2 = AB
            .reduce(
                (acc, x) =>
                    acc.add(x.clone().pow(2)), new Fraction(0)
            )

        return new Root().from(2, distance2).reduce()
    }

    public isEqual(pt: Point): boolean {
        return this.x.value===pt.x.value && this.y.value===pt.y.value
    }

    public isEqualXY(x: InputValue<Fraction>, y: InputValue<Fraction>): boolean {
        return this.isEqual(new Point(x, y))
    }

    middleOf(V1: Point, V2: Point): this {
        if (V1.dimension !== V2.dimension) {
            throw new Error('Vectors must be the same dimension')
        }

        this.array = []
        V1.array.forEach((x, index) => {
            this.array.push(x.clone().add(V2.array[index]).divide(2))
        })

        return this
    }
}
