/**
 * POint module contains everything necessary to handle 2d Points
 * It's a "wrapper" of the Vector class.
 * @module Point
 */

import {Fraction} from "../coefficients"
import type {InputValue} from "../pimath.interface"

export abstract class TupleN {
    #array: Fraction[] = []
    #onChange?: ()=>void

    constructor(...values: InputValue<Fraction>[]) {
        this.#array = values.map(x=>new Fraction(x))
    };

    public abstract clone(): void

    public copy(): Fraction[] {
        return this.#array.map(x => x.clone())
    }

    abstract get tex(): string

    abstract get display(): string

    get array(): Fraction[] {
        return this.#array
    }

    set array(value: Fraction[]) {
        this.#array = value
    }

    get dimension(): number {
        return this.array.length
    }



    public fromString(value: string): this {
        // Remove the first letter if it's a parenthesis.
        if (value.startsWith('(')) {
            value = value.substring(1)
        }

        // Remove the last letter if it's a parenthesis.
        if (value.endsWith(')')) {
            value = value.substring(0, value.length - 1)
        }

        // Split comma, semi colon or single space.
        const components = value.split(/[,;\s]/g)
            .filter((v) => v.trim() !== '')

        // there must be at least two Pages.
        if (components.length < 2) {
            return this
        }

        // Validate the fraction values.
        this.#array = components.map(x => new Fraction(x))
        return this
    }

    setDimension(value = 2): this {
        if (value < 2) {
            throw new Error('Dimension must be at least 2')
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

    get z(): Fraction {
        if (this.dimension < 3) {
            throw new Error('Vector is not 3D')
        }
        return this.#array[2]
    }

    set z(value: Fraction | number | string) {
        if (this.dimension < 3) {
            throw new Error('Vector is not 3D')
        }
        this.#array[2] = new Fraction(value)
        this.#onChange?.()
    }

    zero = (): this => {
        this.#array.forEach(x => x.zero())
        this.#onChange?.()
        return this
    }

}
