import { Fraction } from "../coefficients/fraction"
import { Line } from "./line"
import { Vector } from "./vector"
import { Point } from "./point"

export interface remarquableLines {
    'medians': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    'mediators': {
        'AB': Line,
        'AC': Line,
        'BC': Line,
        'intersection': Vector | null
    },
    'heights': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    'bisectors': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    externalBisectors: {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    }
}

export class Triangle {
    #A: Point
    #B: Point
    #C: Point
    #lines: { 'AB': Line, 'AC': Line, 'BC': Line }
    #middles: { 'AB': Point, 'AC': Point, 'BC': Point }
    #remarquables: remarquableLines

    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    // ------------------------------------------
    // Getter and setters
    // ------------------------------------------

    get A(): Vector {
        return this.#A
    }

    get B(): Vector {
        return this.#B
    }

    get C(): Vector {
        return this.#C
    }

    get AB(): Vector {
        return this.#getSegment('A', 'B')
    }

    get BA(): Vector {
        return this.#getSegment('B', 'A')
    }

    get BC(): Vector {
        return this.#getSegment('B', 'C')
    }

    get CB(): Vector {
        return this.#getSegment('C', 'B')
    }

    get AC(): Vector {
        return this.#getSegment('A', 'C')
    }

    get CA(): Vector {
        return this.#getSegment('C', 'A')
    }

    get isRectangle(): boolean {
        if (this.AB.isNormalTo(this.BC)) {
            return true
        }
        if (this.AB.isNormalTo(this.AC)) {
            return true
        }
        if (this.BC.isNormalTo(this.AC)) {
            return true
        }

        return false
    }

    get isEquilateral(): boolean {
        return this.AB.normSquare.isEqual(this.BC.normSquare) &&
            this.AB.normSquare.isEqual(this.AC.normSquare)
    }

    get isIsocele(): boolean {
        return this.AB.normSquare.isEqual(this.BC.normSquare) ||
            this.AB.normSquare.isEqual(this.AC.normSquare) ||
            this.BC.normSquare.isEqual(this.AC.normSquare)
    }

    get lines(): { 'AB': Line, 'BC': Line, 'AC': Line } {
        return this.#lines
    }

    get remarquables(): remarquableLines {
        return this.#remarquables
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------

    /**
     * Parse values to a triangle. Supported formats:
     * Vector2D, Vector2D, Vector2D
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    parse = (...values: unknown[]): Triangle => {
        if (values.length === 6) {
            // Check if all values are number or fractions.
            const v: Fraction[] = values.map((x: unknown) => new Fraction(x as string))

            if (v.some(x => x.isNaN())) {
                throw new Error('One of the values is not a valid number')
            }

            return this.parse(
                new Vector(v[0], v[1]),
                new Vector(v[2], v[3]),
                new Vector(v[4], v[5]),
            )
        } else if (values.length === 3) {
            // Possibilities:
            // - Three points (or part of points, only dict for example, or array (TODO: Add the array syntax for point)
            // - Three lines
            // - Three lines as text.
            if (values.every((x: unknown) => typeof x === 'string')) {
                // Three lines as text.
                return this.parse(
                    ...values.map((x) => {
                        return new Line(x as string)
                    })
                )
            } else if (values.every((x: unknown) => x instanceof Line)) {
                // We have three lines
                const AB: Line = (values[0] as Line).clone()
                const BC: Line = (values[1] as Line).clone()
                const AC: Line = (values[2] as Line).clone()
                this.#lines = { AB, BC, AC }

                // Get the intersection points -> build the triangle using these intersection points.
                let intersect = AB.intersection(BC)
                if (intersect.hasIntersection) {
                    this.#B = intersect.point.clone()
                } else {
                    throw new Error('Lines do not intersect !')
                }

                intersect = BC.intersection(AC)
                if (intersect.hasIntersection) {
                    this.#C = intersect.point.clone()
                } else {
                    throw new Error('Lines do not intersect !')
                }

                intersect = AC.intersection(AB)
                if (intersect.hasIntersection) {
                    this.#A = intersect.point.clone()
                } else {
                    throw new Error('Lines do not intersect !')
                }

            } else if (values.every((x: unknown) => (x instanceof Point))) {
                // We have three points.
                this.#A = (values[0] as Point).clone()
                this.#B = (values[1] as Point).clone()
                this.#C = (values[2] as Point).clone()
                this.#lines = {
                    'AB': new Line(this.#A, this.#B),
                    'BC': new Line(this.#B, this.#C),
                    'AC': new Line(this.#A, this.#C)
                }
            }
        } else if (values.length === 1) {
            if (values[0] instanceof Triangle) {
                return values[0].clone()
            }
        }

        this.#updateTriangle()
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


    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------

    /**
     * Generate the Line object for the three segments of the triangle
     */
    #updateTriangle = () => {
        this.#middles = {
            'AB': new Point().middleOf(this.#A, this.#B),
            'AC': new Point().middleOf(this.#A, this.#C),
            'BC': new Point().middleOf(this.#B, this.#C)
        }

        this.#remarquables = this.#calculateRemarquableLines()
    }


    /**
     * Get the Vector2D class for the given name
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

    #calculateRemarquableLines = (): remarquableLines => {

        const medians = {
            'A': new Line().fromPoints(this.#A, this.#middles.BC),
            'B': new Line().fromPoints(this.#B, this.#middles.AC),
            'C': new Line().fromPoints(this.#C, this.#middles.AB),
            'intersection': null
        }

        const mediators = {
            'AB': new Line().fromPointAndNormal(this.#middles.AB, new Vector(this.#A, this.#B).normal()),
            'AC': new Line().fromPointAndNormal(this.#middles.AC, new Vector(this.#A, this.#C).normal()),
            'BC': new Line().fromPointAndNormal(this.#middles.BC, new Vector(this.#B, this.#C).normal()),
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

    #calculateBisectors = (pt: string): { internal: Line, external: Line } => {
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
            return b1.hitSegment(this.B, this.C) ? { internal: b1, external: b2 } : { internal: b2, external: b1 }
        }
        if (pt === 'B') {
            return b1.hitSegment(this.A, this.C) ? { internal: b1, external: b2 } : { internal: b2, external: b1 }
        }
        if (pt === 'C') {
            return b1.hitSegment(this.B, this.A) ? { internal: b1, external: b2 } : { internal: b2, external: b1 }
        }

        // Default returns the first bisector
        return { internal: b1, external: b2 }
    }
}