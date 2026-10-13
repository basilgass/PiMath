/**
 * This class works for 2d line in a plane.
 */

import {Numeric} from "../numeric"
import {Fraction} from "../coefficients"
import {Equation, Monom, Polynom} from "../algebra"
import {Vector} from "./vector"
import {type IDisplayDigits, type InputAlgebra, type InputValue, type IPiMathObject, type LineIntersection, LineProperty, type OutputStyle} from "../pimath.interface"
import {randomIntSym} from "../randomization/rndHelpers"
import {Point} from "./point"
import {Root} from "../coefficients/root"
import {ParseError} from "../errors"
import {assertDigits} from "../helpers"

enum LineDisplay {
    CARTESIAN,
    CANONICAL,
    MXH,
    PARAMETRIC,
    SYSTEM
}

enum LineDirection {
    LEFT_TO_RIGHT = 'lr',
    RIGHT_TO_LEFT = 'rl'
}

/**
 * A line of the plane, stored by the coefficients of `ax + by + c = 0` and a point of the line.
 * Built from an equation (`"2x+3y-6=0"`), two points, a point and a direction vector, or three coefficients.
 * The output defaults to the canonical form; {@link asCartesian}, {@link asMxh}, {@link asParametric} and
 * {@link asSystem} choose another one for the next `tex` or `display` only.
 * @example
 * new Line("2x+3y-6=0").slope.display // "-2/3"
 */
export class Line implements IPiMathObject<Line>, IDisplayDigits {
    /**
     * Constant to give to {@link fromPointAndLine}: build the parallel line.
     */
    static PARALLEL = LineProperty.Parallel
    /**
     * Constant to give to {@link fromPointAndLine}: build the perpendicular line.
     */
    static PERPENDICULAR = LineProperty.Perpendicular
    #OA: Vector
    // ax + by + c = 0
    #a: Fraction
    #b: Fraction
    #c: Fraction
    #orientation: LineDirection
    // output mode.
    #outputMode: LineDisplay = LineDisplay.CANONICAL
    #decimals: number | null = null

    constructor(...values: unknown[]) {
        this.#a = new Fraction(0)
        this.#b = new Fraction(0)
        this.#c = new Fraction(0)
        this.#OA = new Vector()
        this.#orientation = LineDirection.LEFT_TO_RIGHT

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    // ------------------------------------------
    /**
     * Replace the line with an equation, another line, two points, a point and a vector, or three coefficients.
     * @throws {ParseError} if the arguments do not describe a line.
     */
    parse(...values: unknown[]): this {
        if (values.length === 0) {
            return this
        }

        if (values.length === 1) {
            if (values[0] instanceof Line) {
                return this.copy(values[0])
            }

            if (values[0] instanceof Equation) {
                return this.copy(Line.fromEquation(values[0]))
            }

            if (typeof values[0] === 'string') {
                try {
                    return this.copy(Line.fromEquation(values[0]))
                } catch (e) {
                    throw new ParseError(`Cannot parse "${values[0]}" as a Line`, {cause: e})
                }
            }
        }

        if (values.length === 2) {
            if (values[0] instanceof Point && values[1] instanceof Point) {
                return this.copy(Line.fromPoints(values[0], values[1]))
            }

            if (values[0] instanceof Point && values[1] instanceof Vector) {
                return this.copy(Line.fromPointAndDirection(values[0], values[1]))
            }
        }

        if (values.length === 3 && values.every(x => Fraction.isFraction(x as InputValue<Fraction>))) {
            return this.copy(Line.fromCoefficient(
                values[0] as InputValue<Fraction>,
                values[1] as InputValue<Fraction>,
                values[2] as InputValue<Fraction>
            ))
        }

        throw new ParseError('Cannot parse arguments as a Line')
    }

    // ------------------------------------------
    // Getter and setter

    copy(value: Line): this {
        this.#a = value.#a.clone()
        this.#b = value.#b.clone()
        this.#c = value.#c.clone()
        this.#OA = value.#OA.clone()
        this.#orientation = value.#orientation
        this.#outputMode = LineDisplay.CANONICAL
        this.#decimals = null
        return this
    }

    clone(): this {
        const obj = new Line() as this
        obj.copy(this)
        obj.#outputMode = this.#outputMode
        obj.#decimals = this.#decimals
        return obj
    }

    get tex(): string {
        const mode = this.#outputMode
        this.#outputMode = LineDisplay.CANONICAL
        return this.#toOutput('tex', mode, this.#decimals)
    }

    get display(): string {
        const mode = this.#outputMode
        this.#outputMode = LineDisplay.CANONICAL
        return this.#toOutput('display', mode, this.#decimals)
    }

    #toOutput(style: OutputStyle, mode: LineDisplay, decimals: number | null): string {
        if (decimals !== null) {
            switch (mode) {
                case LineDisplay.CARTESIAN:
                    return this.#decimalLHS(false, decimals) + '=' + (-this.#c.value).toFixed(decimals)
                case LineDisplay.MXH:
                    return this.#decimalMxh(decimals)
                case LineDisplay.PARAMETRIC: {
                    const d = this.d.clone().simplify()
                    const ox = this.#OA.x.value.toFixed(decimals)
                    const oy = this.#OA.y.value.toFixed(decimals)
                    const dx = d.x.value.toFixed(decimals)
                    const dy = d.y.value.toFixed(decimals)
                    if (style === 'tex') {
                        return `${Vector.asTex('x', 'y')} = ${Vector.asTex(ox, oy)} + k\\cdot ${Vector.asTex(dx, dy)}`
                    }
                    return `((x,y))=((${ox},${oy}))+k((${dx},${dy}))`
                }
                case LineDisplay.SYSTEM: {
                    const d = this.d.clone().simplify()
                    const exprX = this.#decimalKExpr(this.#OA.x, d.x, decimals)
                    const exprY = this.#decimalKExpr(this.#OA.y, d.y, decimals)
                    if (style === 'tex') {
                        return `\\left\\{\\begin{aligned}\n\tx &= ${exprX}\\\\\n\ty &= ${exprY}\n\\end{aligned}\\right.`
                    }
                    return `{(x,=,${exprX}),(y,=,${exprY}):}`
                }
                default: // CANONICAL
                    return this.#decimalLHS(true, decimals) + '=0'
            }
        }

        switch (mode) {
            case LineDisplay.CARTESIAN:
                return this.getEquation().reorder()[style]
            case LineDisplay.MXH:
                return this.slope.isInfinity() ?
                    'x=' + this.OA.x[style] :
                    'y=' + new Polynom().parse('x', this.slope, this.height)[style]
            case LineDisplay.PARAMETRIC: {
                const d = this.d.clone().simplify()
                if (style === 'tex') {
                    return `${Vector.asTex('x', 'y')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex)} + k\\cdot ${Vector.asTex(d.x.tex, d.y.tex)}`
                }
                return `((x,y))=((${this.#OA.x.display},${this.#OA.y.display}))+k((${d.x.display},${d.y.display}))`
            }
            case LineDisplay.SYSTEM: {
                const d = this.d.clone().simplify()
                if (style === 'tex') {
                    return `\\left\\{\\begin{aligned}\n\tx &= ${(new Polynom(this.#OA.x)
                        .add(new Monom(d.x).multiply(new Monom('k'))))
                        .reorder('k', true)
                        .tex}\\\\\n\ty &= ${(new Polynom(this.#OA.y)
                        .add(new Monom(d.y).multiply(new Monom('k'))))
                        .reorder('k', true)
                        .tex}\n\\end{aligned}\\right.`
                }
                const px = (new Polynom(this.#OA.x).add(new Monom(d.x).multiply(new Monom('k'))))
                    .reorder('k', true)
                const py = (new Polynom(this.#OA.y).add(new Monom(d.y).multiply(new Monom('k'))))
                    .reorder('k', true)
                return `{(x,=,${px.display}),(y,=,${py.display}):}`
            }
            default: {
                const canonical = this.getEquation()
                if (canonical.left.monoms[0].coefficient.isNegative()) {
                    canonical.multiply(-1)
                }
                return canonical[style]
            }
        }
    }

    #decimalLHS(includeC: boolean, decimals: number): string {
        let lhs = ''

        if (!this.#a.isZero()) {
            lhs = this.#a.value.toFixed(decimals) + 'x'
        }

        if (!this.#b.isZero()) {
            if (lhs !== '' && this.#b.isPositive()) {
                lhs += '+'
            }
            lhs += this.#b.value.toFixed(decimals) + 'y'
        }

        if (includeC && !this.#c.isZero()) {
            if (lhs !== '' && this.#c.isPositive()) {
                lhs += '+'
            }
            lhs += this.#c.value.toFixed(decimals)
        }

        return lhs
    }

    #decimalMxh(decimals: number): string {
        if (this.slope.isInfinity()) {
            return 'x=' + this.OA.x.value.toFixed(decimals)
        }
        const slopeStr = this.slope.value.toFixed(decimals)
        const heightVal = this.height.value
        let result = 'y=' + slopeStr + 'x'
        if (heightVal > 0) {
            result += '+' + heightVal.toFixed(decimals)
        } else if (heightVal < 0) {
            result += heightVal.toFixed(decimals)
        }
        return result
    }

    #decimalKExpr(A: Fraction, B: Fraction, decimals: number): string {
        let expr = ''
        if (!A.isZero()) {
            expr = A.value.toFixed(decimals)
        }
        if (!B.isZero()) {
            if (expr !== '' && B.isPositive()) {
                expr += '+'
            }
            expr += B.value.toFixed(decimals) + 'k'
        }
        return expr || '0'
    }

    /**
     * A point of the line, as a vector. Setting it moves the line through that point and keeps its direction.
     */
    get OA(): Vector {
        return this.#OA
    }

    set OA(value: Vector | Point) {
        this.copy(Line.fromPointAndNormal(value, this.n))
    }

    /**
     * Coefficient of `x` in `ax + by + c = 0`. Setting it does not update the reference point {@link OA}.
     */
    get a(): Fraction {
        return this.#a
    }

    set a(value: Fraction) {
        this.#a = value
    }

    /**
     * Output option for the next `tex` or `display`: `ax+by+c=0` (default). Chainable.
     */
    get asCanonical(): this {
        this.#outputMode = LineDisplay.CANONICAL
        return this
    }

    /**
     * Output option for the next `tex` or `display`: `ax+by=-c`. Chainable.
     */
    get asCartesian(): this {
        this.#outputMode = LineDisplay.CARTESIAN
        return this
    }

    /**
     * Output option for the next `tex` or `display`: `y=mx+h`, or `x=k` for a vertical line. Chainable.
     */
    get asMxh(): this {
        this.#outputMode = LineDisplay.MXH
        return this
    }

    /**
     * Output option for the next `tex` or `display`: a point and a direction vector. Chainable.
     */
    get asParametric(): this {
        this.#outputMode = LineDisplay.PARAMETRIC
        return this
    }

    /**
     * Output option for the next `tex` or `display`: the parametric system of `x` and `y`. Chainable.
     */
    get asSystem(): this {
        this.#outputMode = LineDisplay.SYSTEM
        return this
    }

    /**
     * Show the coefficients as decimals with `digits` digits, in every output mode. Persistent
     * (copied by `clone()`); `null` goes back to the exact output.
     * @throws {InvalidArgumentError} if `digits` is neither `null` nor an integer from 0 to 100.
     */
    withDigits(digits: number | null): this {
        this.#decimals = assertDigits(digits)
        return this
    }

    /**
     * Coefficient of `y` in `ax + by + c = 0`. Setting it does not update the reference point {@link OA}.
     */
    get b(): Fraction {
        return this.#b
    }

    set b(value: Fraction) {
        this.#b = value
    }

    /**
     * Constant term in `ax + by + c = 0`. Setting it does not update the reference point {@link OA}.
     */
    get c(): Fraction {
        return this.#c
    }

    set c(value: Fraction) {
        this.#c = value
    }

    /**
     * Direction vector `(b, -a)`, oriented to the right unless the line was built from a direction pointing
     * to the left. Setting it keeps the point {@link OA} and changes the direction.
     */
    get d(): Vector {
        const director = new Vector(this.#b.clone(), this.#a.clone().opposite())

        if (
            this.#orientation === LineDirection.LEFT_TO_RIGHT && director.x.isNegative() ||
            this.#orientation === LineDirection.RIGHT_TO_LEFT && director.x.isPositive()
        ) {
            director.opposite()
        }

        return director
    }

    set d(value: Vector) {
        this.copy(Line.fromPointAndDirection(this.OA, value))
    }

    /**
     * Same as {@link d}.
     */
    get director(): Vector {
        return this.d
    }

    /**
     * Distance from a point to the line, as an exact reduced {@link Root}.
     */
    distanceTo(pt: Point): Root {
        const numerator = pt.x.clone().multiply(this.#a)
            .add(pt.y.clone().multiply(this.#b))
            .add(this.#c).abs()
        const d2 = this.normal.normSquare

        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return new Root(0)
        }

        return new Root().from(2, d2.inverse(), numerator).reduce()
    }

    // ------------------------------------------
    // Static construction methods

    /**
     * Build the line `ax + by + c = 0`. Fractional coefficients are multiplied to become integers.
     */
    static fromCoefficient(a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>): Line {
        const line = new Line()
        line.#a = new Fraction(a)
        line.#b = new Fraction(b)
        line.#c = new Fraction(c)

        // make sure the coefficients are relative...
        const lcm = [line.#a, line.#b, line.#c].every(k => k.exact)
            ? Numeric.lcm(line.#a.denominator, line.#b.denominator, line.#c.denominator)
            : 1

        if (lcm > 1) {
            line.#a.multiply(lcm).reduce()
            line.#b.multiply(lcm).reduce()
            line.#c.multiply(lcm).reduce()
        }

        if (line.#b.isZero()) {
            // ax+c=0 => x = -c/a
            line.#OA = new Vector(line.#c.clone().divide(line.#a).opposite(), 0)
            return line
        }

        // ax+by+c=0 => x=0 => y = a/b x - c/b = (ax-c)/b
        for (let x = 0; x < line.#b.value; x++) {
            const y = line.#a.clone().divide(line.#b)
                .multiply(x)
                .subtract(line.#c.clone().divide(line.#b))
                .reduce()

            line.#OA = new Vector(x, y)

            if (y.isRelative()) {
                return line
            }
        }

        // no "nice" point... do it with 'x=0'
        const y = line.#c.clone().divide(line.#b).opposite().reduce()
        line.#OA = new Vector(0, y)

        return line
    }

    /**
     * Build a line from an equation in `x` and `y` of the first degree.
     * @throws {ParseError} if the equation has no `x` or `y`, has another variable, or is not linear.
     */
    static fromEquation(value: InputAlgebra<Equation>): Line {
        const equ = new Equation(value)
        equ.reorder(true)

        const variables = new Set(equ.variables)

        if (!(variables.has('x') || variables.has('y'))) {
            throw new ParseError('Equation must contain at least x or y to define a line')
        }

        for (const elem of ['x', 'y']) {
            variables.delete(elem)
        }

        if (variables.size > 0) {
            throw new ParseError(`Equation contains unknown variable(s): ${[...variables].join(', ')}`)
        }

        if (equ.left.degree('x').value > 1 || equ.left.degree('y').value > 1) {
            throw new ParseError('Equation must be linear (degree ≤ 1) to define a line')
        }

        return Line.fromCoefficient(
            equ.left.monomByVariable('x').coefficient,
            equ.left.monomByVariable('y').coefficient,
            equ.left.monomByDegree(0).coefficient
        )
    }

    /**
     * The line through `point` parallel to `parallel`.
     */
    static fromParallel(parallel: Line, point: Point): Line {
        return Line.fromPointAndNormal(point, parallel.n)
    }

    /**
     * The line through `point` perpendicular to `perpendicular`.
     */
    static fromPerpendicular(perpendicular: Line, point: Point): Line {
        return Line.fromPointAndNormal(point, perpendicular.d)
    }

    /**
     * The line through a point with a direction vector.
     * @throws {ParseError} if the vector is zero.
     */
    static fromPointAndDirection(P: Point | Vector, d: Vector): Line {
        const line = Line.fromPointAndNormal(P, d.clone().normal())
        line.#orientation = d.x.isPositive()
            ? LineDirection.LEFT_TO_RIGHT
            : LineDirection.RIGHT_TO_LEFT
        return line
    }

    /**
     * The line through a point, parallel (default) or perpendicular to a line.
     * @param orientation - {@link Line.PARALLEL} or {@link Line.PERPENDICULAR}.
     */
    static fromPointAndLine(P: Point | Vector, L: Line, orientation: LineProperty = LineProperty.Parallel): Line {
        if (orientation === LineProperty.Perpendicular) {
            return Line.fromPointAndNormal(P, L.director)
        }
        return Line.fromPointAndNormal(P, L.normal)
    }

    /**
     * The line through a point with a normal vector.
     * @throws {ParseError} if the normal vector is zero.
     */
    static fromPointAndNormal(P: Point | Vector, n: Vector): Line {
        if (n.isZero()) {
            throw new ParseError('Normal vector cannot be zero')
        }

        const line = Line.fromCoefficient(
            n.x,
            n.y,
            P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposite()
        )

        line.#OA = new Vector(P.clone())

        return line
    }

    /**
     * The line through two points.
     * @throws {ParseError} if the points are the same.
     */
    static fromPoints(A: Point, B: Point): Line {
        return Line.fromPointAndNormal(A, new Vector(A, B).normal())
    }

    // ------------------------------------------
    /**
     * The equation `ax + by + c = 0` with integer coefficients, as an {@link Equation}.
     */
    getEquation(): Equation {
        const equ = new Equation(new Polynom().parse('xy', this.#a, this.#b, this.#c), new Polynom('0'))
        return equ.simplify()
    }

    /** Returns an invalid (NaN) Fraction if the line is vertical (no y term). */
    getValueAtX(value: Fraction | number): Fraction {
        const equ = this.getEquation()
        const F = new Fraction(value)

        if (!equ.canIsolate('y')) {
            return new Fraction().invalid()
        }
        return equ.isolate('y').right.evaluate({x: F})
    }

    /** Returns an invalid (NaN) Fraction if the line is horizontal (no x term). */
    getValueAtY(value: Fraction | number): Fraction {
        const equ = this.getEquation()
        const F = new Fraction(value)

        if (!equ.canIsolate('x')) {
            return new Fraction().invalid()
        }
        return equ.isolate('x').right.evaluate({y: F})
    }

    /**
     * Intercept `h` of `y = mx + h`: `-c/b`. Infinite for a vertical line.
     */
    get height(): Fraction {
        return this.#c.clone().opposite().divide(this.#b)
    }

    /**
     * True when the line crosses the segment `[AB]`, ends included.
     */
    hitSegment(A: Point, B: Point): boolean {
        const iPt = this.intersection(
            Line.fromPoints(A, B)
        )

        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
        }
        return false
    }

    /**
     * Intersection with another line, as `{point, hasIntersection, isParallel, isSame}`.
     * The point is `null` when the lines are parallel or the same.
     */
    intersection(line: Line): LineIntersection {
        if (this.isEqual(line)) {
            return {point: null, hasIntersection: false, isParallel: false, isSame: true}
        }

        if (this.isParallelTo(line)) {
            return {point: null, hasIntersection: false, isParallel: true, isSame: false}
        }

        // x = (bf-ce)/(ae-db),  y = (af-cd)/(bd-ae)
        const Pt = new Point()
        Pt.x = this.#b.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.b))
            .divide(this.#a.clone().multiply(line.b).subtract(this.#b.clone().multiply(line.a)))
        Pt.y = this.#a.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.a))
            .divide(this.#b.clone().multiply(line.a).subtract(this.#a.clone().multiply(line.b)))

        return {point: Pt, hasIntersection: true, isParallel: false, isSame: false}
    }

    /**
     * True when the slope is zero.
     */
    isHorizontal(): boolean {
        return this.slope.value === 0
    }

    // ------------------------------------------
    /**
     * True when the point satisfies the equation of the line.
     */
    isPointOnLine(pt: Point): boolean {
        return this.#a.clone()
            .multiply(pt.x)
            .add(
                this.#b.clone()
                    .multiply(pt.y)
            )
            .add(this.#c)
            .isZero()
    }

    /**
     * True when the lines have the same direction but are not the same line.
     */
    isParallelTo(line: Line): boolean {
        const crossAB = this.#a.clone().multiply(line.b).subtract(line.a.clone().multiply(this.#b))
        return crossAB.isZero() && !this.isEqual(line)
    }

    /**
     * True when the directions are perpendicular.
     */
    isPerpendicularTo(line: Line): boolean {
        return this.d.isNormalTo(line.d)
    }

    /**
     * True when both lines are the same line, whatever their coefficients.
     */
    isEqual(line: Line): boolean {
        const crossAB = this.#a.clone().multiply(line.b).subtract(line.a.clone().multiply(this.#b))
        if (!crossAB.isZero()) return false
        // Both vertical (b=0): same direction is guaranteed, check x-intercepts
        if (this.#b.isZero() && line.b.isZero()) {
            const crossAC = this.#a.clone().multiply(line.c).subtract(line.a.clone().multiply(this.#c))
            return crossAC.isZero()
        }
        const crossBC = this.#b.clone().multiply(line.c).subtract(line.b.clone().multiply(this.#c))
        return crossBC.isZero()
    }

    /**
     * True when the slope is infinite.
     */
    isVertical(): boolean {
        return this.slope.isInfinity()
    }

    /**
     * Normal vector computed from the direction (the direction turned by 90 degrees). It can be the opposite of
     * {@link normal}.
     */
    get n(): Vector {
        return this.d.normal()
    }

    /**
     * Normal vector `(a, b)`.
     */
    get normal(): Vector {
        return new Vector(this.#a, this.#b)
    }

    /**
     * A random point close to the line but not on it.
     * @param k - same as in {@link randomPoint}.
     */
    randomNearPoint(k?: number): Point {
        const pt = this.randomPoint(k)

        let maxIterationTest = 10
        while (this.isPointOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(randomIntSym(1, false))
            pt.y.add(randomIntSym(1, false))
            maxIterationTest--

        }

        return pt
    }

    /**
     * A random point of the line: the point {@link OA} moved along the direction vector by a non-zero integer
     * between `-k` and `k`.
     * @param k - largest multiple of the direction vector (default 3).
     */
    randomPoint(k?: number): Point {
        const pt = this.d
            .clone()
            .multiplyByScalar(randomIntSym((k === undefined || k <= 1) ? 3 : k, false))
            .add(this.#OA)

        return new Point(pt)
    }

    /**
     * Give the equation the smallest integer coefficients with no common divisor.
     */
    simplify(): this {
        const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator)
        const gcd = Numeric.gcd(this.#a.numerator, this.#b.numerator, this.#c.numerator)

        this.copy(Line.fromCoefficient(
            this.#a.clone().multiply(lcm).divide(gcd),
            this.#b.clone().multiply(lcm).divide(gcd),
            this.#c.clone().multiply(lcm).divide(gcd),
        ))

        return this
    }

    /** Orthogonal projection of `pt` onto this line. */
    project(pt: Point): Point {
        const n = this.normal                                    // (a, b)
        const n2 = n.dot(n)                                     // a² + b²
        const t = n.dot(pt).add(this.#c).divide(n2)
        return new Point(
            new Vector(pt).subtract(n.clone().multiplyByScalar(t))
        )
    }

    /** Reflection of `pt` through this line (`proj` is the midpoint of `[pt, reflect(pt)]`). */
    reflect(pt: Point): Point {
        const displacement = new Vector(pt, this.project(pt))
        return new Point(new Vector(pt).add(displacement.multiplyByScalar(2)))
    }

    /**
     * Slope `m` of `y = mx + h`: `-a/b`. Infinite for a vertical line.
     */
    get slope(): Fraction {
        return this.#a.clone().opposite().divide(this.#b)
    }
}
