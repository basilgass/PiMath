/**
 * Vector2D module contains everything necessary to handle 2d vectors.
 * @module Vector
 */
import type {InputValue, IPiMathObject} from "../pimath.interface"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import {areVectorsColinears, areVectorsEquals, dotProduct} from "./geomMath"
import {TupleN} from "./TupleN"
import {type Point} from "./point"

export class Vector extends TupleN implements IPiMathObject<Vector> {
    constructor(...values: (Vector | Point)[] | InputValue<Fraction>[]) {
        super()

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    };

    // ------------------------------------------
    // Getter and setter

    public parse(...values: (Vector | Point)[] | InputValue<Fraction>[]): this {
        if (values.length === 0) {
            throw new Error(`Invalid value`)
        }

        if (values.length === 1) {
            if (values[0] instanceof TupleN) {
                this.array = values[0].copy()
                return this
            }

            if (typeof values[0] === 'string') {
                return this.fromString(values[0])
            }

            throw new Error(`Invalid value`)
        }

        // Two values are given
        if (values.length === 2) {
            const [A, B] = values

            // The two values are vectors
            if (A instanceof TupleN && B instanceof TupleN) {
                if (A.dimension !== B.dimension) {
                    throw new Error('Vectors must have the same dimension')
                }

                this.array = B.array.map((x, index) => x.clone().subtract(A.array[index]))
                return this
            }
        }

        // Two ore more values as number, string, fraction...
        this.array = values.map(x => new Fraction(x as InputValue<Fraction>))
        return this
    }

    public clone(): Vector {
        return new Vector(...this.copy())
    }

    get tex(): string {
        return `\\begin{pmatrix} ${this.array.map(x => x.tex).join(' \\\\ ')} \\end{pmatrix}`
    }

    get display(): string {
        return `((${this.array.map(x => x.display).join(',')}))`
    }

    static asDisplay(...values: string[]): string {
        return `((${values.join(',')}))`
    }

    static asTex(...values: string[]): string {
        return `\\begin{pmatrix} ${values.join(' \\\\ ')} \\end{pmatrix}`
    }

    add = (V: Vector): this => {
        this.array.forEach((x, index) => x.add(V.array[index]))
        return this
    }

    angle = (V: Vector, sharp?: boolean, radian?: boolean): number => {

        let scalar = this.dot(V).value
        if (sharp) {
            scalar = Math.abs(scalar)
        }

        const toDegree = radian ? 1 : 180 / Math.PI

        return toDegree * Math.acos(scalar / (this.norm * V.norm))
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

    // ------------------------------------------
    // Creation / parsing functions

    divideByScalar = (k: InputValue<Fraction>): this => {
        return this.multiplyByScalar(new Fraction(k).inverse())
    }

    dot = (V: Vector |Point): Fraction => {
        return dotProduct(this, V)
    }

    override fromString(value: string): this {
        if (value.startsWith('((') && value.endsWith('))')) {
            return super.fromString(value.slice(1, -1))
        }

        return super.fromString(value)
    }

    isColinearTo = (v: Vector): boolean => {
        return areVectorsColinears(this, v)
    }

    isEqual = (v: Vector): boolean => {
        return areVectorsEquals(this, v)
    }

    isNormalTo = (v: Vector): boolean => {
        return this.dot(v).isZero()
    }

    // ------------------------------------------
    get isNull(): boolean {
        return this.array.every(x => x.isZero())
    }

    isOne(): boolean {
        return this.array.every((x, index) => index === 0 ? x.isOne() : x.isZero())
    }

    isZero(): boolean {
        return this.array.every(x => x.isZero())
    }

    multiplyByScalar = (k: InputValue<Fraction>): this => {
        const scalar = new Fraction(k)
        this.array.forEach(x => x.multiply(scalar))
        return this
    }

    get norm(): number {
        return Math.sqrt(this.normSquare.value)
    }

    get normSquare(): Fraction {
        // Get the norm square of the vector
        return this.array.reduce((acc, x) => acc.add(x.clone().pow(2)), new Fraction(0))
    }

    normal = (): this => {
        if (this.dimension >= 3) {
            throw new Error('Normal vector can only be determined in 2D')
        }

        const x = this.x.clone().opposite()
        const y = this.y.clone()

        this.array[0] = y
        this.array[1] = x
        return this
    }

    one = (): this => {
        this.zero()
        this.x.one()
        return this
    }

    opposite = (): this => {
        this.array.forEach(x => x.opposite())
        return this
    }

    simplify = (): this => {
        // Multiply by the lcm of denominators.
        return this
            .multiplyByScalar(
                Numeric.lcm(...this.array.map(x => x.denominator))
            )
            .divideByScalar(
                Numeric.gcd(...this.array.map(x => x.numerator))
            ).multiplyByScalar(
                this.x.isNegative() ? -1 : 1
            )
    }

    subtract = (V: Vector): this => {
        return this.add(V.clone().opposite())
    }

    translate(...values: Fraction[]): this {
        this.array.forEach((x, index) => x.add(values[index]))
        return this
    }

    unit = (): this => {
        const norm = this.norm
        if (norm === 0) {
            return this
        }

        return this.divideByScalar(norm)
    }

}
