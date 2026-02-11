import {Fraction} from "../coefficients"
import {Line} from "./line"
import {Vector} from "./vector"
import {Point} from "./point"
import type {InputValue, remarquableLines} from "../pimath.interface"
import {Numeric} from "../numeric"

type TRIANGLE_SIDES = 'AB' | 'AC' | 'BC'

// TODO: add a check if it's a triangle or not.
export class Triangle {
    // This defines the triangle
    #A: Point = new Point()
    #B: Point = new Point()
    #C: Point = new Point()
    #isValid = false
// This is calculated
    #lines: Record<TRIANGLE_SIDES, Line> | null = null
    #radians = true
    #remarquables: remarquableLines = {
        mediators: null, medians: null, heights: null, externalBisectors: null, bisectors: null
    }

    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    parse = (...values: unknown[]): this => {

        if (values.length === 1) {
            if (values[0] instanceof Triangle) {
                return this.copy(values[0])
            }
        }

        if (values.length === 3) {
            // Possibilities:
            // - Three points (or part of points, only dict for example, or array
            // - Three lines
            // - Three lines as text.
            if (values.every((x: unknown) => typeof x === 'string')) {
                // Three lines as text.
                return this.fromLines(...values)
            }

            if (values.every((x: unknown) => x instanceof Line)) {
                // We have three lines
                return this.fromLines(values[0], values[1], values[2])
            }

            if (values.every((x: unknown) => (x instanceof Point))) {
                return this.fromPoints(values[0], values[1], values[2])
            }
        }

        if (values.length === 6) {
            const v: Fraction[] = values.map((x: unknown) => new Fraction(x as string))

            if (v.some(x => x.isNaN())) {
                throw new Error('One of the values is not a valid number')
            }

            return this.fromCoordinates(v[0], v[1], v[2], v[3], v[4], v[5])
        }

        return this
    }

    /**
     * Clone the Triangle class
     */
    clone = (): Triangle => {
        return new Triangle(
            this.#A.clone(),
            this.#B.clone(),
            this.#C.clone()
        )
    }

    /**
     * Copy the values from another triangle
     * @param value
     */
    copy(value: Triangle): this {
        this.#A = value.A.clone()
        this.#B = value.B.clone()
        this.#C = value.C.clone()

        return this
    }

    get A(): Point {
        return this.#A
    }

    set A(value: Point) {
        this.reset(false)
        this.#A = value
    }

    get AB(): Vector {
        return this.#getSegment('A', 'B')
    }

    get AC(): Vector {
        return this.#getSegment('A', 'C')
    }

    get B(): Point {
        return this.#B
    }

    set B(value: Point) {
        this.reset(false)
        this.#B = value
    }

    get BA(): Vector {
        return this.#getSegment('B', 'A')
    }

    get BC(): Vector {
        return this.#getSegment('B', 'C')
    }

    get C(): Point {
        return this.#C
    }

    set C(value: Point) {
        this.reset(false)
        this.#C = value
    }

    get CA(): Vector {
        return this.#getSegment('C', 'A')
    }

    get CB(): Vector {
        return this.#getSegment('C', 'B')
    }

    get asDegree(): this {
        this.#radians = false
        return this
    }

    get asRadians(): this {
        this.#radians = true
        return this
    }

    fromCoordinates(
        x1: InputValue<Fraction>, y1: InputValue<Fraction>,
        x2: InputValue<Fraction>, y2: InputValue<Fraction>,
        x3: InputValue<Fraction>, y3: InputValue<Fraction>): this {

        this.reset()

        return this.fromPoints(
            new Point(x1, y1),
            new Point(x2, y2),
            new Point(x3, y3),
        )
    }

    fromLines(line1: Line | string, line2: Line | string, line3: Line | string): this {
        // reset the remarquables lines.
        this.reset()

        const AB: Line = new Line(line1).clone()
        const BC: Line = new Line(line2).clone()
        const AC: Line = new Line(line3).clone()

        // Get the intersection points -> build the triangle using these intersection points.
        let intersect = AB.intersection(BC)
        if (intersect.hasIntersection) {
            this.#B = intersect.point
        } else {
            this.#isValid = false
            return this
        }

        intersect = BC.intersection(AC)
        if (intersect.hasIntersection) {
            this.#C = intersect.point
        } else {
            this.#isValid = false
            return this
        }

        intersect = AC.intersection(AB)
        if (intersect.hasIntersection) {
            this.#A = intersect.point
        } else {
            this.#isValid = false
            return this
        }

        // Force the use of the given lines.
        this.#lines = {AB, AC, BC}
        this.#isValid = true

        return this

    }

    fromPoints(A: Point, B: Point, C: Point): this {
        this.reset()

        // We have three points.
        this.#A = A.clone()
        this.#B = B.clone()
        this.#C = C.clone()

        this.#isValid = true

        return this
    }

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


    getBisectors(internal = true): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {

        if(!this.#remarquables.bisectors) {
            const A = this.#calculateBisectors('A', internal)
            const B = this.#calculateBisectors('B', internal)
            const C = this.#calculateBisectors('C', internal)

            const intersection = A.intersection(B).point
            this.#remarquables.bisectors = {A, B, C, intersection}
        }

        return this.#remarquables.bisectors
    }

    getHeights(): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {

        if(!this.#remarquables.heights) {
            const A = new Line().fromPointAndNormal(this.#A, new Vector(this.#B, this.#C))
            const B = new Line().fromPointAndNormal(this.#B, new Vector(this.#A, this.#C))
            const C = new Line().fromPointAndNormal(this.#C, new Vector(this.#A, this.#B))

            const intersection = A.intersection(B).point
            this.#remarquables.heights = {A, B, C, intersection}
        }

        return this.#remarquables.heights
    }

    getMedians(): { 'A': Line, 'B': Line, 'C': Line, 'intersection': Point | null } {
        const middles = this.getMiddles()

        if(!this.#remarquables.medians){
            const A = new Line().fromPoints(this.#A, middles.BC)
            const B = new Line().fromPoints(this.#B, middles.AC)
            const C = new Line().fromPoints(this.#C, middles.AB)

            const intersection = A.intersection(B).point
            this.#remarquables.medians = {A, B, C, intersection}
        }

        return this.#remarquables.medians
    }

    getMediators(): { 'a': Line, 'b': Line, 'c': Line, 'intersection': Point | null } {
        const middles = this.getMiddles()

        if(!this.#remarquables.mediators) {
            const c = new Line().fromPointAndNormal(middles.AB, new Vector(this.#A, this.#B))
            const b = new Line().fromPointAndNormal(middles.AC, new Vector(this.#A, this.#C))
            const a = new Line().fromPointAndNormal(middles.BC, new Vector(this.#B, this.#C))

            const intersection = a.intersection(b).point
            this.#remarquables.mediators = {a, b, c, intersection}
        }

        return this.#remarquables.mediators
    }

    getMiddles() {
        return {
            'AB': new Point().middleOf(this.#A, this.#B),
            'AC': new Point().middleOf(this.#A, this.#C),
            'BC': new Point().middleOf(this.#B, this.#C)
        }
    }

    getPoints(): Point[] {
        return [this.A, this.B, this.C]
    }

    getSortedPoints(): Point[] {
        return this.getPoints().sort((a, b) => {
            return a.x.value === b.x.value
                ? a.y.value - b.y.value
                : a.x.value - b.x.value
        })
    }

    isEqual(T: Triangle): boolean {
        if (!this.#isValid || !T.isValid) return false

        // TODO: compare points in a particular order.
        const tri1 = this.getSortedPoints()
        const tri2 = T.getSortedPoints()

        return tri1.every((_, index) => tri1[index].isEqual(tri2[index]))

    }

    isEquilateral(): boolean {
        if (!this.#isValid) return false

        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return (dAB === dBC) && (dAB === dAC)
    }

    isIsocele(): boolean {
        if (!this.#isValid) return false

        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return dAB === dBC ||
            dAB === dAC ||
            dBC === dAC
    }

    isRectangle(): boolean {
        if (!this.#isValid) return false

        return this.AB.isNormalTo(this.BC) ||
            this.AB.isNormalTo(this.AC) ||
            this.BC.isNormalTo(this.AC)
    }

    get isValid(): boolean {
        return this.#isValid
    }

    set isValid(value: boolean) {
        this.#isValid = value
    }

    get lines(): Record<TRIANGLE_SIDES, Line> {
        if (this.#lines === null) {
            this.#lines = {
                'AB': new Line(this.#A, this.#B),
                'BC': new Line(this.#B, this.#C),
                'AC': new Line(this.#A, this.#C)
            }
        }

        return this.#lines
    }

    medianA(): Line {
        return this.getMedians().A
    }

    medianB(): Line {
        return this.getMedians().B
    }

    medianC(): Line {
        return this.getMedians().C
    }

    get remarquables(): remarquableLines | null {
        return this.#remarquables
    }

    public reset(alsoPoints = true): this {
        if (alsoPoints) {
            this.#A = new Point()
            this.#B = new Point()
            this.#C = new Point()
        }

        this.#isValid = true
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

    #calculateBisectors(pt: string, internal = true): Line {
        const tlines = this.lines
        let d1: Vector = new Vector()
        let d2: Vector = new Vector()
        let P: Point = new Point()

        if (pt === 'A') {
            P = this.A.clone()
            d1 = tlines.AB.clone().d
            d2 = tlines.AC.clone().d
        } else if (pt === 'B') {
            P = this.B.clone()
            d1 = tlines.AB.clone().d.opposite()
            d2 = tlines.BC.clone().d
        } else if (pt === 'C') {
            P = this.C.clone()
            d1 = tlines.BC.clone().d.opposite()
            d2 = tlines.AC.clone().d.opposite()
        }

        if (d1 === undefined || d2 === undefined) {
            throw new Error(`The point ${pt} does not exist`)
        }

        const director = internal
            ? d1.unit().add(d2.unit())
            : d1.unit().subtract(d2.unit())

        return new Line().fromPointAndDirection(P, director)
    }

    #cosThm(opposite: number, adjacent1: number, adjacent2: number): number {
        const ratio = ((adjacent1 ** 2 + adjacent2 ** 2) - opposite ** 2) / (2 * adjacent1 * adjacent2)

        return this.#radians
            ? Math.acos(ratio)
            : Numeric.numberCorrection(Math.acos(ratio) * 180 / Math.PI)
    }

    /**
     * Get the Point class for the given name
     * @param ptName
     */
    #getPointByName = (ptName: string): Point => {
        switch (ptName.toUpperCase()) {
            case 'A':
                return this.#A
            case 'B':
                return this.#B
            case 'C':
                return this.#C
        }

        // Something went wrong ! Return the first point
        return this.#A
    }

    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    #getSegment = (ptName1: string, ptName2: string): Vector => {
        return new Vector(
            this.#getPointByName(ptName1),
            this.#getPointByName(ptName2)
        )
    }

}
