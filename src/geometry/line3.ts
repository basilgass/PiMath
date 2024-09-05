/**
 * This class works for 2d line in a plane.
 */

import { Fraction } from "../coefficients/fraction"
import { Polynom } from "../algebra/polynom"
import { Monom } from "../algebra/monom"
import { randomIntSym } from "../randomization/rndHelpers"
import { Vector } from "./vector"
import { Point } from "./point"

export enum LinePropriety {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export class Line3 {
    // A line is defined as the canonical form
    static PERPENDICULAR = LinePropriety.Perpendicular
    static PARALLEL = LinePropriety.Parallel
    // ax + by + c = 0
    #OA: Point = new Point()
    #d: Vector = new Vector()

    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(A: Point, B: Point)
    constructor(A: Point, d: Vector)
    constructor(A: Point, d: Vector | Point) {
        this.#OA = A.clone()
        this.#d = d.asPoint ? new Vector(A, d) : d.clone()
        return this
    }

    get OA(): Point {
        return this.#OA
    }

    set OA(value: Point) {
        this.#OA = value
    }
    get point(): Point {
        return this.#OA.clone()
    }

    get d(): Vector {
        return this.#d
    }

    set d(value: Vector) {
        this.#d = value
    }

    get tex(): { parametric: string, system: string, cartesian: string } {
        return {
            parametric: `${Vector.asTex('x', 'y', 'z')} = ${Vector.asTex(this.#OA.x.tex, this.#OA.y.tex, this.#OA.z.tex)} + k\\cdot ${Vector.asTex(this.#d.x.tex, this.#d.y.tex, this.#d.z.tex)}`,
            system: `\\left\\{\\begin{aligned}
    x &= ${(new Polynom(this.#OA.x)
                    .add(new Monom(this.#d.x).multiply(new Monom('k'))))
                    .reorder('k', true)
                    .tex}\\\\ 
    y &= ${(new Polynom(this.#OA.y)
                    .add(new Monom(this.#d.y).multiply(new Monom('k'))))
                    .reorder('k', true)
                    .tex}\\\\
    z &= ${(new Polynom(this.#OA.z)
                    .add(new Monom(this.#d.z).multiply(new Monom('k'))))
                    .reorder('k', true)
                    .tex}
\\end{aligned}\\right.`,
            cartesian: `\\frac{ ${new Polynom('x', 1, this.#OA.x.clone().opposite()).tex} }{ ${this.direction.x.tex} } = \\frac{ ${new Polynom('y', 1, this.#OA.y.clone().opposite()).tex} }{ ${this.direction.y.tex} } = \\frac{ ${new Polynom('z', 1, this.#OA.z.clone().opposite()).tex} }{ ${this.direction.z.tex} }`
        }
    }

    get display(): { parametric: string, system: string, cartesian: string } {
        const OAx = this.#OA.x.display
        const OAy = this.#OA.y.display
        const OAz = this.#OA.z.display
        const n = this.direction.simplify()
        const nx = n.x.display
        const ny = n.y.display
        const nz = n.z.display

        return {
            parametric: `${Vector.asDisplay('x', 'y', 'z')} = ${Vector.asDisplay(this.#OA.x.display, this.#OA.y.display, this.#OA.z.display)} + k\\cdot ${Vector.asDisplay(this.#d.x.display, this.#d.y.display, this.#d.z.display)}`,
            system: '',
            cartesian: `(x-${OAx})/${nx} = (y-${OAy})/${ny} = (z-${OAz})/${nz}`
        }
    }

    get direction(): Vector {
        return this.#d.clone()
    }

    clone = (): this => {
        this.#d = this.#d.clone()
        this.#OA = this.#OA.clone()

        return this
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    isOnLine = (pt: Vector): boolean => {
        return false
    }

    isParallelTo = (line: Line3): boolean => {
        // Do they have the isSame direction ?
        throw new Error('Method not implemented.')
    }
    isSameAs = (line: Line3): boolean => {
        throw new Error('Method not implemented.')
    }
    isPerpendicularTo = (line: Line3): boolean => {
        throw new Error('Method not implemented.')
    }
    isVertical = (): boolean => {
        throw new Error('Method not implemented.')
    }
    simplify = (): this => {
        throw new Error('Method not implemented.')
        // const lcm = Numeric.lcm(this.#a.denominator, this.#b.denominator, this.#c.denominator),
        //     gcd = Numeric.gcd(this.#a.numerator, this.#b.numerator, this.#c.numerator)

        // this.parseByCoefficient(
        //     this.#a.clone().multiply(lcm).divide(gcd),
        //     this.#b.clone().multiply(lcm).divide(gcd),
        //     this.#c.clone().multiply(lcm).divide(gcd),
        // )

        // return this
    }

    intersection = (line: Line3): { point: Vector, hasIntersection: boolean, isParallel: boolean, isSame: boolean } => {
        // const Pt = new Vector()
        // let isParallel = false, isSame = false


        // // Theres is no 'y'
        // if (this.#b.isZero() || line.b.isZero()) {
        //     // TODO : handle no y in the line canonical form
        // }

        // if (this.isParallelTo(line)) {
        //     Pt.x = new Fraction().invalid()
        //     Pt.y = new Fraction().invalid()
        //     isParallel = true
        // } else if (this.isSameAs(line)) {
        //     Pt.x = new Fraction().invalid()
        //     Pt.y = new Fraction().invalid()
        //     isSame = true
        // } else {
        //     Pt.x = this.#b.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.b))
        //         .divide(this.#a.clone().multiply(line.b).subtract(this.#b.clone().multiply(line.a)))
        //     Pt.y = this.#a.clone().multiply(line.c).subtract(this.#c.clone().multiply(line.a))
        //         .divide(this.#b.clone().multiply(line.a).subtract(this.#a.clone().multiply(line.b)))
        // }

        // return {
        //     point: Pt,
        //     hasIntersection: !(isParallel || isSame),
        //     isParallel,
        //     isSame
        // }
        throw new Error('Method not implemented.')
    }

    distanceTo(pt: Point): { value: number, fraction: Fraction, tex: string } {
        // Distance is:
        // |(x - x0) x d| / |d|
        const AP = new Vector(this.#OA, pt),
            d = this.direction,
            d2 = this.direction.normSquare,
            num2 = AP.cross(d).normSquare,
            num2d2 = num2.clone().divide(d2),
            dnum = num2d2.clone().sqrt()

        console.log('CROSS', AP.cross(d).display)
        return {
            value: Math.sqrt(num2d2.value),
            fraction: num2d2.clone().sqrt(),
            tex: dnum.isExact() ? dnum.tex : `\\sqrt{${num2d2.tex}}`
        }
    }

    hitSegment(A: Point, B: Point): boolean {
        const iPt = this.intersection(
            new Line3(A, B)
        )

        // There is an intersection point
        if (iPt.hasIntersection) {
            return iPt.point.x.value >= Math.min(A.x.value, B.x.value)
                && iPt.point.x.value <= Math.max(A.x.value, B.x.value)
                && iPt.point.y.value >= Math.min(A.y.value, B.y.value)
                && iPt.point.y.value <= Math.max(A.y.value, B.y.value)
                && iPt.point.z.value >= Math.min(A.z.value, B.z.value)
                && iPt.point.z.value <= Math.max(A.z.value, B.z.value)
        }
        return false
    }

    // getValueAtX = (value: Fraction | number): Fraction => {
    //     const equ = this.equation.clone().isolate('y'),
    //         F = new Fraction(value)

    //     if (equ instanceof Equation) {
    //         return equ.right.evaluate({ x: F }) as Fraction
    //     }
    //     return new Fraction().invalid()
    // }

    // getValueAtY = (value: Fraction | number): Fraction => {
    //     const equ = this.equation.clone().isolate('x'),
    //         F = new Fraction(value)

    //     if (equ instanceof Equation) {
    //         return equ.right.evaluate({ y: F }) as Fraction
    //     }

    //     return new Fraction().invalid()
    // }

    randomPoint = (max = 5): Point => {
        const A = this.#OA.clone(),
            k = new Fraction(randomIntSym(max, false))

        return new Point(
            A.x.clone().add(this.#d.x.clone().multiply(k)),
            A.y.clone().add(this.#d.y.clone().multiply(k)),
            A.z.clone().add(this.#d.z.clone().multiply(k))
        )
    }
}