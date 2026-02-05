import {Fraction} from "../coefficients"
import {Line} from "./line"
import {Vector} from "./vector"
import {Point} from "./point"
import type {InputValue, remarquableLines} from "../pimath.interface"

type TRIANGLE_SIDES = 'AB' | 'AC' | 'BC'

export class Triangle {
    // This defines the triangle
    #A: Point = new Point()
    #B: Point = new Point()
    #C: Point = new Point()
    #isValid = true    // TODO: add a check if it's a triangle or not.
// This is calculated
    #lines: Record<TRIANGLE_SIDES, Line> = {
        'AB': new Line(),
        'AC': new Line(),
        'BC': new Line()
    }
    #radians = true
    #remarquables: remarquableLines | null  = null

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
                return this.parse(
                    ...values.map((x) => {
                        return new Line(x)
                    })
                )
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

        return this.#updateTriangle()
    }

    get A(): Point {
        return this.#A
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

    get BA(): Vector {
        return this.#getSegment('B', 'A')
    }

    get BC(): Vector {
        return this.#getSegment('B', 'C')
    }

    get C(): Point {
        return this.#C
    }

    get CA(): Vector {
        return this.#getSegment('C', 'A')
    }

    get CB(): Vector {
        return this.#getSegment('C', 'B')
    }

    get angleABC(): number {
        return this.getAngle('ABC')
    }

    get angleBCA(): number {
        return this.getAngle('BCA')
    }

    get angleCAB(): number {
        return this.getAngle('CAB')
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

        return this.fromPoints(
            new Point(x1, y1),
            new Point(x2, y2),
            new Point(x3, y3),
        )
    }

    fromLines(line1: Line | string, line2: Line | string, line3: Line | string): this {
        const AB: Line = new Line(line1).clone()
        const BC: Line = new Line(line2).clone()
        const AC: Line = new Line(line3).clone()

        // Get the intersection points -> build the triangle using these intersection points.
        let intersect = AB.intersection(BC)
        if (intersect.hasIntersection) {
            this.#B = intersect.point
        } else {
            throw new Error('Lines do not intersect !')
        }

        intersect = BC.intersection(AC)
        if (intersect.hasIntersection) {
            this.#C = intersect.point
        } else {
            throw new Error('Lines do not intersect !')
        }

        intersect = AC.intersection(AB)
        if (intersect.hasIntersection) {
            this.#A = intersect.point
        } else {
            throw new Error('Lines do not intersect !')
        }

        this.#updateTriangle()

        // Force the use of the given lines.
        this.#lines = {AB, AC, BC}

        return this

    }

    fromPoints(A: Point, B: Point, C: Point): this {
        // We have three points.
        this.#A = A.clone()
        this.#B = B.clone()
        this.#C = C.clone()

        this.#updateTriangle()
        return this
    }

    getAngle(name: 'CAB' | 'ABC' | 'BCA'): number {
        const a = this.BC.norm
        const b = this.AC.norm
        const c = this.AB.norm

        if (name === 'CAB') {
            return this.#cosThm(a, b, c)
        }

        if (name === 'BCA') {
            return this.#cosThm(c, b, a)
        }

        return this.#cosThm(b, a, c)
    }

    get isEquilateral(): boolean {
        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return (dAB === dBC) && (dAB === dAC)
    }

    get isIsocele(): boolean {
        const dAB = this.AB.normSquare.value
        const dBC = this.BC.normSquare.value
        const dAC = this.AC.normSquare.value

        return dAB === dBC ||
            dAB === dAC ||
            dBC === dAC
    }

    get isRectangle(): boolean {
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
        return this.#lines
    }

    get remarquables(): remarquableLines | null {
        return this.#remarquables
    }

    #calculateBisectors = (pt: string): { internal: Line, external: Line } => {
        // TODO: there should be an easier way to get the internal point (and the intersection).
        const tlines = this.lines
        let d1, d2

        if (pt === 'A') {
            d1 = tlines.AB
            d2 = tlines.AC
        } else if (pt === 'B') {
            d1 = tlines.AB
            d2 = tlines.BC
        } else if (pt === 'C') {
            d1 = tlines.BC
            d2 = tlines.AC
        }

        if (d1 === undefined || d2 === undefined) {
            throw new Error(`The point ${pt} does not exist`)
        }

        const d1n = d1.n.simplify().norm
        const d2n = d2.n.simplify().norm
        const d1Equ = d1.getEquation().multiply(d2n)
        const d2Equ = d2.getEquation().multiply(d1n)

        const b1: Line = new Line(d1Equ.clone().subtract(d2Equ).simplify())
        const b2: Line = new Line(d2Equ.clone().subtract(d1Equ).simplify())

        // Must determine which bisectors is in the triangle
        if (pt === 'A') {
            return b1.hitSegment(this.B, this.C) ? {internal: b1, external: b2} : {internal: b2, external: b1}
        }
        if (pt === 'B') {
            return b1.hitSegment(this.A, this.C) ? {internal: b1, external: b2} : {internal: b2, external: b1}
        }
        if (pt === 'C') {
            return b1.hitSegment(this.B, this.A) ? {internal: b1, external: b2} : {internal: b2, external: b1}
        }

        // Default returns the first bisector
        return {internal: b1, external: b2}
    }

    #calculateRemarquableLines = (): remarquableLines => {
        const middles = {
            'AB': new Point().middleOf(this.#A, this.#B),
            'AC': new Point().middleOf(this.#A, this.#C),
            'BC': new Point().middleOf(this.#B, this.#C)
        }

        const medians = {
            'A': new Line().fromPoints(this.#A, middles.BC),
            'B': new Line().fromPoints(this.#B, middles.AC),
            'C': new Line().fromPoints(this.#C, middles.AB),
            'intersection': null
        }

        const mediators = {
            'AB': new Line().fromPointAndNormal(middles.AB, new Vector(this.#A, this.#B).normal()),
            'AC': new Line().fromPointAndNormal(middles.AC, new Vector(this.#A, this.#C).normal()),
            'BC': new Line().fromPointAndNormal(middles.BC, new Vector(this.#B, this.#C).normal()),
            'intersection': null
        }

        const heights = {
            'A': new Line().fromPointAndNormal(this.#A, new Vector(this.#B, this.#C).normal()),
            'B': new Line().fromPointAndNormal(this.#B, new Vector(this.#A, this.#C).normal()),
            'C': new Line().fromPointAndNormal(this.#C, new Vector(this.#A, this.#B).normal()),
            'intersection': null
        }

        const bA = this.#calculateBisectors('A'),
            bB = this.#calculateBisectors('B'),
            bC = this.#calculateBisectors('C')

        const bisectors = {
            'A': bA.internal,
            'B': bB.internal,
            'C': bB.internal,
            'intersection': null
        }

        const externalBisectors = {
            'A': bA.external,
            'B': bB.external,
            'C': bC.external,
            'intersection': null
        }

        const remarquables: remarquableLines = {
            medians,
            mediators,
            heights,
            bisectors,
            externalBisectors
        }

        // As it's a triangle, we assume the lines are intersecting and aren't parallel or superposed.
        remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point
        remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point
        remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point
        remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point

        // Everything was calculated for the remarquable lines.
        return remarquables
    }

    #cosThm(opposite: number, adjacent1: number, adjacent2: number): number {
        const ratio = ((adjacent1 ** 2 * adjacent2 ** 2) - opposite ** 2) / (2 * adjacent1 * adjacent2)

        return this.#radians
            ? Math.acos(ratio)
            : Math.acos(ratio) * 180 / Math.PI
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

    /**
     * Generate the Line object for the three segments of the triangle
     */
    #updateTriangle(): this {
        // Create the lines
        this.#lines = {
            'AB': new Line(this.#A, this.#B),
            'BC': new Line(this.#B, this.#C),
            'AC': new Line(this.#A, this.#C)
        }

        this.#remarquables = this.#calculateRemarquableLines()

        return this
    }
}