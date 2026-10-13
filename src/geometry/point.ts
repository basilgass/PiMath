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


/**
 * A point of the plane or of space, with exact coordinates. Built from numbers (`new Point(1, 2)`), from a
 * string (`"(1;2)"`) or from another point or vector. The `x`, `y` and `z` coordinates are fractions.
 * @example
 * new Point(1, 2).tex // "\\left(1;2\\right)"
 */
export class Point extends TupleN implements IPiMathObject<Point> {
    constructor(...values: (Point|Vector)[] | InputValue<Fraction>[]) {
        super()

        // Initialize the vector
        if (values.length > 0) {
            this.parse(...values)
        }
    };

    /**
     * Replace the coordinates with numbers, a string, a point or a vector.
     * @throws {InvalidArgumentError} if several arguments are given and one of them is a point or a vector.
     * @throws {ParseError} if a value is not a number.
     */
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

    /**
     * Build a point from a string such as `"(1;2)"`, `"1,2"` or `"1 2 3"`: at least two coordinates, separated
     * by `,`, `;` or a space.
     * @throws {ParseError} if fewer than 2 coordinates are found.
     */
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

    /**
     * Distance to another point, as an exact reduced {@link Root}.
     * @throws {DimensionError} if the points have different dimensions.
     */
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

    /**
     * True when both points have the same dimension and the same coordinates.
     */
    isEqual(pt: Point): boolean {
        if (this.dimension !== pt.dimension) return false
        const other = pt.array
        return this.array.every((coord, i) => coord.isEqual(other[i]))
    }

    /**
     * True when the point is `(x, y)`.
     */
    isEqualXY(x: InputValue<Fraction>, y: InputValue<Fraction>): boolean {
        return this.isEqual(new Point(x, y))
    }

    /**
     * The midpoint of two points, as a new point.
     * @throws {DimensionError} if the points have different dimensions.
     */
    static middleOf(V1: Point, V2: Point): Point {
        return new Point().middleOf(V1, V2)
    }

    /**
     * Set this point to the midpoint of two points.
     * @throws {DimensionError} if the points have different dimensions.
     */
    middleOf(V1: Point, V2: Point): this {
        if (V1.dimension !== V2.dimension) {
            throw new DimensionError('Vectors must be the same dimension')
        }

        this.array = V1.cloneCoordinates().map((x, index) => x.add(V2.array[index]).divide(2))

        return this
    }
}
