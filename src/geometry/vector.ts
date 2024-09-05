/**
 * Vector2D module contains everything necessary to handle 2d vectors.
 * @module Vector
 */
import type { InputValue } from "../pimath.interface"
import { Fraction } from "../coefficients/fraction"
import { Numeric } from "../numeric"
import { areVectorsColinears, areVectorsEquals, dotProduct } from "./geomMath"

export class Vector {
    #array: Fraction[] = []
    #asPoint = false

    constructor()
    constructor(value: Vector)
    constructor(start: Vector, end: Vector)
    constructor(...values: InputValue<Fraction>[])
    constructor(...values: Vector[] | InputValue<Fraction>[]) {
        // Initialize the vector
        if (values.length > 0) {
            this.parse(...values)
        }
    };

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get array(): Fraction[] {
        return this.#array
    }

    set array(value: Fraction[]) {
        this.#array = value
    }

    get x(): Fraction {
        return this.#array[0]
    }

    set x(value: Fraction | number | string) {
        this.#array[0] = new Fraction(value)
    }

    get y(): Fraction {
        return this.#array[1]
    }

    set y(value: Fraction | number | string) {
        this.#array[1] = new Fraction(value)
    }

    get z(): Fraction {
        if (this.dimension < 3) { throw new Error('Vector is not 3D') }
        return this.#array[2]
    }

    set z(value: Fraction | number | string) {
        if (this.dimension < 3) { throw new Error('Vector is not 3D') }
        this.#array[2] = new Fraction(value)
    }

    get asPoint(): boolean {
        return this.#asPoint
    }

    set asPoint(value: boolean) {
        this.#asPoint = value
    }


    get normSquare(): Fraction {
        // Get the norm square of the vector
        return this.array.reduce((acc, x) => acc.add(x.clone().pow(2)), new Fraction(0))
    }

    get norm(): number {
        return Math.sqrt(this.normSquare.value)
    }

    get tex(): string {
        if (this.#asPoint) {
            return `\\left(${this.array.map(x => x.tex).join(';')}\\right)`
        }

        return `\\begin{pmatrix} ${this.array.map(x => x.tex).join(' \\\\ ')} \\end{pmatrix}`
    }

    get display(): string {
        if (this.#asPoint) {
            return `(${this.array.map(x => x.display).join(';')})`
        }

        return `((${this.array.map(x => x.display).join(',')}))`
    }


    get dimension(): number {
        return this.array.length
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    get isNull(): boolean {
        return this.array.every(x => x.isZero())
    }

    static asTex(...values: string[]): string {
        return `\\begin{pmatrix} ${values.join(' \\\\ ')} \\end{pmatrix}`
    }
    static asDisplay(...values: string[]): string {
        return `((${values.join(',')}))`
    }

    public defineAsPoint(value?: boolean): this {
        this.#asPoint = value !== false
        return this
    }
    public parse(...values: Vector[] | InputValue<Fraction>[]): this {
        if (values.length === 0) {
            throw new Error(`Invalid value`)
        }

        if (values.length === 1) {
            if (values[0] instanceof Vector) {
                return values[0].clone() as this
            } else if (typeof values[0] === 'string') {
                return this.#parseString(values[0])
            } else {
                throw new Error(`Invalid value`)
            }
        }

        // Two values are given
        if (values.length === 2) {
            const [A, B] = values

            // The two values are vectors
            if (A instanceof Vector && B instanceof Vector) {
                if (A.dimension !== B.dimension) { throw new Error('Vectors must have the same dimension') }

                this.#array = B.array.map((x, index) => x.clone().subtract(A.array[index]))
                return this
            }
        }

        // Two ore more values as number, string, fraction...
        this.#array = values.map(x => new Fraction(x as InputValue<Fraction>))

        return this
    }

    public clone(): Vector {
        const V = new Vector()
        V.array = this.copy()
        V.asPoint = this.asPoint
        return V
    }

    public copy(): Fraction[] {
        return this.array.map(x => x.clone())
    }

    zero = (): this => {
        this.array.forEach(x => x.zero())
        return this
    }

    one = (): this => {
        this.array.forEach((x, index) => index === 1 ? x.one() : x.zero())
        return this
    }

    opposite = (): this => {
        this.array.forEach(x => x.opposite())
        return this
    }

    add = (V: Vector): this => {
        this.array.forEach((x, index) => x.add(V.array[index]))
        return this
    }

    subtract = (V: Vector): this => {
        return this.add(V.clone().opposite())
    }

    unit = (): this => {
        const norm = this.norm
        if (norm === 0) {
            return this
        }

        return this.divideByScalar(norm)
    }

    middleOf(V1: Vector, V2: Vector): this {
        if (V1.dimension !== V2.dimension) { throw new Error('Vectors must be the same dimension') }

        this.array = []
        V1.array.forEach((x, index) => {
            this.array.push(x.clone().add(V2.array[index]).divide(2))
        })

        return this
    }

    translate(...values: Fraction[]): this {
        this.array.forEach((x, index) => x.add(values[index]))
        return this
    }


    dot = (V: Vector): Fraction => {
        return dotProduct(this, V)
    }

    cross(value: Vector): Vector {
        if (this.dimension !== 3 || value.dimension !== 3) {
            throw new Error('Cross product can only be determined in 3D')
        }

        return new Vector(
            this.y.clone().multiply(value.z).subtract(this.z.clone().multiply(value.y)),
            this.z.clone().multiply(value.x).subtract(this.x.clone().multiply(value.z)),
            this.x.clone().multiply(value.y).subtract(this.y.clone().multiply(value.x))
        )
    }

    normal = (): this => {
        if (this.dimension >= 3) { throw new Error('Normal vector can only be determined in 2D') }

        const x = this.x.clone().opposite(),
            y = this.y.clone()
        this.#array[0] = y
        this.#array[1] = x
        return this
    }

    isEqual = (v: Vector): boolean => {
        return areVectorsEquals(this, v)
    }

    isColinearTo = (v: Vector): boolean => {
        return areVectorsColinears(this, v)
    }

    isNormalTo = (v: Vector): boolean => {
        return this.dot(v).isZero()
    }

    multiplyByScalar = (k: InputValue<Fraction>): this => {
        const scalar = new Fraction(k)
        this.array.forEach(x => x.multiply(scalar))
        return this
    }

    divideByScalar = (k: InputValue<Fraction>): this => {
        return this.multiplyByScalar(new Fraction(k).inverse())
    }

    simplify = (): this => {
        // Multiply by the lcm of denominators.
        return this
            .multiplyByScalar(
                Numeric.lcm(...this.array.map(x => x.denominator))
            )
            .divideByScalar(
                Numeric.gcd(...this.array.map(x => x.numerator))
            ).
            multiplyByScalar(
                this.x.isNegative() ? -1 : 1
            )
    }

    angle = (V: Vector, sharp?: boolean, radian?: boolean): number => {

        let scalar = this.dot(V).value
        if (sharp) {
            scalar = Math.abs(scalar)
        }

        const toDegree = radian ? 1 : 180 / Math.PI

        return toDegree * Math.acos(scalar / (this.norm * V.norm))
    }

    #parseString = (value: string): this => {
        // Remove the first letter if it's a bracket.
        if (value.startsWith('(')) {
            value = value.substring(1)
        }
        // Remove the last letter if it's a bracket.
        if (value.endsWith(')')) {
            value = value.substring(0, value.length - 1)
        }

        // Split comma, semi colon or single space.
        const components = value.split(/[,;\s]/g)
            .filter((v) => v.trim() !== '')

        // there must be at least two components.
        if (components.length < 2) {
            return this
        }

        // Validate the fraction values.
        this.#array = components.map(x => new Fraction(x))
        return this
    }

    distanceTo(item: Vector): { value: number, fraction: Fraction, tex: string } {
        const V = new Vector(this, item)

        return {
            value: V.norm,
            fraction: V.normSquare,
            tex: V.tex
        }
    }
}
