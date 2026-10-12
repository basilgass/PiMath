/**
 * Represents an N-dimensional point, stored as an array of Fraction coordinates.
 * Sibling of Vector — both extend TupleN.
 * @module Point
 */

import {Fraction} from "../coefficients"
import type {InputValue, IPiMathObject} from "../pimath.interface"
import {DimensionError, InvalidArgumentError, ParseError} from "../errors"
import {Root} from "../coefficients/root"
import {TupleN} from "./TupleN"
import type {Vector} from "./vector"


export class Point extends TupleN implements IPiMathObject<Point> {
    constructor(...values: (Point|Vector)[] | InputValue<Fraction>[]) {
        super()

        // Initialize the vector
        if (values.length > 0) {
            this.parse(...values)
        }
    };

    parse(...values: (Point|Vector)[] | InputValue<Fraction>[]): this {
        if (values.length === 1) {
            if (values[0] instanceof TupleN) {
                this.array = values[0].cloneCoordinates()
                return this
            }

            if (typeof values[0] === 'string') {
                return this.copy(Point.fromString(values[0]))
            }
        }


        if (values.length > 1) {
            if (values.some(x => x instanceof TupleN)) {
                throw new InvalidArgumentError('Creating a point from multiple arguments requires scalar inputs')
            }

            const nbs: Fraction[] = values.map(x => new Fraction(x as InputValue<Fraction>))

            if (nbs.some(x => x.isNaN())) {
                throw new ParseError('The given values are not a valid point string (a,b): ')
            }

            this.array = nbs
        }

        return this
    }

    static fromString(value: string): Point {
        const p = new Point()
        p.array = TupleN.parseString(value)
        return p
    }

    clone(): Point {
        // direct assignment: the constructor would rebuild the coordinates and drop their display state
        const p = new Point()
        p.array = this.cloneCoordinates()
        return p
    }

    get tex(): string {
        return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`
    }

    get display(): string {
        return `(${this.array.map(x => x.display).join(';')})`
    }

    /** @throws {DimensionError} if B has a different dimension */
    distanceTo(B: Point): Root {
        if (this.dimension !== B.dimension) {
            throw new DimensionError('The two points must have the same dimensions.')
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

    isEqual(pt: Point): boolean {
        if (this.dimension !== pt.dimension) return false
        const other = pt.array
        return this.array.every((coord, i) => coord.isEqual(other[i]))
    }

    isEqualXY(x: InputValue<Fraction>, y: InputValue<Fraction>): boolean {
        return this.isEqual(new Point(x, y))
    }

    static middleOf(V1: Point, V2: Point): Point {
        return new Point().middleOf(V1, V2)
    }

    /** @throws {DimensionError} if V1 and V2 have different dimensions */
    middleOf(V1: Point, V2: Point): this {
        if (V1.dimension !== V2.dimension) {
            throw new DimensionError('Vectors must be the same dimension')
        }

        this.array = V1.cloneCoordinates().map((x, index) => x.add(V2.array[index]).divide(2))

        return this
    }
}
