import {Fraction} from "../coefficients"
import {Line} from "./line"
import {Vector} from "./vector"
import {Point} from "./point"
import type {IPiMathObject, InputValue, RemarquableLines} from "../pimath.interface"
import {Numeric} from "../numeric"
import {InvalidArgumentError, MathError, NotImplementedError} from "../errors"

export type TriangleSide = 'AB' | 'AC' | 'BC'

/**
 * A triangle `ABC` of the plane. Built from three points, three lines, or six coordinates. It gives the sides,
 * the angles and the remarkable lines (medians, heights, mediators, bisectors) with exact coordinates.
 * `tex` and `display` are not available: describe a triangle through its vertices or its {@link lines}.
 * @example
 * new Triangle(new Point(0, 0), new Point(4, 0), new Point(0, 3)).isRectangle() // true
 */
export class Triangle implements IPiMathObject<Triangle> {
    #A: Point = new Point()
    #B: Point = new Point()
    #C: Point = new Point()
    #isValid = false
    #lines: Record<TriangleSide, Line> | null = null
    #radians = true
    #remarquables: RemarquableLines = {
        mediators: null, medians: null, heights: null, externalBisectors: null, bisectors: null
    }

    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    /**
     * Replace the triangle with a triangle, three lines (objects or equation strings), three points, or six coordinates.
     * @throws {InvalidArgumentError} if one of six values is not a number.
     * @throws {MathError} if the points are collinear or the lines do not form a triangle.
     */
    parse(...values: unknown[]): this {

        if (values.length === 1) {
            if (values[0] instanceof Triangle) {
                return this.copy(values[0])
            }
        }

        if (values.length === 3) {
            if (values.every((x: unknown) => typeof x === 'string')) {
                const [a, b, c] = values as [string, string, string]
                return this.copy(Triangle.fromLines(a, b, c))
            }

            if (values.every((x: unknown) => x instanceof Line)) {
                return this.copy(Triangle.fromLines(values[0], values[1], values[2]))
            }

            if (values.every((x: unknown) => (x instanceof Point))) {
                return this.copy(Triangle.fromPoints(values[0], values[1], values[2]))
            }
        }

        if (values.length === 6) {
            const v: Fraction[] = values.map((x: unknown) => new Fraction(x as string))

            if (v.some(x => x.isNaN())) {
                throw new InvalidArgumentError('One of the values is not a valid number')
            }

            return this.copy(Triangle.fromCoordinates(v[0], v[1], v[2], v[3], v[4], v[5]))
        }

        return this
    }

    /**
     * Not implemented on purpose: a triangle has no single equation to display.
     * @throws {NotImplementedError} always. Describe it through its {@link lines} or its vertices.
     */
    get tex(): string { throw new NotImplementedError('Triangle has no equation representation') }

    /**
     * Not implemented on purpose: see {@link tex}.
     * @throws {NotImplementedError} always.
     */
    get display(): string { throw new NotImplementedError('Triangle has no equation representation') }

    clone(): this {
        const t = new Triangle()
        t.#A = this.#A.clone()
        t.#B = this.#B.clone()
        t.#C = this.#C.clone()
        t.#radians = this.#radians
        t.reset()
        return t as this
    }

    /**
     * Copies the three vertices from `value` into this instance. Math state only —
     * `#radians` is not transferred (use {@link clone} for a full copy).
     */
    copy(value: Triangle): this {
        this.#A = value.A.clone()
        this.#B = value.B.clone()
        this.#C = value.C.clone()
        this.reset()
        return this
    }

    /**
     * Vertex A. Setting a vertex refreshes the validity and the remarkable lines.
     */
    get A(): Point {
        return this.#A
    }

    set A(value: Point) {
        this.#A = value
        this.#A.onChange = () => this.reset()
        this.reset()
    }

    /**
     * The vector from A to B.
     */
    get AB(): Vector {
        return this.#getSegment('A', 'B')
    }

    /**
     * The vector from A to C.
     */
    get AC(): Vector {
        return this.#getSegment('A', 'C')
    }

    /**
     * Vertex B. Setting a vertex refreshes the validity and the remarkable lines.
     */
    get B(): Point {
        return this.#B
    }

    set B(value: Point) {
        this.#B = value
        this.#B.onChange = () => this.reset()
        this.reset()
    }

    /**
     * The vector from B to A.
     */
    get BA(): Vector {
        return this.#getSegment('B', 'A')
    }

    /**
     * The vector from B to C.
     */
    get BC(): Vector {
        return this.#getSegment('B', 'C')
    }

    /**
     * Vertex C. Setting a vertex refreshes the validity and the remarkable lines.
     */
    get C(): Point {
        return this.#C
    }

    set C(value: Point) {
        this.#C = value
        this.#C.onChange = () => this.reset()
        this.reset()
    }

    /**
     * The vector from C to A.
     */
    get CA(): Vector {
        return this.#getSegment('C', 'A')
    }

    /**
     * The vector from C to B.
     */
    get CB(): Vector {
        return this.#getSegment('C', 'B')
    }

    /**
     * Output option: {@link getAngle} gives degrees. Chainable, persistent.
     */
    get asDegree(): this {
        this.#radians = false
        return this
    }

    /**
     * Output option: {@link getAngle} gives radians (default). Chainable, persistent.
     */
    get asRadians(): this {
        this.#radians = true
        return this
    }

    /**
     * Build a triangle from the coordinates of its three vertices.
     * @throws {MathError} if the points are collinear or two of them are the same.
     */
    static fromCoordinates(
        x1: InputValue<Fraction>, y1: InputValue<Fraction>,
        x2: InputValue<Fraction>, y2: InputValue<Fraction>,
        x3: InputValue<Fraction>, y3: InputValue<Fraction>): Triangle {

        return Triangle.fromPoints(
            new Point(x1, y1),
            new Point(x2, y2),
            new Point(x3, y3),
        )
    }

    /**
     * Build a triangle from the lines of its sides `AB`, `BC` and `AC`, given as lines or equation strings.
     * @throws {MathError} if two lines are parallel or the lines do not form a triangle.
     */
    static fromLines(line1: Line | string, line2: Line | string, line3: Line | string): Triangle {
        const t = new Triangle()
        const AB: Line = new Line(line1).clone()
        const BC: Line = new Line(line2).clone()
        const AC: Line = new Line(line3).clone()

        let intersect = AB.intersection(BC)
        if (!intersect.hasIntersection) {
            throw new MathError('Triangle.fromLines: lines AB and BC do not intersect')
        }
        t.#B = intersect.point

        intersect = BC.intersection(AC)
        if (!intersect.hasIntersection) {
            throw new MathError('Triangle.fromLines: lines BC and AC do not intersect')
        }
        t.#C = intersect.point

        intersect = AC.intersection(AB)
        if (!intersect.hasIntersection) {
            throw new MathError('Triangle.fromLines: lines AC and AB do not intersect')
        }
        t.#A = intersect.point

        t.reset()

        if (!t.#isValid) {
            throw new MathError('Triangle.fromLines: lines form a degenerate triangle')
        }

        t.#lines = {AB, AC, BC}
        return t
    }

    /**
     * Build a triangle from its three vertices.
     * @throws {MathError} if the points are collinear or two of them are the same.
     */
    static fromPoints(A: Point, B: Point, C: Point): Triangle {
        const t = new Triangle()
        t.#A = A.clone()
        t.#B = B.clone()
        t.#C = C.clone()
        t.reset()
        if (!t.#isValid) {
            throw new MathError('Triangle.fromPoints: points must form a non-degenerate triangle')
        }
        return t
    }

    /**
     * Angle at a vertex, as a decimal number: in radians by default, in degrees after {@link asDegree}.
     */
    getAngle(name: 'A' | 'B' | 'C'): number {
        const a = this.BC.norm
        const b = this.AC.norm
        const c = this.AB.norm

        if (name === 'A') {
            return this.#cosThm(a, b, c)
        }

        if (name === 'C') {
            return this.#cosThm(c, b, a)
        }

        return this.#cosThm(b, a, c)
    }

    /**
     * The bisectors of the angles, as `{A, B, C, intersection}`, where `intersection` is their common point.
     * @param internal - `true` (default) for the internal bisectors, `false` for the external ones.
     * @throws {MathError} if the triangle is degenerate.
     */
    getBisectors(internal = true): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {

        if (!this.#isValid) throw new MathError('Triangle is degenerate')

        if (internal && this.#remarquables.bisectors) return this.#remarquables.bisectors
        if (!internal && this.#remarquables.externalBisectors) return this.#remarquables.externalBisectors

        const A = this.#calculateBisectors('A', internal)
        const B = this.#calculateBisectors('B', internal)
        const C = this.#calculateBisectors('C', internal)

        const intersection = A.intersection(B).point
        if (internal) {
            this.#remarquables.bisectors = {A, B, C, intersection}
        } else {
            this.#remarquables.externalBisectors = {A, B, C, intersection}
        }

        return {A, B, C, intersection}
    }

    /**
     * The heights, as `{A, B, C, intersection}`, where `intersection` is the orthocenter.
     * @throws {MathError} if the triangle is degenerate.
     */
    getHeights(): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {

        if (!this.#isValid) throw new MathError('Triangle is degenerate')

        if (!this.#remarquables.heights) {
            const A = Line.fromPointAndNormal(this.#A, new Vector(this.#B, this.#C))
            const B = Line.fromPointAndNormal(this.#B, new Vector(this.#A, this.#C))
            const C = Line.fromPointAndNormal(this.#C, new Vector(this.#A, this.#B))

            const intersection = A.intersection(B).point
            this.#remarquables.heights = {A, B, C, intersection}
        }

        return this.#remarquables.heights
    }

    /**
     * The medians, as `{A, B, C, intersection}`, where `intersection` is the centroid.
     * @throws {MathError} if the triangle is degenerate.
     */
    getMedians(): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {

        if (!this.#isValid) throw new MathError('Triangle is degenerate')

        if (!this.#remarquables.medians) {
            const middles = this.getMiddles()
            const A = Line.fromPoints(this.#A, middles.BC)
            const B = Line.fromPoints(this.#B, middles.AC)
            const C = Line.fromPoints(this.#C, middles.AB)

            const intersection = A.intersection(B).point
            this.#remarquables.medians = {A, B, C, intersection}
        }

        return this.#remarquables.medians
    }

    /**
     * The perpendicular bisectors of the sides, as `{a, b, c, intersection}`, where `intersection` is the circumcenter.
     * @throws {MathError} if the triangle is degenerate.
     */
    getMediators(): { 'a': Line, 'b': Line, 'c': Line, 'intersection': Point | null } {

        if (!this.#isValid) throw new MathError('Triangle is degenerate')

        if (!this.#remarquables.mediators) {
            const middles = this.getMiddles()
            const a = Line.fromPointAndNormal(middles.BC, new Vector(this.#B, this.#C))
            const b = Line.fromPointAndNormal(middles.AC, new Vector(this.#A, this.#C))
            const c = Line.fromPointAndNormal(middles.AB, new Vector(this.#A, this.#B))

            const intersection = a.intersection(b).point
            this.#remarquables.mediators = {a, b, c, intersection}
        }

        return this.#remarquables.mediators
    }

    /**
     * The midpoints of the sides, as `{AB, AC, BC}`.
     */
    getMiddles(): { AB: Point, AC: Point, BC: Point } {
        return {
            'AB': new Point().middleOf(this.#A, this.#B),
            'AC': new Point().middleOf(this.#A, this.#C),
            'BC': new Point().middleOf(this.#B, this.#C)
        }
    }

    /**
     * The vertices `[A, B, C]`.
     */
    getPoints(): Point[] {
        return [this.A, this.B, this.C]
    }

    /**
     * The vertices sorted by `x`, then by `y`.
     */
    getSortedPoints(): Point[] {
        return this.getPoints().sort((a, b) => {
            return a.x.value === b.x.value
                ? a.y.value - b.y.value
                : a.x.value - b.x.value
        })
    }

    /**
     * True when both triangles have the same vertices, whatever their order.
     */
    isEqual(T: Triangle): boolean {
        if (!this.#isValid || !T.isValid) return false

        const tri1 = this.getSortedPoints()
        const tri2 = T.getSortedPoints()

        return tri1.every((_, index) => tri1[index].isEqual(tri2[index]))

    }

    /**
     * True when the three sides have the same length.
     */
    isEquilateral(): boolean {
        if (!this.#isValid) return false

        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return (dAB === dBC) && (dAB === dAC)
    }

    /**
     * True when two sides have the same length.
     */
    isIsocele(): boolean {
        if (!this.#isValid) return false

        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return dAB === dBC ||
            dAB === dAC ||
            dBC === dAC
    }

    /**
     * True when two sides are perpendicular.
     */
    isRectangle(): boolean {
        if (!this.#isValid) return false

        return this.AB.isNormalTo(this.BC) ||
            this.AB.isNormalTo(this.AC) ||
            this.BC.isNormalTo(this.AC)
    }

    /**
     * False when the three vertices are collinear.
     */
    get isValid(): boolean {
        return this.#isValid
    }

    /**
     * The lines of the sides, as `{AB, BC, AC}`.
     */
    get lines(): Record<TriangleSide, Line> {
        if (this.#lines === null) {
            this.#lines = {
                'AB': new Line(this.#A, this.#B),
                'BC': new Line(this.#B, this.#C),
                'AC': new Line(this.#A, this.#C)
            }
        }

        return this.#lines
    }

    /**
     * The remarkable lines already computed. An entry is `null` until the matching `get***` method is called.
     */
    get remarquables(): RemarquableLines {
        return this.#remarquables
    }

    /**
     * Recompute the validity and forget the cached lines and remarkable lines. This is done automatically when a
     * vertex changes through its setter or its `x` and `y` coordinates.
     */
    reset(): this {
        this.#isValid = !this.AB.isColinearTo(this.AC)

        this.#lines = null
        this.#remarquables = {
            mediators: null,
            medians: null,
            heights: null,
            externalBisectors: null,
            bisectors: null
        }

        return this
    }

    #calculateBisectors(pt: 'A' | 'B' | 'C', internal = true): Line {
        const P = this.#getPointByName(pt).clone()

        // Directions come from the vertices, not from `Line.d`, whose sense does not necessarily
        // follow the segment: a flipped direction turns the sum (internal) into a difference.
        const [first, second] = pt === 'A' ? ['B', 'C'] as const
            : pt === 'B' ? ['A', 'C'] as const
            : ['A', 'B'] as const
        const d1 = new Vector(P, this.#getPointByName(first))
        const d2 = new Vector(P, this.#getPointByName(second))

        const director = internal
            ? d1.unit().add(d2.unit())
            : d1.unit().subtract(d2.unit())

        return Line.fromPointAndDirection(P, director)
    }

    #cosThm(opposite: number, adjacent1: number, adjacent2: number): number {
        const ratio = ((adjacent1 ** 2 + adjacent2 ** 2) - opposite ** 2) / (2 * adjacent1 * adjacent2)

        return this.#radians
            ? Math.acos(ratio)
            : Numeric.numberCorrection(Math.acos(ratio) * 180 / Math.PI)
    }

    #getPointByName(ptName: 'A' | 'B' | 'C'): Point {
        switch (ptName) {
            case 'A': return this.#A
            case 'B': return this.#B
            case 'C': return this.#C
        }
    }

    #getSegment(ptName1: 'A' | 'B' | 'C', ptName2: 'A' | 'B' | 'C'): Vector {
        return new Vector(
            this.#getPointByName(ptName1),
            this.#getPointByName(ptName2)
        )
    }

}
