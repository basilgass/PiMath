/**
 * This class works for 2d line in a plane.
 */

import { Fraction } from "../coefficients/fraction"
import { Polynom } from "../algebra/polynom"
import { Monom } from "../algebra/monom"
import { Point3D, Vector3D } from "./vector3d"
import { randomIntSym } from "../randomization/rndHelpers"

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
    #OA: Vector3D = new Vector3D()
    #d: Vector3D = new Vector3D()

    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(A: Point3D, d: Vector3D) {
        this.#OA = A.clone()
        this.#d = d.clone()
        return this
    }

    get OA(): Vector3D {
        return this.#OA
    }

    set OA(value: Vector3D) {
        this.#OA = value
    }
    get point(): Point3D {
        return this.#OA.clone()
    }

    get d(): Vector3D {
        return this.#d
    }

    set d(value: Vector3D) {
        this.#d = value
    }


    get tex(): { parametric: string, system: string } {

        return {
            parametric: `${Vector3D.asTex('x', 'y', 'z')} = ${Vector3D.asTex(this.#OA.x.tex, this.#OA.y.tex, this.#OA.z.tex)} + k\\cdot ${Vector3D.asTex(this.#d.x.tex, this.#d.y.tex, this.#d.z.tex)}`,
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
\\end{aligned}\\right.`
        }
    }

    get direction(): Vector3D {
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
    isOnLine = (pt: Vector3D): boolean => {
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

    intersection = (line: Line3): { point: Vector3D, hasIntersection: boolean, isParallel: boolean, isSame: boolean } => {
        // const Pt = new Vector3D()
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

    distanceTo(pt: Vector3D): { value: number, fraction: Fraction, tex: string } {
        // const numerator = pt.x.clone().multiply(this.#a)
        //     .add(pt.y.clone().multiply(this.#b))
        //     .add(this.#c).abs(),
        //     d2 = this.normal.normSquare

        // // The denominator is null - shouldn't be possible
        // if (d2.isZero()) {
        //     return {
        //         value: NaN,
        //         tex: 'Not a line',
        //         fraction: new Fraction().infinite()
        //     }
        // }
        // // The denominator is a perfect square - simplify the tex result
        // const value = numerator.value / Math.sqrt(d2.value),
        //     F = numerator.clone().divide(d2.clone().sqrt())

        // // The denominator is a perfect square.
        // if (d2.isSquare()) {
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

        throw new Error('Method not implemented.')
    }

    hitSegment(A: Vector3D, B: Vector3D): boolean {
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

    randomPoint = (max = 5): Point3D => {
        const A = this.#OA.clone(),
            k = new Fraction(randomIntSym(max, false))

        return new Point3D(
            A.x.clone().add(this.#d.x.clone().multiply(k)),
            A.y.clone().add(this.#d.y.clone().multiply(k)),
            A.z.clone().add(this.#d.z.clone().multiply(k))
        )
    }
}