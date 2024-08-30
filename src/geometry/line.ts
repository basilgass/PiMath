/**
 * This class works for 2d line in a plane.
 */

import { Numeric } from "../numeric"
import { Fraction } from "../coefficients/fraction"
import { Equation } from "../algebra/equation"
import { Polynom } from "../algebra/polynom"
import { Monom } from "../algebra/monom"
import { Vector } from "./vector"
import type { InputValue } from "../pimath.interface"
import { randomIntSym } from "../randomization/rndHelpers"

export enum LinePropriety {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export class Line {
    // A line is defined as the canonical form
    static PERPENDICULAR = LinePropriety.Perpendicular
    static PARALLEL = LinePropriety.Parallel
    #reduceBeforeDisplay: boolean
    // ax + by + c = 0
    #a: Fraction
    #b: Fraction
    #c: Fraction
    #OA: Vector
    #d: Vector
    #n: Vector

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
        this.#d = new Vector()
        this.#n = new Vector()

        this.#reduceBeforeDisplay = true


        if (values.length > 0) {
            this.parse(...values)
        }

        return this
    }

    get a(): Fraction {
        return this.#a
    }

    // ------------------------------------------
    // Getter and setter

    set a(value: Fraction) {
        this.#a = value
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

    get OA(): Vector {
        return this.#OA
    }

    set OA(value: Vector) {
        this.#OA = value
    }

    get d(): Vector {
        return this.#d
    }

    set d(value: Vector) {
        this.#d = value
    }

    get n(): Vector {
        return this.#n
    }

    // ------------------------------------------
    get equation(): Equation {
        const equ = new Equation(new Polynom().parse('xy', this.#a, this.#b, this.#c), new Polynom('0'))
        if (this.#reduceBeforeDisplay) {
            return equ.simplify()
        } else {
            return equ
        }
    }

    get system(): { x: Equation, y: Equation } {
        const e1 = new Equation(
            new Polynom('x'),
            new Polynom(this.#OA.x)
                .add(new Monom('k').multiply(this.#d.x))
        ),
            e2 = new Equation(
                new Polynom('y'),
                new Polynom(this.#OA.y)
                    .add(new Monom('k').multiply(this.#d.y))
            )

        return { x: e1, y: e2 }
    }

    get tex(): { canonical: string, mxh: string, parametric: string, equation: string, system: string } {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d
        // equation     => ax + by = -c

        const canonical = this.equation.clone().reorder(true)
        // Make sur the first item is positive.
        if (this.#a.isNegative()) {
            canonical.multiply(-1)
        }

        const d = this.#d.clone()
        if (this.#reduceBeforeDisplay) {
            d.simplify()
        }

        return {
            canonical: canonical.tex,
            equation: canonical.clone().reorder().tex,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.tex : 'y=' + new Polynom().parse('x', this.slope, this.height).tex,
            parametric: `${Vector.asTex('x', 'y')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex)} + k\\cdot ${Vector.asTex(d.x.tex, d.y.tex)}`,
            system: `\\left\\{\\begin{aligned}
            x &= ${(new Polynom(this.#OA.x)
                    .add(new Monom(this.#d.x).multiply(new Monom('k'))))
                    .reorder('k', true)
                    .tex}\\\\ 
            y &= ${(new Polynom(this.#OA.y)
                    .add(new Monom(this.#d.y).multiply(new Monom('k'))))
                    .reorder('k', true)
                    .tex}
            \\end{aligned}\\right.`
        }
    }

    get reduceBeforeDisplay(): boolean {
        return this.#reduceBeforeDisplay
    }

    set reduceBeforeDisplay(value: boolean) {
        this.#reduceBeforeDisplay = value
    }

    get display(): { canonical: string, mxh: string, parametric: string } {
        // canonical    =>  ax + by + c = 0
        // mxh          =>  y = -a/b x - c/b
        // parametric   =>  (xy) = OA + k*d // not relevant in display mode.

        const canonical = this.equation
        // Make sur the first item is positive.
        if (this.#a.isNegative()) {
            canonical.multiply(-1)
        }

        return {
            canonical: canonical.display,
            mxh: this.slope.isInfinity() ? 'x=' + this.OA.x.display : 'y=' + new Polynom().parse('x', this.slope, this.height).display,
            parametric: ""
        }
    }

    get normal(): Vector {
        return new Vector(this.#a, this.#b)
    }

    get director(): Vector {
        return this.#d.clone()
    }

    get slope(): Fraction {
        return this.#a.clone().opposite().divide(this.#b)
    }

    get height(): Fraction {
        return this.#c.clone().opposite().divide(this.#b)
    }

    randomPoint = (k?: number): Vector => {
        // Return a random point on the line.
        return this.#d
            .clone()
            .multiplyByScalar(randomIntSym((k === undefined || k <= 1) ? 3 : k, false))
            .add(this.#OA)
    }

    randomNearPoint = (k?: number): Vector => {
        const pt = this.randomPoint(k)

        let maxIterationTest = 10
        while (this.isOnLine(pt) && maxIterationTest > 0) {
            pt.x.add(randomIntSym(1, false))
            pt.y.add(randomIntSym(1, false))
            maxIterationTest--

        }
        return pt
    }

    // ------------------------------------------
    // Creation / parsing functions

    // ------------------------------------------
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse = (...values: unknown[]): Line => {
        // Nothing is given...
        if (values.length === 0) {
            return this
        }

        // One value only: already a line (clone it), an Equation, a string (as Equation)
        if (values.length === 1) {
            if (values[0] instanceof Line) {
                // Already a Line
                return values[0].clone()
            } else if (values[0] instanceof Equation) {
                // It's an Equation
                return this.parseEquation(values[0])
            } else if (typeof values[0] === "string") {
                // It's a string - create an Equation from it.
                try {
                    const E = new Equation(values[0])
                    return this.parse(E)
                } catch (e) {
                    return this
                }
            }
        }

        // Two values are given: two vectors
        // TODO: it's not intuitive: vector + point or point + vector -> add a property !
        if (values.length === 2 && values[0] instanceof Vector && values[1] instanceof Vector) {
            if (values[0].asPoint && !values[1].asPoint) {
                // One point and one vector
                return this.parseByPointAndVector(values[0], values[1])
            } else if (values[0].asPoint && values[1].asPoint) {
                // Two points
                return this.parseByPointAndVector(values[0], new Vector(values[0], values[1]))
            } else if (!values[0].asPoint && values[1].asPoint) {
                // One vector and one point
                return this.parseByPointAndNormal(values[1], values[0])
            }
        }

        if (values.length === 3) {
            if (values[0] instanceof Vector && values[1] instanceof Vector) {
                if (values[2] === LinePropriety.Perpendicular) {
                    return this.parseByPointAndNormal(values[0], values[1])
                } else if (values[2] === LinePropriety.Parallel) {
                    return this.parseByPointAndVector(values[0], values[1])
                }
            }

            if (values[0] instanceof Vector && values[1] instanceof Line) {
                if (values[2] === LinePropriety.Parallel || values[2] === null) {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Parallel)
                } else {
                    return this.parseByPointAndLine(values[0], values[1], LinePropriety.Perpendicular)
                }
            }

            return this.parseByCoefficient(
                values[0] as InputValue<Fraction>,
                values[1] as InputValue<Fraction>,
                values[2] as InputValue<Fraction>
            )
        }

        // TODO: Add the ability to create line from a normal vector
        console.log('Something wrong happened while creating the line')
        return this
    }

    parseEquation = (equ: Equation): this => {
        // Reorder the eequation
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
        return this.parseByCoefficient(equ.left.monomByLetter('x').coefficient, equ.left.monomByLetter('y').coefficient, equ.left.monomByDegree(0).coefficient)
    }
    parseByCoefficient = (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>): this => {
        this.#a = new Fraction(a)
        this.#b = new Fraction(b)
        this.#c = new Fraction(c)

        this.#d = new Vector(this.#b.clone(), this.#a.clone().opposite())
        this.#OA = new Vector(new Fraction().zero(), this.#c.clone())
        this.#n = this.#d.clone().normal()

        return this
    }

    parseByPointAndVector = (P: Vector, d: Vector): this => {
        // OX = OP + k*d
        // x = px + kdx     * dy
        // y = py + kdy     * dx
        // ------------------
        // dy * x = px * dy + kdxdy
        // dx * y = py * dx + kdxdy
        // ------------------
        // dy * x - dx * y = px * dy - py * dx
        // dy * x - dx * y - (px * dy - py * dx) = 0
        this.parseByCoefficient(
            d.y,
            d.x.clone().opposite(),
            P.x.clone().multiply(d.y).subtract(P.y.clone().multiply(d.x)).opposite()
        )

        // Choose the current values as point and direction vector instead of the automatic version.
        this.#OA = P.clone()
        this.#d = d.clone()
        this.#n = this.#d.clone().normal()

        return this
    }

    parseByPointAndNormal = (P: Vector, n: Vector): this => {
        return this.parseByCoefficient(
            n.x,
            n.y,
            P.x.clone().multiply(n.x)
                .add(P.y.clone().multiply(n.y)).opposite()
        )
    }

    parseByPointAndLine = (P: Vector, L: Line, orientation?: LinePropriety): this => {

        if (orientation === undefined) {
            orientation = LinePropriety.Parallel
        }

        if (orientation === LinePropriety.Parallel) {
            return this.parseByPointAndNormal(P, L.normal)
        } else if (orientation === LinePropriety.Perpendicular) {
            return this.parseByPointAndNormal(P, L.director)
        }

        return this
    }

    clone = (): this => {
        this.#a = this.#a.clone()
        this.#b = this.#b.clone()
        this.#c = this.#c.clone()

        this.#d = this.#d.clone()
        this.#OA = this.#OA.clone()
        this.#n = this.#n.clone()

        return this
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    isOnLine = (pt: Vector): boolean => {
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
    isSameAs = (line: Line): boolean => {
        return this.slope.isEqual(line.slope) && this.height.isEqual(line.height)
    }
    isPerpendicularTo = (line: Line): boolean => {
        return this.d.isNormalTo(line.d)
    }
    isVertical = (): boolean => {
        return this.slope.isInfinity()
    }
    simplify = (): this => {
        const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator),
            gcd = Numeric.gcd(this.#a.numerator, this.#b.numerator, this.#c.numerator)

        this.parseByCoefficient(
            this.#a.clone().multiply(lcm).divide(gcd),
            this.#b.clone().multiply(lcm).divide(gcd),
            this.#c.clone().multiply(lcm).divide(gcd),
        )

        return this
    }

    simplifyDirection = (): this => {
        this.#d.simplify()
        return this
    }
    intersection = (line: Line): { point: Vector, hasIntersection: boolean, isParallel: boolean, isSame: boolean } => {
        const Pt = new Vector()
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

    distanceTo(pt: Vector): { value: number, fraction: Fraction, tex: string } {
        const numerator = pt.x.clone().multiply(this.#a)
            .add(pt.y.clone().multiply(this.#b))
            .add(this.#c).abs(),
            d2 = this.normal.normSquare

        // The denominator is null - shouldn't be possible
        if (d2.isZero()) {
            return {
                value: NaN,
                tex: 'Not a line',
                fraction: new Fraction().infinite()
            }
        }
        // The denominator is a perfect square - simplify the tex result
        const value = numerator.value / Math.sqrt(d2.value),
            F = numerator.clone().divide(d2.clone().sqrt())

        // The denominator is a perfect square.
        if (d2.isSquare()) {
            return {
                value,
                tex: F.tex,
                fraction: F
            }
        }
        // Complete answer...
        return {
            value,
            tex: `\\frac{${numerator.tex}}{\\sqrt{${d2.tex}}}`,
            fraction: F
        }
    }

    hitSegment(A: Vector, B: Vector): boolean {
        const iPt = this.intersection(
            new Line(A, B)
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

    getValueAtX = (value: Fraction | number): Fraction => {
        const equ = this.equation.clone().isolate('y'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({ x: F }) as Fraction
        }
        return new Fraction().invalid()
    }

    getValueAtY = (value: Fraction | number): Fraction => {
        const equ = this.equation.clone().isolate('x'),
            F = new Fraction(value)

        if (equ instanceof Equation) {
            return equ.right.evaluate({ y: F }) as Fraction
        }

        return new Fraction().invalid()
    }

    // ------------------------------------------
    // Special functions
    // ------------------------------------------
    canonicalAsFloatCoefficient(decimals?: number): string {
        if (decimals === undefined) {
            decimals = 2
        }

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
}