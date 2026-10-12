/**
 * Vector module — N-dimensional vector with exact Fraction coordinates.
 * @module Vector
 */
import type {InputAlgebra, InputValue, IPiMathObject} from "../pimath.interface"
import {Polynom} from "../algebra/polynom"
import {Fraction} from "../coefficients"
import {Numeric} from "../numeric"
import {areVectorsColinears, areVectorsEquals, dotProduct} from "./geomMath"
import {DimensionError, InvalidArgumentError, MathError, ParseError} from "../errors"
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

    parse(...values: (Vector | Point)[] | InputValue<Fraction>[]): this {
        if (values.length === 0) {
            throw new InvalidArgumentError(`Invalid value`)
        }

        if (values.length === 1) {
            if (values[0] instanceof TupleN) {
                return this.copy(values[0])
            }

            if (typeof values[0] === 'string') {
                return this.copy(Vector.fromString(values[0]))
            }

            throw new InvalidArgumentError(`Invalid value`)
        }

        // Two TupleN arguments: build vector AB = B − A
        if (values.length === 2) {
            const [A, B] = values

            if (A instanceof TupleN && B instanceof TupleN) {
                if (A.dimension !== B.dimension) {
                    throw new DimensionError('Vectors must have the same dimension')
                }

                this.array = B.array.map((x, index) => x.clone().subtract(A.array[index]))
                return this
            }
        }

        // Two or more scalar values — reject any remaining TupleN
        if (values.some(x => x instanceof TupleN)) {
            throw new InvalidArgumentError('Creating a vector from multiple arguments requires scalar inputs')
        }
        const coords = values.map(x => new Fraction(x as InputValue<Fraction>))
        if (coords.some(x => x.isNaN())) {
            throw new ParseError('The given values are not valid coordinates')
        }
        this.array = coords
        return this
    }

    clone(): Vector {
        return new Vector(...this.cloneCoordinates())
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

    add(V: Vector): this {
        this.array = this.cloneCoordinates().map((x, index) => x.add(V.array[index]))
        return this
    }

    /**
     * Angle between two vectors, in degrees by default.
     * @param sharp return the acute angle (absolute value of the dot product)
     * @param radian return radians instead of degrees
     * @throws {MathError} if one of the vectors is the zero vector (the angle is undefined)
     */
    angle(V: Vector, sharp?: boolean, radian?: boolean): number {
        const norms = this.norm * V.norm
        if (norms === 0) {
            throw new MathError('The angle with a zero vector is undefined')
        }

        let scalar = this.dot(V).value
        if (sharp) {
            scalar = Math.abs(scalar)
        }

        const toDegree = radian ? 1 : 180 / Math.PI

        // Rounding can push the ratio of colinear vectors just outside [-1; 1], where acos gives NaN.
        return toDegree * Math.acos(Math.max(-1, Math.min(1, scalar / norms)))
    }

    /**
     * @throws {DimensionError} if either vector is not 3-dimensional
     */
    cross(value: Vector): Vector {
        if (this.dimension !== 3 || value.dimension !== 3) {
            throw new DimensionError('Cross product can only be determined in 3D')
        }

        return new Vector(
            this.y.clone().multiply(value.z).subtract(this.z.clone().multiply(value.y)),
            this.z.clone().multiply(value.x).subtract(this.x.clone().multiply(value.z)),
            this.x.clone().multiply(value.y).subtract(this.y.clone().multiply(value.x))
        )
    }

    // ------------------------------------------
    // Creation / parsing functions

    divideByScalar(k: InputValue<Fraction>): this {
        return this.multiplyByScalar(new Fraction(k).inverse())
    }

    dot(V: Vector | Point): Fraction {
        return dotProduct(this, V)
    }

    /**
     * Accepts `((x,y,...))`, `(x;y;...)`, or `x,y,...` format.
     * @throws {ParseError} if fewer than 2 components are found
     */
    static fromString(value: string): Vector {
        const v = new Vector()
        if (value.startsWith('((') && value.endsWith('))')) {
            v.array = TupleN.parseString(value.slice(1, -1))
        } else {
            v.array = TupleN.parseString(value)
        }
        return v
    }

    static fromPolynom(expr: InputAlgebra<Polynom>, vectors: Record<string, Vector | string>): Vector {
        const poly = expr instanceof Polynom ? expr : new Polynom(expr)

        const resolved: Record<string, Vector> = {}
        for (const [key, val] of Object.entries(vectors)) {
            resolved[key] = val instanceof Vector ? val : Vector.fromString(val)
        }

        const dims = Object.values(resolved).map(v => v.dimension)
        if (dims.length === 0) throw new InvalidArgumentError('No vectors provided')
        if (new Set(dims).size > 1) throw new DimensionError('All vectors must have the same dimension')

        const result = new Vector(...Array.from({length: dims[0]}, () => 0))

        for (const monom of poly.monoms) {
            const vars = monom.variables
            if (vars.length === 0) {
                if (!monom.coefficient.isZero()) {
                    throw new InvalidArgumentError('Constant term has no associated vector')
                }
                continue
            }
            if (vars.length > 1 || monom.degree().value !== 1) {
                throw new InvalidArgumentError(`Monom is not a simple linear term: ${monom.display}`)
            }
            const varName = vars[0]
            if (!(varName in resolved)) {
                throw new InvalidArgumentError(`No vector provided for variable '${varName}'`)
            }
            result.add(resolved[varName].clone().multiplyByScalar(monom.coefficient))
        }

        return result
    }

    isColinearTo(v: Vector): boolean {
        return areVectorsColinears(this, v)
    }

    isEqual(v: Vector): boolean {
        return areVectorsEquals(this, v)
    }

    isNormalTo(v: Vector): boolean {
        return this.dot(v).isZero()
    }

    // ------------------------------------------
    isOne(): boolean {
        return this.array.every((x, index) => index === 0 ? x.isOne() : x.isZero())
    }

    multiplyByScalar(k: InputValue<Fraction>): this {
        const scalar = new Fraction(k)
        this.array = this.cloneCoordinates().map(x => x.multiply(scalar))
        return this
    }

    /**
     * Rotates 90° to obtain a perpendicular vector: `(x, y) → (y, −x)`.
     * @throws {DimensionError} if the vector is not 2-dimensional
     */
    normal(): this {
        if (this.dimension >= 3) {
            throw new DimensionError('Normal vector can only be determined in 2D')
        }

        const x = this.x.clone().opposite()
        const y = this.y.clone()

        this.x = y
        this.y = x
        return this
    }

    one(): this {
        this.zero()
        this.x.one()
        return this
    }

    simplify(): this {
        const lcm = Numeric.lcm(...this.array.map(x => x.denominator))
        const gcd = Numeric.gcd(...this.array.map(x => x.numerator))

        this.multiplyByScalar(new Fraction(lcm, gcd))

        if(this.x.isNegative()) this.opposite()

        return this
    }

    subtract(V: Vector): this {
        return this.add(V.clone().opposite())
    }

    translate(...values: Fraction[]): this {
        this.array = this.cloneCoordinates().map((x, index) => x.add(values[index]))
        return this
    }

    unit(): this {
        const norm = this.norm
        if (norm === 0) {
            return this
        }

        return this.divideByScalar(norm)
    }

}
