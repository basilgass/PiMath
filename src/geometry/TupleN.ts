/**
 * Abstract base class for N-dimensional coordinate tuples (Point, Vector).
 * Coordinates are stored as an array of Fraction values.
 * @module TupleN
 */

import {Fraction} from "../coefficients"
import type {IPiMathObject} from "../pimath.interface"
import {DimensionError, ParseError} from "../errors"

export abstract class TupleN implements IPiMathObject<TupleN> {
    #array: Fraction[] = []
    #onChange?: () => void

    abstract clone(): TupleN

    /** Returns a deep copy of the raw coordinate array. Unlike `clone()`, returns a `Fraction[]`, not a TupleN instance. */
    cloneCoordinates(): Fraction[] {
        return this.#array.map(x => x.clone())
    }

    abstract get tex(): string

    abstract get display(): string

    get array(): Fraction[] {
        return this.#array.map(x => x.clone())
    }

    set array(value: Fraction[]) {
        this.#array = value
    }

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

    get onChange(): undefined | (() => void) {
        return this.#onChange
    }

    set onChange(value: undefined | (() => void)) {
        this.#onChange = value
    }

    /** @throws {DimensionError} if value < 2 */
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

    get x(): Fraction {
        return this.#array[0]
    }

    set x(value: Fraction | number | string) {
        this.#array[0] = new Fraction(value)
        this.#onChange?.()
    }

    get y(): Fraction {
        return this.#array[1]
    }

    set y(value: Fraction | number | string) {
        this.#array[1] = new Fraction(value)
        this.#onChange?.()
    }

    /** @throws {DimensionError} if dimension < 3 */
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

    isZero(): boolean {
        return this.#array.every(x => x.isZero())
    }

    get norm(): number {
        return Math.sqrt(this.normSquare.value)
    }

    get normSquare(): Fraction {
        return this.#array.reduce((acc, x) => acc.add(x.clone().pow(2)), new Fraction(0))
    }

    opposite(): this {
        this.array = this.cloneCoordinates().map(x => x.opposite())
        return this
    }

    zero(): this {
        this.#array.forEach(x => x.zero())
        this.#onChange?.()
        return this
    }

}
