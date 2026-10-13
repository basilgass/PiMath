/**
 * A line in 3D space, defined by a base point OA and a direction vector d.
 * Supports parametric, system, and Cartesian output modes via chainable `as***` getters.
 */

import {Fraction} from "../coefficients/fraction"
import {Root} from "../coefficients/root"
import {Polynom} from "../algebra/polynom"
import {Monom} from "../algebra/monom"
import {randomIntSym} from "../randomization/rndHelpers"
import {Vector} from "./vector"
import {Point} from "./point"
import {type IDisplayDigits, type IPiMathObject, type LineIntersection, type OutputStyle} from "../pimath.interface"
import {assertDigits} from "../helpers"

enum Line3Display {
    PARAMETRIC,
    SYSTEM,
    CARTESIAN
}

/**
 * A line of space, stored by a point `OA` and a direction vector `d`. Built from two points or from a point and
 * a direction vector. The output defaults to the parametric form; {@link asSystem} and {@link asCartesian} choose
 * another one for the next `tex` or `display` only.
 * @example
 * new Line3(new Point(0, 0, 0), new Vector(1, 2, 3)).display // "((x,y,z)) = ((0,0,0)) + k\\cdot ((1,2,3))"
 */
export class Line3 implements IPiMathObject<Line3>, IDisplayDigits {
    #OA: Point = new Point()
    #d: Vector = new Vector()
    #outputMode: Line3Display = Line3Display.PARAMETRIC
    #digits: number | null = null

    /** Creates an empty line, or a line through two points, or a line through a point with a direction. */
    constructor()
    constructor(A: Point, B: Point)
    constructor(A: Point, d: Vector)
    constructor(A?: Point, d?: Vector | Point) {
        if (A !== undefined && d !== undefined) {
            if (d instanceof Point) {
                this.parse(A, d)
            } else {
                this.parse(A, d)
            }
        }
        return this
    }

    // ------------------------------------------
    // Static factories

    /**
     * The line through two points.
     */
    static fromPoints(A: Point, B: Point): Line3 {
        const line = new Line3()
        line.#OA = A.clone()
        line.#d = new Vector(A, B)
        return line
    }

    /**
     * The line through a point with a direction vector.
     */
    static fromPointAndDirection(A: Point, d: Vector): Line3 {
        const line = new Line3()
        line.#OA = A.clone()
        line.#d = d.clone()
        return line
    }

    // ------------------------------------------
    // parse / copy / clone

    /**
     * Replace the line with the line through two points, or through a point with a direction vector.
     */
    parse(A: Point, B: Point): this
    parse(A: Point, d: Vector): this
    parse(A: Point, Bd: Point | Vector): this {
        if (Bd instanceof Point) return this.copy(Line3.fromPoints(A, Bd))
        return this.copy(Line3.fromPointAndDirection(A, Bd))
    }

    copy(value: Line3): this {
        this.#OA = value.#OA.clone()
        this.#d = value.#d.clone()
        this.#outputMode = Line3Display.PARAMETRIC
        return this
    }

    clone(): this {
        const cloned = new Line3() as this
        cloned.#OA = this.#OA.clone()
        cloned.#d = this.#d.clone()
        cloned.#outputMode = this.#outputMode
        cloned.#digits = this.#digits
        return cloned
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#digits = assertDigits(digits)
        this.#OA.withDigits(digits)
        this.#d.withDigits(digits)
        return this
    }

    // ------------------------------------------
    // Output mode selectors

    /**
     * Output option for the next `tex` or `display`: a point and a direction vector (default). Chainable.
     */
    get asParametric(): this {
        this.#outputMode = Line3Display.PARAMETRIC
        return this
    }

    /**
     * Output option for the next `tex` or `display`: the parametric system of `x`, `y` and `z`. Chainable.
     */
    get asSystem(): this {
        this.#outputMode = Line3Display.SYSTEM
        return this
    }

    /**
     * Output option for the next `tex` or `display`: the symmetric form `(x-a)/p = (y-b)/q = (z-c)/r`. Chainable.
     */
    get asCartesian(): this {
        this.#outputMode = Line3Display.CARTESIAN
        return this
    }

    // ------------------------------------------
    // tex / display

    get tex(): string {
        const mode = this.#outputMode
        this.#outputMode = Line3Display.PARAMETRIC
        return this.#toOutput('tex', mode)
    }

    get display(): string {
        const mode = this.#outputMode
        this.#outputMode = Line3Display.PARAMETRIC
        return this.#toOutput('display', mode)
    }

    #toOutput(style: OutputStyle, mode: Line3Display): string {
        switch (mode) {
            case Line3Display.SYSTEM:
                return this.#toSystem(style)
            case Line3Display.CARTESIAN:
                return this.#toCartesian(style)
            default:
                return this.#toParametric(style)
        }
    }

    #toParametric(style: OutputStyle): string {
        if (style === 'tex') {
            return `${Vector.asTex('x', 'y', 'z')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex, this.#OA.z.tex)} + k\\cdot ${Vector.asTex(this.#d.x.tex, this.#d.y.tex, this.#d.z.tex)}`
        }
        return `${Vector.asDisplay('x', 'y', 'z')} = ${Vector.asDisplay(this.#OA.x.display, this.#OA.y.display, this.#OA.z.display)} + k\\cdot ${Vector.asDisplay(this.#d.x.display, this.#d.y.display, this.#d.z.display)}`
    }

    #toSystem(style: OutputStyle): string {
        const px = (new Polynom(this.#OA.x).add(new Monom(this.#d.x).multiply(new Monom('k')))).reorder('k', true).withDigits(this.#digits)
        const py = (new Polynom(this.#OA.y).add(new Monom(this.#d.y).multiply(new Monom('k')))).reorder('k', true).withDigits(this.#digits)
        const pz = (new Polynom(this.#OA.z).add(new Monom(this.#d.z).multiply(new Monom('k')))).reorder('k', true).withDigits(this.#digits)

        if (style === 'tex') {
            return `\\left\\{\\begin{aligned}\n    x &= ${px.tex}\\\\ \n    y &= ${py.tex}\\\\\n    z &= ${pz.tex}\n\\end{aligned}\\right.`
        }
        return `{(x,=,${px.display}),(y,=,${py.display}),(z,=,${pz.display}):}`
    }

    #toCartesian(style: OutputStyle): string {
        const d = this.#d.clone().simplify().withDigits(this.#digits)
        const coords = [
            {v: 'x', offset: this.#OA.x, di: d.x},
            {v: 'y', offset: this.#OA.y, di: d.y},
            {v: 'z', offset: this.#OA.z, di: d.z},
        ]

        if (style === 'tex') {
            return coords
                .map(({v, offset, di}) => `\\frac{ ${new Polynom(v, 1, offset.clone().opposite()).withDigits(this.#digits).tex} }{ ${di.tex} }`)
                .join(' = ')
        }
        return coords
            .map(({v, offset, di}) => `(${new Polynom(v, 1, offset.clone().opposite()).withDigits(this.#digits).display})/${di.display}`)
            .join(' = ')
    }

    // ------------------------------------------
    // Getters and setters

    /**
     * The reference point of the line. The getter returns the point itself, not a copy.
     */
    get OA(): Point {
        return this.#OA
    }

    set OA(value: Point) {
        this.#OA = value
    }

    /**
     * The direction vector (a copy, see {@link direction}). Setting it replaces the direction.
     */
    get d(): Vector {
        return this.direction
    }

    set d(value: Vector) {
        this.#d = value
    }

    /**
     * The direction vector, as a copy.
     */
    get direction(): Vector {
        return this.#d.clone()
    }

    /**
     * The reference point, as a copy.
     */
    get point(): Point {
        return this.#OA.clone()
    }

    // ------------------------------------------
    // Geometric methods

    /** Distance from this line to `pt`, as an exact `Root` (simplified radical). */
    distanceTo(pt: Point): Root {
        const AP = new Vector(this.#OA, pt)
        const d = this.direction
        const num2 = AP.cross(d).normSquare
        const d2 = d.normSquare
        return new Root().from(2, num2.clone().divide(d2)).reduce()
    }

    /** Returns true when this line intersects the closed segment [A, B]. */
    hitSegment(A: Point, B: Point): boolean {
        const iPt = this.intersection(
            new Line3(A, B)
        )

        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
                && iPt.point.z.value >= Math.min(A.z.value, B.z.value)
                && iPt.point.z.value <= Math.max(A.z.value, B.z.value)
        }
        return false
    }

    /**
     * Computes the relationship between this line and `line`.
     * - `isSame`: coincident lines (infinitely many common points).
     * - `isParallel`: parallel non-coincident lines.
     * - `hasIntersection` + `point`: lines meet at exactly one point.
     * - all false: skew lines (non-coplanar, no intersection).
     */
    intersection(line: Line3): LineIntersection {
        const isSame = this.isEqual(line)
        if (isSame) {
            return {point: null, hasIntersection: false, isParallel: false, isSame: true}
        }

        const isParallel = this.isParallelTo(line)
        if (isParallel) {
            return {point: null, hasIntersection: false, isParallel: true, isSame: false}
        }

        // Triple product (OB−OA) · (d1×d2): zero iff lines are coplanar (intersecting)
        const AP = new Vector(this.#OA, line.#OA)
        const cross = this.#d.cross(line.#d)
        if (!AP.dot(cross).isZero()) {
            return {point: null, hasIntersection: false, isParallel: false, isSame: false}
        }

        // t = ((OB−OA) × d2) · (d1×d2) / |d1×d2|²
        const t = AP.cross(line.#d).dot(cross).divide(cross.normSquare)
        const pt = new Point(
            this.#OA.x.clone().add(this.#d.x.clone().multiply(t)),
            this.#OA.y.clone().add(this.#d.y.clone().multiply(t)),
            this.#OA.z.clone().add(this.#d.z.clone().multiply(t))
        )
        return {point: pt, hasIntersection: true, isParallel: false, isSame: false}
    }

    /**
     * True when the point is on the line.
     */
    isPointOnLine(pt: Point): boolean {
        return new Vector(this.#OA, pt).isColinearTo(this.#d)
    }

    /**
     * True when both lines are the same line, whatever their reference point and direction vector.
     */
    isEqual(line: Line3): boolean {
        return this.#d.isColinearTo(line.#d) && this.isPointOnLine(line.#OA)
    }

    /**
     * True when the directions are parallel and the lines are not the same.
     */
    isParallelTo(line: Line3): boolean {
        return this.#d.isColinearTo(line.#d) && !this.isEqual(line)
    }

    /** Returns true when the direction vectors are orthogonal (90°), regardless of whether the lines intersect. */
    isOrthogonalTo(line: Line3): boolean {
        return this.#d.isNormalTo(line.#d)
    }

    /** Returns true when the lines are both orthogonal and intersecting (strict perpendicularity). */
    isPerpendicularTo(line: Line3): boolean {
        return this.isOrthogonalTo(line) && this.intersection(line).hasIntersection
    }

    /**
     * A random point of the line: the reference point moved along the direction vector by a non-zero integer
     * between `-max` and `max`.
     */
    randomPoint(max = 5): Point {
        const A = this.#OA.clone()
        const k = new Fraction(randomIntSym(max, false))

        return new Point(
            A.x.clone().add(this.#d.x.clone().multiply(k)),
            A.y.clone().add(this.#d.y.clone().multiply(k)),
            A.z.clone().add(this.#d.z.clone().multiply(k))
        )
    }

    /**
     * A random point close to the line but not on it.
     * @param k - same as `max` in {@link randomPoint}.
     */
    randomNearPoint(k?: number): Point {
        const pt = this.randomPoint(k)

        let maxIterationTest = 10
        while (this.isPointOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(randomIntSym(1, false))
            pt.y.add(randomIntSym(1, false))
            pt.z.add(randomIntSym(1, false))
            maxIterationTest--
        }

        return pt
    }

    /**
     * Give the direction vector the smallest integer coordinates, with a positive first coordinate.
     */
    simplify(): this {
        this.#d.simplify()
        return this
    }

    /** Orthogonal projection of `pt` onto this line. */
    project(pt: Point): Point {
        const AP = new Vector(this.#OA, pt)
        const t = AP.dot(this.#d).divide(this.#d.dot(this.#d))
        return new Point(
            new Vector(this.#OA).add(this.#d.clone().multiplyByScalar(t))
        )
    }

    /** Reflection of `pt` through this line (`proj` is the midpoint of `[pt, reflect(pt)]`). */
    reflect(pt: Point): Point {
        const displacement = new Vector(pt, this.project(pt))
        return new Point(new Vector(pt).add(displacement.multiplyByScalar(2)))
    }
}
