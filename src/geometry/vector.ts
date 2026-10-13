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

/**
 * A vector of the plane or of space, with exact coordinates. Built from numbers (`new Vector(3, 4)`), from a
 * string (`"(3;4)"`), from another vector or point, or from two points: `new Vector(A, B)` is the vector `AB`.
 * @example
 * new Vector(new Point(1, 2), new Point(4, 6)).display // "((3,4))"
 */
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

    /**
     * Replace the coordinates with numbers, a string, a vector or a point, or with the vector from one point
     * to another.
     * @throws {InvalidArgumentError} if the arguments are not valid.
     * @throws {DimensionError} if two points have different dimensions.
     * @throws {ParseError} if a value is not a number.
     */
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
        // direct assignment: the constructor would rebuild the coordinates and drop their display state
        const v = new Vector()
        v.array = this.cloneCoordinates()
        return v
    }

    get tex(): string {
        return `\\begin{pmatrix} ${this.array.map(x => x.tex).join(' \\\\ ')} \\end{pmatrix}`
    }

    get display(): string {
        return `((${this.array.map(x => x.display).join(',')}))`
    }

    /**
     * Text form of a vector from already written coordinates: `asDisplay("x", "y")` is `((x,y))`.
     */
    static asDisplay(...values: string[]): string {
        return `((${values.join(',')}))`
    }

    /**
     * LaTeX form of a vector from already written coordinates.
     */
    static asTex(...values: string[]): string {
        return `\\begin{pmatrix} ${values.join(' \\\\ ')} \\end{pmatrix}`
    }

    /**
     * Add a vector of the same dimension.
     */
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
     * Cross product, as a new vector.
     * @throws {DimensionError} if either vector is not 3-dimensional.
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

    /**
     * Divide every coordinate by a number.
     */
    divideByScalar(k: InputValue<Fraction>): this {
        return this.multiplyByScalar(new Fraction(k).inverse())
    }

    /**
     * Dot product, as an exact fraction.
     */
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

    /**
     * Build the linear combination written by a polynom: `fromPolynom("2a-b", {a: "(1;0)", b: "(0;1)"})` is `(2;-1)`.
     * @param vectors - the vector (or its string) of each variable.
     * @throws {InvalidArgumentError} if the polynom has a constant term, a term that is not linear, or a variable without vector.
     * @throws {DimensionError} if the vectors have different dimensions.
     */
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

    /**
     * True when both vectors are parallel (one is a multiple of the other).
     */
    isColinearTo(v: Vector): boolean {
        return areVectorsColinears(this, v)
    }

    /**
     * True when both vectors have the same coordinates.
     */
    isEqual(v: Vector): boolean {
        return areVectorsEquals(this, v)
    }

    /**
     * True when the vectors are perpendicular: their dot product is zero.
     */
    isNormalTo(v: Vector): boolean {
        return this.dot(v).isZero()
    }

    // ------------------------------------------
    /**
     * True for the vector `(1, 0, ...)`, which {@link one} produces.
     */
    isOne(): boolean {
        return this.array.every((x, index) => index === 0 ? x.isOne() : x.isZero())
    }

    /**
     * Multiply every coordinate by a number.
     */
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

    /**
     * Set the vector to `(1, 0, ...)`.
     */
    one(): this {
        this.zero()
        this.x.one()
        return this
    }

    /**
     * Scale the vector to the smallest integer coordinates with no common divisor, and make the first coordinate
     * positive. The direction is kept.
     */
    simplify(): this {
        const lcm = Numeric.lcm(...this.array.map(x => x.denominator))
        const gcd = Numeric.gcd(...this.array.map(x => x.numerator))

        this.multiplyByScalar(new Fraction(lcm, gcd))

        if(this.x.isNegative()) this.opposite()

        return this
    }

    /**
     * Subtract a vector of the same dimension.
     */
    subtract(V: Vector): this {
        return this.add(V.clone().opposite())
    }

    /**
     * Add the given values to the coordinates, one per coordinate.
     */
    translate(...values: Fraction[]): this {
        this.array = this.cloneCoordinates().map((x, index) => x.add(values[index]))
        return this
    }

    /**
     * Divide by the norm. The norm is a decimal number, so the result is exact only when it is rational.
     * The zero vector is left as it is.
     */
    unit(): this {
        const norm = this.norm
        if (norm === 0) {
            return this
        }

        return this.divideByScalar(norm)
    }

}
