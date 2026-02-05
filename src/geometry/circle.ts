import {Line} from "./line"
import {Vector} from "./vector"
import {Numeric} from "../numeric"
import {Fraction} from "../coefficients"
import {Equation, Monom, Polynom} from "../algebra"
import {type IPiMathObject} from "../pimath.interface"
import {Point} from "./point"
import {Root} from "../coefficients/root"
import {Triangle} from "./triangle"
import {Solution} from "../analyze/solution"

enum CIRCLE_DISPLAY {
    CANONICAL,
    CENTER_RADIUS,
}

export class Circle
    implements IPiMathObject<Circle> {

    #center: Point | null = null
    #equation: Equation | null = null
    #output_style: CIRCLE_DISPLAY = CIRCLE_DISPLAY.CENTER_RADIUS
    #squareRadius: Fraction | null = null

    constructor()
    constructor(equation: string | Equation)
    constructor(circle: Circle)
    constructor(center: Point, radius: Fraction | number, square?: boolean)
    constructor(center: Point, pointThrough: Point)
    constructor(A: Point, B: Point, C: Point)
    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }
    }

    parse(...values: unknown[]): this {
        // Data can be given in these formats:
        // one value, a string -> make it an Equation
        // one value, an Equation
        // one value, a circle -> clone it
        // two values: two points (center and pointThrough)
        // two values: point and Fraction (center and radius)
        // three values: Vector2D, Fraction, Boolean (center, square radius, true)

        if (typeof values[0] === 'string') {
            return this.fromString(values[0])
        }

        if (values[0] instanceof Equation) {
            return this.fromEquation(values[0])
        }

        if (values[0] instanceof Circle) {
            return this.copy(values[0])
        }

        if (values.length === 2 &&
            values[0] instanceof Point && values[1] instanceof Point
        ) {
            // Circle center through one point
            return this.fromCenterPoint(values[0], values[1])
        }

        if (values.length >= 2 && values[0]
            instanceof Point &&
            (values[1] instanceof Fraction || typeof values[1] === 'number')
        ) {
            // Circle center through one point
            return this.fromCenterRadius(
                values[0], values[1],
                (typeof values[2] === "boolean") ? values[2] : false
            )
        }

        return this
    }

    clone(): Circle {
        return new Circle().fromCenterRadius(
            this.center.clone(),
            this.squareRadius.clone(),
            true
        )
    }

    copy(circle: Circle): this {
        this.#center = circle.center.clone()
        this.#squareRadius = circle.squareRadius.clone()

        this.#calculateCartesian()

        return this
    }

    get tex(): string {
        if (this.#output_style === CIRCLE_DISPLAY.CANONICAL) {
            return this.equation.moveLeft().reduce().tex
        }

        let cx, cy
        if (this.center.x.isZero()) {
            cx = 'x^2'
        } else {
            cx = `\\left(x${this.center.x.isNegative() ? '+' : '-'}${this.center.x.clone().abs().tex}\\right)^2`
        }
        if (this.center.y.isZero()) {
            cy = 'y^2'
        } else {
            cy = `\\left(y${this.center.y.isNegative() ? '+' : '-'}${this.center.y.clone().abs().tex}\\right)^2`
        }
        return `${cx}+${cy}=${this.squareRadius.tex}`
    }

    get display(): string {
        if (this.#output_style === CIRCLE_DISPLAY.CANONICAL) {
            return this.equation.moveLeft().reduce().display
        }

        let cx, cy
        if (this.center.x.isZero()) {
            cx = 'x^2'
        } else {
            cx = `(x${this.center.x.isNegative() ? '+' : '-'}${this.center.x.clone().abs().tex})^2`
        }
        if (this.center.y.isZero()) {
            cy = 'y^2'
        } else {
            cy = `(y${this.center.y.isNegative() ? '+' : '-'}${this.center.y.clone().abs().tex})^2`
        }
        return `${cx}+${cy}=${this.squareRadius.display}`
    }

    get asCanonical(): this {
        this.#output_style = CIRCLE_DISPLAY.CANONICAL
        return this
    }

    get asCenterRadius(): this {
        this.#output_style = CIRCLE_DISPLAY.CENTER_RADIUS
        return this
    }

    get center(): Point {
        return this.#center ?? new Point()
    }

    get equation(): Equation {
        return this.#equation?.clone() ?? new Equation('0=0')
    }

    fromCenterPoint(center: Point, pointThrough: Point): this {
        this.#center = center.clone()
        this.#squareRadius = new Vector(this.#center, pointThrough).normSquare

        this.#calculateCartesian()

        return this
    }

    fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): this {
        this.#center = center.clone()
        if (square) {
            this.#squareRadius = (new Fraction(radius))
        } else {
            this.#squareRadius = new Fraction(radius).pow(2)
        }

        this.#calculateCartesian()

        return this
    }

    fromEquation(equ: Equation): this {
        // Move everything to the left.
        equ.moveLeft()

        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            // Both must be of degree 2.
            const x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y')
            let x1: Monom, y1: Monom, c: Monom

            // Both square monoms must have the same coefficient.
            if (x2.coefficient.isEqual(y2.coefficient)) {
                equ.divide(x2.coefficient)

                x1 = equ.left.monomByDegree(1, 'x')
                y1 = equ.left.monomByDegree(1, 'y')

                c = equ.left.monomByDegree(0)

                this.#center = new Point(x1.coefficient.clone().divide(2).opposite(), y1.coefficient.clone().divide(2).opposite())

                this.#squareRadius = c.coefficient.clone().opposite()
                    .add(this.#center.x.clone().pow(2))
                    .add(this.#center.y.clone().pow(2))

                this.#calculateCartesian()

                return this
            } else {
                // The circle is not a valid circle
                this.#reset()
            }
        }

        return this
    }

    fromPoints(A: Point, B: Point, C: Point): this {
        const T = new Triangle(A, B, C)
        if (!T.isValid || !T.remarquables) {
            this.#reset()
            return this
        }

        const mAB = T.remarquables.mediators.AB.clone()
        const mAC = T.remarquables.mediators.AC.clone()
        this.parse(mAB.intersection(mAC).point, A)

        return this
    }

    fromString(str: string): this {
        return this.fromEquation(new Equation(str))
    }

    getPointsOnCircle(): Point[] {
        // It means searching for pythagorician triples that make a perfect square.
        // (x-4)^2 + (y+3)^2 = 15
        const triplets = Numeric.pythagoreanTripletsWithTarget(this.squareRadius.value, true)

        const points: Point[] = []

        triplets.forEach(triplet => {
            // Allow positive / negative values
            // x-a = t  => x = a + t
            // x-a = -t => x = a - t

            for (const k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                points.push(new Point(
                        this.center.x.clone().add(k[0] * triplet[0]),
                        this.center.y.clone().add(k[1] * triplet[1])
                    )
                )
            }
        })
        return points
    }

    isPointOnCircle = (P: Point): boolean => {
        return this.#equation?.test({x: P.x, y: P.y}) ?? false
    }

    lineIntersection(L: Line): Point[] {
        if (this.#equation === null) {
            return []
        }

        const center = this.center
        const d = L.d
        const OP = L.OA

        // A = dx^2+dy^2
        const A = d.normSquare
        // B = 2 ( dx (x0-cx) + dy(y0-cy) )
        const B = OP.x.clone().subtract(center.x).multiply(d.x)
            .add(OP.y.clone().subtract(center.y).multiply(d.y))
            .multiply(2)
        // C = (x0-cx)^2 + (y0-cy)^2 - r^2
        const C = OP.x.clone().subtract(center.x).pow(2)
            .add(OP.y.clone().subtract(center.y).pow(2))
            .subtract(this.squareRadius)

        const sol = Solution.fromQuadratic(A, B, C)

        if (sol.length === 0) {
            return []
        }

        // One intersection point
        if (sol.length === 1) { // means exact answer
            const OX = OP.add(d.clone().multiplyByScalar(sol[0].fraction))
            return [
                new Point(OX.x, OX.y)
            ]
        }

        // Two intersection points
        if (sol[0].exact && sol[1].exact) {
            // Exact solutions (delta is a perfect square)
            const OX1 = OP.add(d.clone().multiplyByScalar(sol[0].fraction))
            const OX2 = OP.add(d.clone().multiplyByScalar(sol[1].fraction))
            return [
                new Point(OX1.x, OX1.y),
                new Point(OX2.x, OX2.y),
            ]
        }

        const OX1 = OP.add(d.clone().multiplyByScalar(sol[0].value))
        const OX2 = OP.add(d.clone().multiplyByScalar(sol[1].value))
        return [
            new Point(OX1.x, OX1.y),
            new Point(OX2.x, OX2.y),
        ]
    }

    get radius(): Root {
        return new Root().from(2, this.#squareRadius ?? 0)
    }

    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    public relativePosition(L: Line): number {
        if (this.#center === null || this.#squareRadius === null) {
            return -1
        }

        const distance = L.distanceTo(this.#center).pow(2).value
        const radius = this.#squareRadius.value

        if (distance - radius > 0.0000000001) {
            return 0 // external
        }

        if (Math.abs(distance - radius) < 0.0000000001) {
            return 1 // tangent
        }

        return 2 // secant
    }

    setRadius(radius: Fraction | number, square?: boolean): this {
        if (square) {
            this.#squareRadius = new Fraction(radius)
        } else {
            this.#squareRadius = new Fraction(radius).pow(2)
        }

        this.#calculateCartesian()
        return this
    }

    get squareRadius(): Fraction {
        return this.#squareRadius?.clone() ?? new Fraction(-1)
    }

    tangents = (P: Point | Fraction): Line[] => {
        if (P instanceof Fraction) {
            return this.#tangentsWithSlope(P)
        }

        if (this.isPointOnCircle(P)) {
            return this.#tangentsThroughOnePointOnTheCircle(P)
        }

        if (this.#center !== null && this.#center.distanceTo(P).value > this.radius.value) {
            return this.#tangentsThroughOnePointOutsideTheCircle(P)
        }

        return []
    }

    #calculateCartesian(): void {
        this.#equation = (
            new Equation(
                new Polynom(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`),
                new Polynom(this.squareRadius.display))
        ).moveLeft()
    }

    #reset() {
        this.#center = null
        this.#squareRadius = null
        this.#equation = null
    }

    #tangentsThroughOnePointOnTheCircle = (P: Point): Line[] => {
        const CT = new Vector(this.center, P)
        return [new Line().fromPointAndNormal(P, CT)]
    }

    #tangentsThroughOnePointOutsideTheCircle = (P: Point): Line[] => {
        // y = mx + h
        // px, py => h = -m px + py => mx - y -m.px + py = 0 =>
        // Centre: cx, cy, radius: r
        // (m.cx - cy -m.px + py)^2 = r^2  * (m^2  + 1)
        // (m(cx-py) - (cy - py))^2 = r^2  * (m^2  + 1)

        const cx_px = this.center.x.clone().subtract(P.x)
        const cy_py = this.center.y.clone().subtract(P.y)
        const polyLeft = new Polynom('x')
        const polyRight = new Polynom('x^2+1')

        polyLeft.multiply(cx_px).subtract(cy_py).pow(2)
        polyRight.multiply(this.squareRadius)

        const equ = new Equation(polyLeft, polyRight)

        const solutions = equ.solve()

        return solutions.map(sol => {
            //  h = -m px + py
            let h: Fraction
            const equ = new Equation('y', 'x')

            if (sol.exact) {
                h = P.x.clone().opposite().multiply(sol.fraction).add(P.y)
                equ.right.multiply(sol.fraction).add(h)
            } else {
                h = P.x.clone().opposite().multiply(sol.value).add(P.y)
                equ.right.multiply(sol.value).add(h)
            }

            return new Line(equ)
        })

    }

    #tangentsWithSlope = (slope: Fraction): Line[] => {
        // d(C;t)=r => ac1+bc2 + x = +- sqrt(a^2 + b^2)*r
        // x = -ac1-bc2  +-  sqrt(a^2 + b^2)*r
        // y = a/bx + h => ax-by + H = 0

        const a = slope.numerator, b = -slope.denominator, c1 = this.center.x.clone(), c2 = this.center.y.clone()

        const sq = this.squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2),
            x1 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt()),
            x2 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt())

        return [new Line(a, b, x1), new Line(a, b, x2)]
    }

}