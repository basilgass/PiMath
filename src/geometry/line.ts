/**
 * This class works for 2d line in a plane.
 */

import {Numeric} from "../numeric"
import {Fraction} from "../coefficients"
import {Equation, Monom, Polynom} from "../algebra"
import {Vector} from "./vector"
import {type InputValue, type IPiMathObject, LinePropriety} from "../pimath.interface"
import {randomIntSym} from "../randomization/rndHelpers"
import {Point} from "./point"
import {Root} from "../coefficients/root"

enum LINE_DISPLAY {
    CARTESIAN,
    CANONICAL,
    MXH,
    PARAMETRIC,
    SYSTEM
}

export class Line implements IPiMathObject<Line> {
    static PARALLEL = LinePropriety.Parallel
    static PERPENDICULAR = LinePropriety.Perpendicular
    #OA: Vector

    // A line is defined as the canonical form
    // ax + by + c = 0
    #a: Fraction
    #b: Fraction
    #c: Fraction

    // output mode.
    #outputMode: LINE_DISPLAY = LINE_DISPLAY.CANONICAL

    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(...values: unknown[]) {
        this.#a = new Fraction().zero()
        this.#b = new Fraction().zero()
        this.#c = new Fraction().zero()
        this.#OA = new Vector()

        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    // ------------------------------------------
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse = (...values: unknown[]): this => {
        // Nothing is given...
        if (values.length === 0) {
            return this
        }

        // One value only: already a line (clone it), an Equation, a string (as Equation)
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                // Already a Line
                return this.fromCoefficient(values[0].a, values[0].b, values[0].c)
            }

            if (values[0] instanceof Equation) {
                // It's an Equation
                return this.fromEquation(values[0])
            }

            if (typeof values[0] === "string") {
                // It's a string - create an Equation from it.
                try {
                    const E = new Equation(values[0])
                    return this.parse(E)
                } catch (e) {
                    console.warn(e)
                    return this
                }
            }
        }

        if (values.length === 2) {
            if (values[0] instanceof Point && values[1] instanceof Point) {
                return this.fromPoints(values[0], values[1])
            }

            if (values[0] instanceof Point && values[1] instanceof Vector) {
                return this.fromPointAndDirection(values[0], values[1])
            }
        }

        if (values.length === 3 && values.every(x => Fraction.isFraction(x as InputValue<Fraction>))) {
            return this.fromCoefficient(
                values[0] as InputValue<Fraction>,
                values[1] as InputValue<Fraction>,
                values[2] as InputValue<Fraction>
            )
        }

        console.log('Something wrong happened while creating the line')
        console.log(values)
        return this
    }

    // ------------------------------------------
    // Getter and setter

    clone = (): this => {
        this.#a = this.#a.clone()
        this.#b = this.#b.clone()
        this.#c = this.#c.clone()

        this.#OA = this.#OA.clone()
        return this
    }

    get tex(): string {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d
        // equation     => ax + by = -c
        // system       => \begin{}...

        const output = this.#outputMode
        this.#outputMode = LINE_DISPLAY.CANONICAL

        switch (output) {
            case LINE_DISPLAY.CARTESIAN:
                return this.getEquation().reorder().tex
            case LINE_DISPLAY.MXH:
                return this.slope.isInfinity() ?
                    'x=' + this.OA.x.tex :
                    'y=' + new Polynom().parse('x', this.slope, this.height).tex
            case LINE_DISPLAY.PARAMETRIC:
            case LINE_DISPLAY.SYSTEM: {
                const d = this.d.clone().simplify()

                if (output === LINE_DISPLAY.PARAMETRIC) {
                    return `${Vector.asTex('x', 'y')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex)} + k\\cdot ${Vector.asTex(d.x.tex, d.y.tex)}`
                } else {
                    return `\\left\\{\\begin{aligned}
            x &= ${(new Polynom(this.#OA.x)
                        .add(new Monom(this.d.x).multiply(new Monom('k'))))
                        .reorder('k', true)
                        .tex}\\\\ 
            y &= ${(new Polynom(this.#OA.y)
                        .add(new Monom(this.d.y).multiply(new Monom('k'))))
                        .reorder('k', true)
                        .tex}
            \\end{aligned}\\right.`
                }
            }
            default: {
                const canonical = this.getEquation()
                if (this.#a.isNegative()) {
                    canonical.multiply(-1)
                }
                return canonical.tex
            }
        }

    }

    get display(): string {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d // not relevant in display mode.
        const output = this.#outputMode
        this.#outputMode = LINE_DISPLAY.CANONICAL

        switch (output) {
            case LINE_DISPLAY.CARTESIAN:
                return this.getEquation().reorder().display
            case LINE_DISPLAY.MXH:
                return this.slope.isInfinity() ?
                    'x=' + this.OA.x.display :
                    'y=' + new Polynom().parse('x', this.slope, this.height).display
            case LINE_DISPLAY.PARAMETRIC: {
                const d = this.d.clone().simplify()
                return `((x,y))=((${this.#OA.x.display},${this.#OA.y.display}))+k((${d.x.display},${d.y.display}))`
            }
            case LINE_DISPLAY.SYSTEM: {
                // TODO: line as system in ascii math
                return ''
            }
            default: {
                const canonical = this.getEquation()
                // Make sur the first item is positive.
                if (this.#a.isNegative()) {
                    canonical.multiply(-1)
                }
                return canonical.display
            }

        }
    }

    get OA(): Vector {
        return this.#OA
    }

    set OA(value: Vector | Point) {
        this.fromPointAndNormal(value, this.n)
    }

    get a(): Fraction {
        return this.#a
    }

    set a(value: Fraction) {
        this.#a = value
    }

    asCanonical(): this {
        this.#outputMode = LINE_DISPLAY.CANONICAL
        return this
    }

    asCartesian(): this {
        this.#outputMode = LINE_DISPLAY.CARTESIAN
        return this
    }

    asMxh(): this {
        this.#outputMode = LINE_DISPLAY.MXH
        return this
    }

    asParametric(): this {
        this.#outputMode = LINE_DISPLAY.PARAMETRIC
        return this
    }

    asSystem(): this {
        this.#outputMode = LINE_DISPLAY.SYSTEM
        return this
    }

    get b(): Fraction {
        return this.#b
    }

    set b(value: Fraction) {
        this.#b = value
    }

    get c(): Fraction {
        return this.#c
    }

    set c(value: Fraction) {
        this.#c = value
    }

    // ------------------------------------------
    canonicalAsFloatCoefficient(decimals = 2): string {
        let canonical = ''

        if (!this.#a.isZero()) {
            if (this.#a.isOne()) {
                canonical = 'x'
            } else if (this.#a.clone().opposite().isOne()) {
                canonical = '-x'
            } else {
                canonical = this.#a.value.toFixed(decimals) + 'x'
            }
        }

        if (!this.#b.isZero()) {
            if (this.#b.isPositive()) {
                canonical += '+'
            }
            canonical += this.#b.value.toFixed(decimals) + 'y'
        }

        if (!this.#c.isZero()) {
            if (this.#c.isPositive()) {
                canonical += '+'
            }
            canonical += this.#c.value.toFixed(decimals)
        }


        return canonical + '=0'
    }

    get d(): Vector {
        return new Vector(this.#b.clone(), this.#a.clone().opposite())
    }

    set d(value: Vector) {
        this.fromPointAndDirection(this.OA, value)
    }

    get director(): Vector {
        return this.d
    }

    distanceTo(pt: Point): Root {
        const numerator = pt.x.clone().multiply(this.#a)
            .add(pt.y.clone().multiply(this.#b))
            .add(this.#c).abs()
        const d2 = this.normal.normSquare

        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return new Root(0)
        }

        return new Root().from(2, d2.inverse(), numerator)

        // The denominator is a perfect square - simplify the tex result
        // const value = numerator.value / Math.sqrt(d2.value)
        // const F = numerator.clone().divide(d2.clone().sqrt())

        //
        // if (d2.isSquare()) {
        //
        //     return {
        //         value,
        //         tex: F.tex,
        //         fraction: F
        //     }
        // }
        // // Complete answer...
        // return {
        //     value,
        //     tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
        //     fraction: F
        // }
    }

    fromCoefficient = (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>): this => {
        this.#a = new Fraction(a)
        this.#b = new Fraction(b)
        this.#c = new Fraction(c)

        // make sure the coefficients are relative...
        const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator)
        if (lcm > 1) {
            this.#a.multiply(lcm).reduce()
            this.#b.multiply(lcm).reduce()
            this.#c.multiply(lcm).reduce()
        }

        if (this.#b.isZero()) {
            // ax+c=0 => x = -c/a
            this.#OA = new Vector(this.#c.clone().divide(this.#a).opposite(), 0)
            return this
        }

        // ax+by+c=0 => x=0 => y = a/b x - c/b = (ax-c)/b
        for (let x = 0; x < this.#b.value; x++) {
            const y = this.#a.clone().divide(this.#b)
                .multiply(x)
                .subtract(this.#c.clone().divide(this.#b))
                .reduce()

            this.#OA = new Vector(x, y)

            if (y.isRelative()) {
                return this
            }
        }

        // no "nice" point... do it with 'x=0'
        const y = this.#c.clone().divide(this.#b).opposite().reduce()
        this.#OA = new Vector(0, y)

        return this
    }

    fromEquation = (equ: Equation): this => {
        // Reorder the equation
        equ.reorder(true)

        // It must contain either x, y or both.
        const letters = new Set(equ.letters())

        // No 'x', no 'y' in the equations
        if (!(letters.has('x') || letters.has('y'))) {
            return this
        }

        // Another letter in the equation ?
        for (const elem of ['x', 'y']) {
            if (letters.has(elem)) {
                letters.delete(elem)
            }
        }

        if (letters.size > 0) {
            return this
        }

        // Everything should be ok now...
        return this.fromCoefficient(
            equ.left.monomByLetter('x').coefficient,
            equ.left.monomByLetter('y').coefficient,
            equ.left.monomByDegree(0).coefficient
        )
    }

    fromPointAndDirection = (P: Point | Vector, d: Vector): this => {
        return this.fromPointAndNormal(P, d.clone().normal())
    }

    fromPointAndLine = (P: Vector, L: Line, orientation: LinePropriety = LinePropriety.Parallel): this => {

        if (orientation === LinePropriety.Perpendicular) {
            return this.fromPointAndNormal(P, L.director)
        }

        return this.fromPointAndNormal(P, L.normal)
    }

    fromPointAndNormal = (P: Point | Vector, n: Vector): this => {
        this.fromCoefficient(
            n.x,
            n.y,
            P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposite()
        )

        this.#OA = new Vector(P.clone())

        return this
    }

    // ------------------------------------------
    // Creation / parsing functions

    fromPoints(A: Point, B: Point) {
        return this.fromPointAndNormal(A, new Vector(A, B).normal())
    }

    // ------------------------------------------
    getEquation(): Equation {
        const equ = new Equation(new Polynom().parse('xy', this.#a, this.#b, this.#c), new Polynom('0'))
        return equ.simplify()
    }

    getValueAtX = (value: Fraction | number): Fraction => {
        const equ = this.getEquation().isolate('y'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({x: F}) as Fraction
        }
        return new Fraction().invalid()
    }

    getValueAtY = (value: Fraction | number): Fraction => {
        const equ = this.getEquation().isolate('x'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({y: F}) as Fraction
        }

        return new Fraction().invalid()
    }

    get height(): Fraction {
        return this.#c.clone().opposite().divide(this.#b)
    }

    hitSegment(A: Point, B: Point): boolean {
        const iPt = this.intersection(
            new Line().fromPoints(A, B)
        )

        // There is an intersection point
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
        }
        return false
    }

    intersection = (line: Line): { point: Point, hasIntersection: boolean, isParallel: boolean, isSame: boolean } => {
        // TODO: rework Line.intersection
        const Pt = new Point()
        let isParallel = false, isSame = false

        // this         => ax+by+c = 0
        // line         => dx+ey+f = 0
        //
        //  aex + bey + ce = 0
        //  dbx + bey + bf = 0
        // (ae-db)x + ce-bf = 0
        //
        //  adx + bdy + cd = 0
        //  adx + aey + af = 0
        // (bd-ae)y + (cd-af)
        //
        // x = (bf-ce)/(ae-db)
        // y = (af-cd)/(bd-ae)


        // Theres is no 'y'
        if (this.#b.isZero() || line.b.isZero()) {
            // TODO : handle no y in the line canonical form
        }

        if (this.isParallelTo(line)) {
            Pt.x = new Fraction().invalid()
            Pt.y = new Fraction().invalid()
            isParallel = true
        } else if (this.isSameAs(line)) {
            Pt.x = new Fraction().invalid()
            Pt.y = new Fraction().invalid()
            isSame = true
        } else {
            Pt.x = this.#b.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.b))
                .divide(this.#a.clone().multiply(line.b).subtract(this.#b.clone().multiply(line.a)))
            Pt.y = this.#a.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.a))
                .divide(this.#b.clone().multiply(line.a).subtract(this.#a.clone().multiply(line.b)))
        }

        return {
            point: Pt,
            hasIntersection: !(isParallel || isSame),
            isParallel,
            isSame
        }
    }

    // ------------------------------------------
    isOnLine(pt: Point): boolean {
        return this.#a.clone()
            .multiply(pt.x)
            .add(
                this.#b.clone()
                    .multiply(pt.y)
            )
            .add(this.#c)
            .isZero()
    }

    isParallelTo = (line: Line): boolean => {
        // Do they have the isSame direction ?
        return this.slope.isEqual(line.slope) && this.height.isNotEqual(line.height)
    }

    isPerpendicularTo = (line: Line): boolean => {
        return this.d.isNormalTo(line.d)
    }

    isSameAs = (line: Line): boolean => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height)
    }

    isVertical = (): boolean => {
        return this.slope.isInfinity()
    }

    get n(): Vector {
        return this.d.normal()
    }

    get normal(): Vector {
        return new Vector(this.#a, this.#b)
    }

    randomNearPoint = (k?: number): Point => {
        const pt = this.randomPoint(k)

        let maxIterationTest = 10
        while (this.isOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(randomIntSym(1, false))
            pt.y.add(randomIntSym(1, false))
            maxIterationTest--

        }

        return pt
    }

    randomPoint = (k?: number): Point => {
        // Return a random point on the line.
        const pt = this.d
            .clone()
            .multiplyByScalar(randomIntSym((k === undefined || k <= 1) ? 3 : k, false))
            .add(this.#OA)

        return new Point(pt)
    }

    simplify = (): this => {
        const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator),
            gcd = Numeric.gcd(this.#a.numerator, this.#b.numerator, this.#c.numerator)

        this.fromCoefficient(
            this.#a.clone().multiply(lcm).divide(gcd),
            this.#b.clone().multiply(lcm).divide(gcd),
            this.#c.clone().multiply(lcm).divide(gcd),
        )

        return this
    }

    get slope(): Fraction {
        return this.#a.clone().opposite().divide(this.#b)
    }
}