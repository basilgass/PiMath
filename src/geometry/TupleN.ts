/**
 * Abstract base class for N-dimensional coordinate tuples (Point, Vector).
 * Coordinates are stored as an array of Fraction values.
 * @module TupleN
 */

import {Fraction} from "../coefficients"
import type { IDisplayDigits,IPiMathObject} from "../pimath.interface"
import {DimensionError, ParseError} from "../errors"

export abstract class TupleN implements IPiMathObject<TupleN>, IDisplayDigits {
    #array: Fraction[] = []
    #onChange?: () => void

    abstract clone(): TupleN

    /** Returns a deep copy of the raw coordinate array. Unlike `clone()`, returns a `Fraction[]`, not a TupleN instance. */
    cloneCoordinates(): Fraction[] {
        return this.#array.map(x => x.clone())
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#array.forEach(c => c.withDigits(digits))
        return this
    }

    abstract get tex(): string

    abstract get display(): string

    /**
     * The coordinates, as copies. Setting the property replaces them.
     */
    get array(): Fraction[] {
        return this.#array.map(x => x.clone())
    }

    set array(value: Fraction[]) {
        this.#array = value
    }

    /**
     * Number of coordinates: 2 in the plane, 3 in space.
     */
    get dimension(): number {
        return this.#array.length
    }

    /**
     * Strips optional outer parentheses, splits on `,` `;` or space, and returns the parsed Fraction array.
     * @throws {ParseError} if fewer than 2 components are found.
     */
    protected static parseString(value: string): Fraction[] {
        if (value.startsWith('(')) value = value.substring(1)
        if (value.endsWith(')'))   value = value.substring(0, value.length - 1)

        const components = value.split(/[,;\s]/g).filter(v => v.trim() !== '')

        if (components.length < 2) {
            throw new ParseError(`Cannot parse "${value}" as a tuple: at least 2 components required`)
        }

        return components.map(x => new Fraction(x))
    }

    /**
     * Function called when a coordinate is set through `x`, `y` or `z`, or when the tuple is zeroed.
     * {@link Triangle} uses it to refresh its remarkable lines.
     */
    get onChange(): undefined | (() => void) {
        return this.#onChange
    }

    set onChange(value: undefined | (() => void)) {
        this.#onChange = value
    }

    /**
     * Change the number of coordinates: new ones are zero, extra ones are removed.
     * @throws {DimensionError} if `value` is less than 2.
     */
    setDimension(value = 2): this {
        if (value < 2) {
            throw new DimensionError('Dimension must be at least 2')
        }

        if (value < this.dimension) {
            this.#array = this.#array.slice(0, value)
        } else if (value > this.dimension) {
            for (let i = this.dimension; i < value; i++) {
                this.#array.push(new Fraction(0))
            }
        }

        return this
    }

    /**
     * First coordinate. Setting it accepts a fraction, a number or a string.
     */
    get x(): Fraction {
        return this.#array[0]
    }

    set x(value: Fraction | number | string) {
        this.#array[0] = new Fraction(value)
        this.#onChange?.()
    }

    /**
     * Second coordinate. Setting it accepts a fraction, a number or a string.
     */
    get y(): Fraction {
        return this.#array[1]
    }

    set y(value: Fraction | number | string) {
        this.#array[1] = new Fraction(value)
        this.#onChange?.()
    }

    /**
     * Third coordinate. Setting it accepts a fraction, a number or a string.
     * @throws {DimensionError} if the tuple has fewer than 3 coordinates.
     */
    get z(): Fraction {
        if (this.dimension < 3) {
            throw new DimensionError('Vector is not 3D')
        }
        return this.#array[2]
    }

    /** @throws {DimensionError} if dimension < 3 */
    set z(value: Fraction | number | string) {
        if (this.dimension < 3) {
            throw new DimensionError('Vector is not 3D')
        }
        this.#array[2] = new Fraction(value)
        this.#onChange?.()
    }

    copy(value: TupleN): this {
        this.array = value.cloneCoordinates()
        return this
    }

    /**
     * True when every coordinate is zero.
     */
    isZero(): boolean {
        return this.#array.every(x => x.isZero())
    }

    /**
     * Euclidean norm, as a decimal number.
     */
    get norm(): number {
        return Math.sqrt(this.normSquare.value)
    }

    /**
     * Square of the norm, as an exact fraction.
     */
    get normSquare(): Fraction {
        return this.#array.reduce((acc, x) => acc.add(x.clone().pow(2)), new Fraction(0))
    }

    /**
     * Change the sign of every coordinate.
     */
    opposite(): this {
        this.array = this.cloneCoordinates().map(x => x.opposite())
        return this
    }

    /**
     * Set every coordinate to zero.
     */
    zero(): this {
        this.#array.forEach(x => x.zero())
        this.#onChange?.()
        return this
    }

}
