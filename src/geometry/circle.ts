import {Line} from "./line"
import {Vector} from "./vector"
import {Numeric} from "../numeric"
import {Fraction, Root} from "../coefficients"
import {Equation, Polynom} from "../algebra"
import {MathError} from "../errors"
import {type IPiMathObject, type OutputStyle} from "../pimath.interface"
import {Point} from "./point"
import {Triangle} from "./triangle"
import {Solution} from "../analyze"

enum CircleDisplay {
    CANONICAL,
    CENTER_RADIUS,
}

export class Circle
    implements IPiMathObject<Circle> {

    #center: Point | null = null
    #equation: Equation | null = null
    #output_style: CircleDisplay = CircleDisplay.CENTER_RADIUS
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

    clone(): Circle {
        if (this.#center === null || this.#squareRadius === null) {
            return new Circle()
        }
        const c = Circle.fromCenterRadius(this.#center, this.#squareRadius, true)
        c.#output_style = this.#output_style
        return c
    }

    copy(circle: Circle): this {
        if (circle.#center === null || circle.#squareRadius === null) {
            this.#reset()
            return this
        }
        this.#center = circle.#center.clone()
        this.#squareRadius = circle.#squareRadius.clone()
        this.#calculateCartesian()
        return this
    }

    get tex(): string {
        return this.#toOutput('tex')
    }

    get display(): string {
        return this.#toOutput('display')
    }

    get asCanonical(): this {
        this.#output_style = CircleDisplay.CANONICAL
        return this
    }

    get asCenterRadius(): this {
        this.#output_style = CircleDisplay.CENTER_RADIUS
        return this
    }

    get center(): Point {
        return this.#center ?? new Point()
    }

    get equation(): Equation {
        return this.#equation?.clone() ?? new Equation('0=0')
    }

    static fromCenterPoint(center: Point, pointThrough: Point): Circle {
        const c = new Circle()
        c.#center = center.clone()
        c.#squareRadius = new Vector(c.#center, pointThrough).normSquare
        c.#calculateCartesian()
        return c
    }

    /**
     * @param square if true, `radius` is already r² (avoids an extra squaring)
     */
    static fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): Circle {
        const c = new Circle()
        c.#center = center.clone()
        c.#squareRadius = square ? new Fraction(radius) : new Fraction(radius).pow(2)
        c.#calculateCartesian()
        return c
    }

    /**
     * Does not mutate `equ`.
     * @throws {MathError} if `equ` is not a valid circle equation
     */
    static fromEquation(equ: Equation): Circle {
        const c = new Circle()
        const eq = equ.clone()
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

        c.#calculateCartesian()
        return c
    }

    /** @throws {MathError} if A, B, C are collinear or form a degenerate triangle */
    static fromPoints(A: Point, B: Point, C: Point): Circle {
        const T = new Triangle(A, B, C)

        if (!T.isValid || !T.remarquables) {
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

    static fromString(str: string): Circle {
        return Circle.fromEquation(new Equation(str))
    }

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

    isPointOnCircle(P: Point): boolean {
        return this.#equation?.test({x: P.x, y: P.y}) ?? false
    }

    isEqual(circ: Circle): boolean {
        return circ.center.isEqual(this.center)
            && circ.squareRadius.isEqual(this.squareRadius)
    }

    /**
     * Find the intersection points between the circle and a line. It can be 0, 1 or 2 points.
     * The points are sorted depending on the direction vector of the line.
     * @param L
     */
    lineIntersection(L: Line): Point[] {
        if (this.#equation === null) return []

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
        const OX1 = sol[0].exact
            ? OP.clone().add(d.clone().multiplyByScalar(sol[0].fraction))
            : OP.clone().add(d.clone().multiplyByScalar(sol[0].value))

        const OX2 = sol[1].exact
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

    get radius(): Root {
        return new Root().from(2, this.#squareRadius ?? 0)
    }

    /**
     * Returns the number of intersections between circle and line.
     * @returns 0 = external, 1 = tangent, 2 = secant
     * @throws {MathError} if the circle is uninitialized
     */
    relativePosition(L: Line): 0 | 1 | 2 {
        if (this.#center === null || this.#squareRadius === null) {
            throw new MathError('Circle is not initialized')
        }

        const distance = L.distanceTo(this.#center).pow(2).value
        const radius = this.#squareRadius.value

        if (distance - radius > 0.0000000001) {
            return 0
        }

        if (Math.abs(distance - radius) < 0.0000000001) {
            return 1
        }

        return 2
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

        if (this.#center !== null && this.#center.distanceTo(P).value > this.radius.value) {
            return this.#tangentsThroughOnePointOutsideTheCircle(P)
        }

        return []
    }

    #toOutput(style: OutputStyle): string {
        if (this.#output_style === CircleDisplay.CANONICAL) {
            const eq = this.equation.moveLeft().reduce()
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

    #calculateCartesian(): void {
        const x = Polynom.fromCoefficients('x', 1, this.center.x.clone().opposite()).pow(2)
        const y = Polynom.fromCoefficients('y', 1, this.center.y.clone().opposite()).pow(2)
        const k = Polynom.fromConstant(this.squareRadius)
        this.#equation = (
            new Equation(x.add(y).subtract(k), 0)
        )
    }

    #reset() {
        this.#center = null
        this.#squareRadius = null
        this.#equation = null
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