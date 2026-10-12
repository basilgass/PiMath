import {Equation} from "../algebra/equation"
import {Polynom} from "../algebra/polynom"
import {Fraction} from "../coefficients/fraction"
import {Root} from "../coefficients/root"
import {Line3} from "./line3"
import {Point} from "./point"
import {Vector} from "./vector"
import type {IDisplayDigits, InputAlgebra, IPiMathObject, OutputStyle, Plane3Config, PlaneLineIntersection, PlanePlaneIntersection} from "../pimath.interface"
import {DimensionError, ParseError} from "../errors"
import {assertDigits} from "../helpers"


export class Plane3 implements IPiMathObject<Plane3>, IDisplayDigits {
    #normal: Vector = new Vector(0, 0, 1)
    #point: Point = new Point(0, 0, 0)
    #digits: number | null = null

    constructor(config?: Plane3Config) {
        if (config) {
            this.parse(config)
        }
    }

    // ------------------------------------------
    // Static factory methods

    static fromPointAndNormal(point: Point, normal: Vector): Plane3 {
        const p = new Plane3()
        p.#point = new Point(point)
        p.#normal = new Vector(normal)
        return p
    }

    static fromPointAndDirections(point: Point, v1: Vector, v2: Vector): Plane3 {
        const p = new Plane3()
        p.#point = new Point(point)
        p.#normal = v1.cross(v2)
        return p
    }

    /**
     * Builds a plane from a cartesian equation (string or Equation).
     */
    static fromEquation(value: InputAlgebra<Equation>): Plane3 {
        const cartesian = new Equation(value).moveLeft().reduce().left

        const a = cartesian.monomByVariable('x').coefficient
        const b = cartesian.monomByVariable('y').coefficient
        const c = cartesian.monomByVariable('z').coefficient
        const d = cartesian.monomByDegree(0).coefficient

        const p = new Plane3()
        p.#normal = new Vector(a, b, c)

        if (a.isNotZero()) {
            p.#point = new Point(d.clone().divide(a).opposite(), 0, 0)
        } else if (b.isNotZero()) {
            p.#point = new Point(0, d.clone().divide(b).opposite(), 0)
        } else {
            p.#point = new Point(0, 0, d.clone().divide(c).opposite())
        }
        return p
    }

    static fromString(str: string): Plane3 {
        return Plane3.fromEquation(str)
    }

    static fromPoints(A: Point, B: Point, C: Point): Plane3 {
        const p = new Plane3()
        const AB = new Vector(A, B)
        const AC = new Vector(A, C)
        p.#normal = AB.cross(AC)
        p.#point = new Point(A)
        return p
    }

    /**
     * Builds a plane from four cartesian coefficients `[a, b, c, d]` where the
     * equation is `ax + by + cz + d = 0`.
     */
    static fromCoefficients(a: number, b: number, c: number, d: number): Plane3 {
        const fa = new Fraction(a)
        const fb = new Fraction(b)
        const fc = new Fraction(c)
        const fd = new Fraction(d)

        const p = new Plane3()
        p.#normal = new Vector(fa, fb, fc)

        if (fa.isNotZero()) {
            p.#point = new Point(fd.clone().divide(fa).opposite(), 0, 0)
        } else if (fb.isNotZero()) {
            p.#point = new Point(0, fd.clone().divide(fb).opposite(), 0)
        } else {
            p.#point = new Point(0, 0, fd.clone().divide(fc).opposite())
        }
        return p
    }

    // ------------------------------------------
    // parse / copy / clone

    /**
     * Routes a {@link Plane3Config} to the appropriate static factory method.
     * @throws {ParseError} if no valid property combination is found in `config`
     */
    parse(config: Plane3Config): this {
        if (config.point && config.normal) {
            return this.copy(Plane3.fromPointAndNormal(config.point, config.normal))
        }

        if (config.point && config.directions?.length === 2) {
            const [v1, v2] = config.directions
            return this.copy(Plane3.fromPointAndDirections(config.point, v1, v2))
        }

        if (config.equation) {
            return this.copy(Plane3.fromEquation(config.equation))
        }

        if (config.points?.length === 3 && config.points.every(pt => pt instanceof Point)) {
            const [A, B, C] = config.points
            return this.copy(Plane3.fromPoints(A, B, C))
        }

        if (config.coefficients?.length === 4) {
            const [a, b, c, d] = config.coefficients
            return this.copy(Plane3.fromCoefficients(a, b, c, d))
        }

        throw new ParseError('Cannot parse Plane3Config: no valid combination of properties found')
    }

    copy(value: Plane3): this {
        this.#normal = value.#normal.clone()
        this.#point = value.#point.clone()
        return this
    }

    clone(): this {
        const cloned = new Plane3() as this
        cloned.#normal = this.#normal.clone()
        cloned.#point = this.#point.clone()
        cloned.#digits = this.#digits
        return cloned
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#digits = assertDigits(digits)
        this.#normal.withDigits(digits)
        this.#point.withDigits(digits)
        return this
    }

    // ------------------------------------------
    // Output

    #toOutput(style: OutputStyle): string {
        const eq = new Equation(
            new Polynom('xyz', this.a, this.b, this.c, this.d),
            new Polynom(0)
        ).reduce().withDigits(this.#digits)
        return style === 'tex' ? eq.tex : eq.display
    }

    get tex(): string { return this.#toOutput('tex') }

    get display(): string { return this.#toOutput('display') }

    // ------------------------------------------
    // Coefficient accessors (cartesian equation: ax + by + cz + d = 0)

    get a(): Fraction { return this.#normal.x }

    get b(): Fraction { return this.#normal.y }

    get c(): Fraction { return this.#normal.z }

    /** `d` such that `n·p + d = 0` for any point `p` on the plane. */
    get d(): Fraction { return this.#normal.dot(this.#point).opposite() }

    // ------------------------------------------
    // Geometric properties

    get normal(): Vector { return this.#normal }

    set normal(value: Vector) { this.#normal = new Vector(value) }

    get point(): Point { return this.#point }

    set point(value: Point | Vector) { this.#point = new Point(value) }

    // ------------------------------------------
    // Operations

    /**
     * Angle between this plane and another plane, line, or vector.
     * - `Plane3` → dihedral angle (angle between normals).
     * - `Line3` / `Vector` → angle between the line/vector and the plane
     *   (complement of the angle with the normal).
     * @throws {DimensionError} if `value` is a `Vector` that is not 3D
     */
    angle(vector: Vector, sharp?: boolean, radian?: boolean): number
    angle(line: Line3, sharp?: boolean, radian?: boolean): number
    angle(plane: Plane3, sharp?: boolean, radian?: boolean): number
    angle(value: Plane3 | Line3 | Vector, sharp?: boolean, radian?: boolean): number {
        if (value instanceof Plane3) {
            return this.normal.angle(value.normal, sharp, radian)
        }

        let direction: Vector
        if (value instanceof Vector) {
            if (value.dimension !== 3) {
                throw new DimensionError('Vector is not 3D')
            }
            direction = value
        } else {
            direction = value.direction
        }

        const a90 = radian ? Math.PI / 2 : 90
        return a90 - this.normal.angle(direction, true, radian)
    }

    /** Euclidean distance from a point to this plane, as an exact `Root`. */
    distanceTo(point: Point): Root {
        const numer = this.normal.dot(point).add(this.d).abs()
        const normSquare = this.#normal.normSquare
        return new Root().from(2, normSquare.inverse(), numer).reduce()
    }

    /**
     * Intersection of this plane with a line.
     * - `hasIntersection`: line meets the plane at exactly one point.
     * - `isOnPlane`: line lies entirely on the plane (direction ⊥ normal AND base point satisfies the equation).
     * - `isParallel`: direction ⊥ normal but base point is NOT on the plane.
     */
    intersectWithLine(line: Line3): PlaneLineIntersection {
        const {point, direction} = line
        const nDotD = this.normal.dot(direction)

        if (nDotD.isZero()) {
            const isOnPlane = this.isPointOnPlane(point)
            return {point: null, hasIntersection: false, isParallel: !isOnPlane, isOnPlane}
        }

        const t = this.normal.dot(point).add(this.d).divide(nDotD.opposite())
        const pt = new Point(new Vector(point).add(direction.clone().multiplyByScalar(t)))
        return {point: pt, hasIntersection: true, isParallel: false, isOnPlane: false}
    }

    /**
     * Intersection of this plane with another plane.
     * - `hasIntersection`: planes meet in a unique line.
     * - `isEqual`: planes are the same (infinitely many common points).
     * - `isParallel`: planes are parallel but distinct.
     */
    intersectWithPlane(plane: Plane3): PlanePlaneIntersection {
        if (this.#normal.isColinearTo(plane.normal)) {
            const equal = this.isEqual(plane)
            return {line: null, hasIntersection: false, isParallel: !equal, isEqual: equal}
        }

        const direction = this.#normal.cross(plane.normal)
        const [a1, b1, c1, d1] = [this.a, this.b, this.c, this.d]
        const [a2, b2, c2, d2] = [plane.a, plane.b, plane.c, plane.d]
        // rhs: ax + by + cz = -d  after moving d to the right
        const r1 = d1.clone().opposite()
        const r2 = d2.clone().opposite()

        let pt: Point
        const ax = Math.abs(direction.x.value)
        const ay = Math.abs(direction.y.value)
        const az = Math.abs(direction.z.value)

        if (az >= ax && az >= ay) {
            // Fix z = 0 ; det = a₁b₂ − a₂b₁ = direction.z
            const det = direction.z
            const x = r1.clone().multiply(b2).subtract(b1.clone().multiply(r2)).divide(det)
            const y = a1.clone().multiply(r2).subtract(a2.clone().multiply(r1)).divide(det)
            pt = new Point(x, y, 0)
        } else if (ay >= ax) {
            // Fix y = 0 ; det = a₁c₂ − a₂c₁ = −direction.y
            const det = direction.y.clone().opposite()
            const x = r1.clone().multiply(c2).subtract(c1.clone().multiply(r2)).divide(det)
            const z = a1.clone().multiply(r2).subtract(a2.clone().multiply(r1)).divide(det)
            pt = new Point(x, 0, z)
        } else {
            // Fix x = 0 ; det = b₁c₂ − b₂c₁ = direction.x
            const det = direction.x
            const y = r1.clone().multiply(c2).subtract(c1.clone().multiply(r2)).divide(det)
            const z = b1.clone().multiply(r2).subtract(b2.clone().multiply(r1)).divide(det)
            pt = new Point(0, y, z)
        }

        return {line: new Line3(pt, direction), hasIntersection: true, isParallel: false, isEqual: false}
    }

    isPointOnPlane(pt: Point): boolean {
        return this.normal.dot(pt).add(this.d).isZero()
    }

    isParallelTo(plane: Plane3): boolean
    isParallelTo(line: Line3): boolean
    isParallelTo(value: Plane3 | Line3): boolean {
        if (value instanceof Plane3) return this.normal.isColinearTo(value.normal)
        return this.normal.dot(value.direction).isZero()
    }

    isPerpendicularTo(plane: Plane3): boolean
    isPerpendicularTo(line: Line3): boolean
    isPerpendicularTo(value: Plane3 | Line3): boolean {
        if (value instanceof Plane3) return this.normal.dot(value.normal).isZero()
        return this.normal.isColinearTo(value.direction)
    }

    /** Reduces `a`, `b`, `c` (and implicitly `d`) by their GCD. */
    simplify(): this {
        this.#normal.simplify()
        return this
    }

    isEqual(plane: Plane3): boolean {
        return this.normal.isColinearTo(plane.normal) && this.isPointOnPlane(plane.point)
    }

    /** Orthogonal projection of `pt` onto this plane. */
    project(pt: Point): Point {
        const n2 = this.#normal.dot(this.#normal)
        const t = this.#normal.dot(pt).add(this.d).divide(n2)
        return new Point(
            new Vector(pt).subtract(this.#normal.clone().multiplyByScalar(t))
        )
    }

    /** Reflection of `pt` through this plane (`proj` is the midpoint of `[pt, reflect(pt)]`). */
    reflect(pt: Point): Point {
        const displacement = new Vector(pt, this.project(pt))
        return new Point(new Vector(pt).add(displacement.multiplyByScalar(2)))
    }
}
