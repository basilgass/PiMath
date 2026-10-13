import {Line} from "./line"
import {Vector} from "./vector"
import {Numeric} from "../numeric"
import {Fraction, Root} from "../coefficients"
import {Equation, Polynom} from "../algebra"
import {MathError} from "../errors"
import {type IDisplayDigits, type InputAlgebra, type IPiMathObject, type OutputStyle} from "../pimath.interface"
import {assertDigits} from "../helpers"
import {Point} from "./point"
import {Triangle} from "./triangle"
import {Solution} from "../analyze"

enum CircleDisplay {
    DEVELOPED,
    CENTER_RADIUS,
}

export enum CircleRelativePosition {
    INTERIOR,
    EXTERIOR,
    SECANT,
    TANGENT_INSIDE,
    TANGENT_OUTSIDE,
    SUPERPOSED,
    CONCENTRIC
}

/**
 * A circle of the plane, stored by its center and the square of its radius, so that everything stays exact.
 * Built from an equation (`"(x-1)^2+(y+2)^2=9"`), from a center and a radius, from a center and a point of
 * the circle, or from three points.
 * @example
 * new Circle("(x-1)^2+(y+2)^2=9").center.display // "(1;-2)"
 */
export class Circle
    implements IPiMathObject<Circle>, IDisplayDigits {

    #center: Point | undefined = undefined
    #equation: Equation | undefined = undefined
    #output_style: CircleDisplay = CircleDisplay.CENTER_RADIUS
    #squareRadius: Fraction | undefined = undefined
    #digits: number | null = null

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

    /**
     * Replace the circle with an equation, another circle, a center and a radius, a center and a point, or three points.
     * Arguments that do not match any form leave the circle unchanged.
     */
    parse(...values: unknown[]): this {
        if (typeof values[0] === 'string') {
            return this.copy(Circle.fromString(values[0]))
        }
        if (values[0] instanceof Equation) {
            return this.copy(Circle.fromEquation(values[0]))
        }
        if (values[0] instanceof Circle) {
            return this.copy(values[0])
        }
        if (values.length === 2 && values[0] instanceof Point && values[1] instanceof Point) {
            return this.copy(Circle.fromCenterPoint(values[0], values[1]))
        }
        if (values.length >= 2 && values[0] instanceof Point &&
            (values[1] instanceof Fraction || typeof values[1] === 'number')
        ) {
            return this.copy(Circle.fromCenterRadius(
                values[0], values[1],
                typeof values[2] === 'boolean' ? values[2] : false
            ))
        }
        if (values.length === 3 &&
            values[0] instanceof Point && values[1] instanceof Point && values[2] instanceof Point
        ) {
            return this.copy(Circle.fromPoints(values[0], values[1], values[2]))
        }
        return this
    }

    clone(): this {
        if (this.#center === undefined || this.#squareRadius === undefined) {
            return new Circle() as this
        }
        const c = Circle.fromCenterRadius(this.#center, this.#squareRadius, true)
        c.#output_style = this.#output_style
        return c.withDigits(this.#digits) as this
    }

    /** @see IDisplayDigits.withDigits */
    withDigits(digits: number | null): this {
        this.#digits = assertDigits(digits)
        this.#center?.withDigits(digits)
        this.#squareRadius?.withDigits(digits)
        this.#equation?.withDigits(digits)
        return this
    }

    copy(circle: Circle): this {
        if (circle.#center === undefined || circle.#squareRadius === undefined) {
            this.#reset()
            return this
        }
        this.#center = circle.#center.clone()
        this.#squareRadius = circle.#squareRadius.clone()
        this.#output_style = CircleDisplay.CENTER_RADIUS
        this.#computeEquation()
        // the display state of the receiver is kept (the copied values come with the other's)
        return this.withDigits(this.#digits)
    }

    get tex(): string {
        return this.#toOutput('tex')
    }

    get display(): string {
        return this.#toOutput('display')
    }

    /**
     * Output option: the developed equation `x^2+y^2-2x+4y-4=0`. Chainable, persistent.
     */
    get asDeveloped(): this {
        this.#output_style = CircleDisplay.DEVELOPED
        return this
    }

    /**
     * Output option: the form `(x-a)^2+(y-b)^2=r^2` (default). Chainable, persistent.
     */
    get asCenterRadius(): this {
        this.#output_style = CircleDisplay.CENTER_RADIUS
        return this
    }

    /**
     * The center, as a point.
     */
    get center(): Point {
        return this.#center ?? new Point()
    }

    /**
     * The equation `(x-a)^2+(y-b)^2-r^2=0`, as an {@link Equation} (a copy).
     */
    get equation(): Equation {
        return this.#equation?.clone() ?? new Equation('0=0')
    }

    /**
     * The circle with the given center, through a point.
     */
    static fromCenterPoint(center: Point, pointThrough: Point): Circle {
        const c = new Circle()
        c.#center = center.clone()
        c.#squareRadius = new Vector(c.#center, pointThrough).normSquare
        c.#computeEquation()
        return c
    }

    /**
     * The circle with the given center and radius.
     * @param square - when true, `radius` is already the square of the radius.
     */
    static fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): Circle {
        const c = new Circle()
        c.#center = center.clone()
        c.#squareRadius = square ? new Fraction(radius) : new Fraction(radius).pow(2)
        c.#computeEquation()
        return c
    }

    /**
     * Does not mutate the input.
     * @throws {MathError} if the input is not a valid circle equation
     */
    static fromEquation(value: InputAlgebra<Equation>): Circle {
        const c = new Circle()
        const eq = new Equation(value)
        eq.moveLeft()

        if (eq.degree('x').value !== 2 || eq.degree('y').value !== 2) {
            throw new MathError('Cannot create a Circle: equation must be degree 2 in both x and y')
        }

        const x2 = eq.left.monomByDegree(2, 'x')
        const y2 = eq.left.monomByDegree(2, 'y')

        if (!x2.coefficient.isEqual(y2.coefficient)) {
            throw new MathError('Cannot create a Circle: coefficients of x² and y² must be equal')
        }

        eq.divide(x2.coefficient)

        const x1 = eq.left.monomByDegree(1, 'x')
        const y1 = eq.left.monomByDegree(1, 'y')
        const constant = eq.left.monomByDegree(0)

        c.#center = new Point(
            x1.coefficient.clone().divide(2).opposite(),
            y1.coefficient.clone().divide(2).opposite()
        )
        c.#squareRadius = constant.coefficient.clone().opposite()
            .add(c.#center.x.clone().pow(2))
            .add(c.#center.y.clone().pow(2))

        c.#computeEquation()
        return c
    }

    /**
     * The circle through three points.
     * @throws {MathError} if the points are collinear or two of them are the same.
     */
    static fromPoints(A: Point, B: Point, C: Point): Circle {
        const T = new Triangle(A, B, C)

        if (!T.isValid) {
            throw new MathError('Cannot create a Circle: points must form a non-degenerate triangle')
        }

        const mAB = T.getMediators().c.clone()
        const mAC = T.getMediators().b.clone()

        const center = mAB.intersection(mAC)
        if (!center.hasIntersection) {
            throw new MathError('Cannot find circumcenter: mediators do not intersect')
        }
        return Circle.fromCenterPoint(center.point, A)
    }

    /**
     * The circle of an equation written in a string.
     * @throws {MathError} if the equation is not the one of a circle.
     */
    static fromString(str: string): Circle {
        return Circle.fromEquation(str)
    }

    /**
     * The points of the circle with integer coordinates relative to the center. It is empty when the square of the
     * radius is not an integer.
     */
    getPointsOnCircle(): Point[] {
        // It means searching for pythagorician triples that make a perfect square.
        // (x-4)^2 + (y+3)^2 = 15
        // A non-integer squared radius has no integer lattice points; guard the
        // integer contract of pythagoreanTripletsWithTarget (which now throws).
        // TODO: also return exact fractional points (see .claude/docs/todo.md).
        const squareRadius = this.squareRadius.value
        if (!Number.isInteger(squareRadius) || squareRadius < 0) {
            return []
        }

        const triplets = Numeric.pythagoreanTripletsWithTarget(squareRadius, true)

        const points: Point[] = []

        triplets.forEach(triplet => {
            // Allow positive / negative values
            // x-a = t  => x = a + t
            // x-a = -t => x = a - t
            for (const k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                // check if the point is not already here.
                const x = this.center.x.clone().add(k[0] * triplet[0])
                const y = this.center.y.clone().add(k[1] * triplet[1])

                if (points.every(pt => !pt.isEqualXY(x, y))) {
                    points.push(new Point(x, y))
                }

            }
        })
        return points
    }

    /**
     * True when the point satisfies the equation of the circle.
     */
    isPointOnCircle(P: Point): boolean {
        return this.#equation?.test({x: P.x, y: P.y}) ?? false
    }

    /**
     * True when both circles have the same center and the same radius.
     */
    isEqual(circ: Circle): boolean {
        return circ.center.isEqual(this.center)
            && circ.squareRadius.isEqual(this.squareRadius)
    }

    /**
     * Find the intersection points between the circle and a line. It can be 0, 1 or 2 points.
     * The points are sorted depending on the direction vector of the line.
     */
    intersection(L: Line): Point[] {
        if (this.#equation === undefined) return []

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

        if (sol.length === 0) return []

        // One intersection point
        if (sol.length === 1) { // means exact answer
            const OX = OP.clone().add(d.clone().multiplyByScalar(sol[0].fraction))
            return [
                new Point(OX.x, OX.y)
            ]
        }

        // Two intersection points
        // `exact` also covers quadratic radicals, whose `fraction` drops the irrational part: only a
        // rational solution can use it, an irrational one needs its numeric value.
        const OX1 = sol[0].root.isZero()
            ? OP.clone().add(d.clone().multiplyByScalar(sol[0].fraction))
            : OP.clone().add(d.clone().multiplyByScalar(sol[0].value))

        const OX2 = sol[1].root.isZero()
            ? OP.clone().add(d.clone().multiplyByScalar(sol[1].fraction))
            : OP.clone().add(d.clone().multiplyByScalar(sol[1].value))

        // sort the points depending on the direction vector.
        return [
            new Point(OX1.x, OX1.y),
            new Point(OX2.x, OX2.y),
        ].sort((a, b) => {
            // <0 => a before
            if (d.x.isZero()) {
                return d.y.isPositive()
                    ? a.y.value - b.y.value
                    : b.y.value - a.y.value
            }

            return d.x.isPositive()
                ? a.x.value - b.x.value
                : b.x.value - a.x.value
        })
    }

    /**
     * The radius, as an exact reduced {@link Root} (`3`, `2sqrt(2)`).
     */
    get radius(): Root {
        return new Root().from(2, this.#squareRadius ?? 0).reduce()
    }

    /**
     * Returns the number of intersections between circle and line.
     * @returns 0 = external, 1 = tangent, 2 = secant
     * @throws {MathError} if the circle is uninitialized
     */
    relativePosition(L: Line): 0 | 1 | 2
    /**
     * Returns the relative position between two circles.
     * @throws {MathError} if the circle is uninitialized
     */
    relativePosition(C: Circle): CircleRelativePosition
    relativePosition(other: Line | Circle): 0 | 1 | 2 | CircleRelativePosition {
        if (this.#center === undefined || this.#squareRadius === undefined) {
            throw new MathError('Circle is not initialized')
        }

        if (other instanceof Circle) {
            const d2 = new Vector(this.center, other.center).normSquare
            const SR1 = this.squareRadius
            const SR2 = other.squareRadius

            if (d2.isZero()) {
                return SR1.isEqual(SR2)
                    ? CircleRelativePosition.SUPERPOSED
                    : CircleRelativePosition.CONCENTRIC
            }

            // A = d² − r1² − r2² ; equals +2r1r2 when d=r1+r2, −2r1r2 when d=|r1−r2|
            // B = (2r1r2)² = 4·r1²·r2²  →  A²=B iff d is tangent
            const A = d2.clone().subtract(SR1).subtract(SR2)
            const B = SR1.clone().multiply(SR2).multiply(4)
            const ASquaredMinusB = A.clone().pow(2).subtract(B)

            if (ASquaredMinusB.isZero()) {
                return A.isNegative()
                    ? CircleRelativePosition.TANGENT_INSIDE
                    : CircleRelativePosition.TANGENT_OUTSIDE
            }

            if (!ASquaredMinusB.isNegative()) {
                return A.isNegative()
                    ? CircleRelativePosition.INTERIOR
                    : CircleRelativePosition.EXTERIOR
            }

            return CircleRelativePosition.SECANT
        }

        const distance = other.distanceTo(this.#center).pow(2).value
        const radius = this.#squareRadius.value

        if (distance - radius > 0.0000000001) {
            return 0
        }

        if (Math.abs(distance - radius) < 0.0000000001) {
            return 1
        }

        return 2
    }

    /**
     * The values returned by {@link relativePosition} for two circles.
     */
    static RELATIVE_POSITION = CircleRelativePosition

    /**
     * Change the radius.
     * @param square - when true, `radius` is the square of the radius.
     */
    setRadius(radius: Fraction | number, square?: boolean): this {
        if (square) {
            this.#squareRadius = new Fraction(radius)
        } else {
            this.#squareRadius = new Fraction(radius).pow(2)
        }

        this.#computeEquation()
        return this
    }

    /**
     * The square of the radius, as an exact fraction. It is `-1` for a circle that has not been defined.
     */
    get squareRadius(): Fraction {
        return this.#squareRadius?.clone() ?? new Fraction(-1)
    }

    /**
     * Returns the tangent line(s) to the circle.
     * - `P: Point` on the circle → 1 tangent (perpendicular to the radius at P).
     * - `P: Point` outside the circle → 2 tangents through P.
     * - `P: Point` inside the circle → [] (no real tangent).
     * - `P: Fraction` → 2 tangents with slope P.
     */
    tangents(P: Point | Fraction): Line[] {
        if (P instanceof Fraction) {
            return this.#tangentsWithSlope(P)
        }

        if (this.isPointOnCircle(P)) {
            return this.#tangentsThroughOnePointOnTheCircle(P)
        }

        if (this.#center !== undefined && this.#center.distanceTo(P).value > this.radius.value) {
            return this.#tangentsThroughOnePointOutsideTheCircle(P)
        }

        return []
    }

    #toOutput(style: OutputStyle): string {
        if (this.#output_style === CircleDisplay.DEVELOPED) {
            const eq = this.equation.moveLeft().reduce().withDigits(this.#digits)
            return style === 'tex' ? eq.tex : eq.display
        }

        const center = this.center
        const absX = center.x.clone().abs()
        const absY = center.y.clone().abs()
        const sr = this.squareRadius

        const cx = center.x.isZero()
            ? 'x^2'
            : style === 'tex'
                ? `\\left(x${center.x.isNegative() ? '+' : '-'}${absX.tex}\\right)^2`
                : `(x${center.x.isNegative() ? '+' : '-'}${absX.display})^2`

        const cy = center.y.isZero()
            ? 'y^2'
            : style === 'tex'
                ? `\\left(y${center.y.isNegative() ? '+' : '-'}${absY.tex}\\right)^2`
                : `(y${center.y.isNegative() ? '+' : '-'}${absY.display})^2`

        return `${cx}+${cy}=${style === 'tex' ? sr.tex : sr.display}`
    }

    #computeEquation(): void {
        const x = Polynom.fromCoefficients('x', 1, this.center.x.clone().opposite()).pow(2)
        const y = Polynom.fromCoefficients('y', 1, this.center.y.clone().opposite()).pow(2)
        const k = Polynom.fromConstant(this.squareRadius)
        this.#equation = (
            new Equation(x.add(y).subtract(k), 0)
        ).withDigits(this.#digits)
    }

    #reset() {
        this.#center = undefined
        this.#squareRadius = undefined
        this.#equation = undefined
    }

    #tangentsThroughOnePointOnTheCircle(P: Point): Line[] {
        const CT = new Vector(this.center, P)
        return [Line.fromPointAndNormal(P, CT)]
    }

    #tangentsThroughOnePointOutsideTheCircle(P: Point): Line[] {
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
            // an irrational slope has no exact Fraction: approximate it from its numeric value
            const m = sol.root.isZero() ? sol.fraction : new Fraction(sol.value)
            const h = P.x.clone().opposite().multiply(m).add(P.y)
            const equ = new Equation('y', 'x')
            equ.right.multiply(m).add(h)

            return new Line(equ)
        })

    }

    #tangentsWithSlope(slope: Fraction): Line[] {
        // d(C;t)=r => ac1+bc2 + x = +- sqrt(a^2 + b^2)*r
        // x = -ac1-bc2  +-  sqrt(a^2 + b^2)*r
        // y = a/bx + h => ax-by + H = 0

        const a = slope.numerator
        const b = -slope.denominator
        const c1 = this.center.x.clone()
        const c2 = this.center.y.clone()

        const sq = this.squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2)
        const x1 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt())
        const x2 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt())

        return [new Line(a, b, x1), new Line(a, b, x2)]
    }
}
