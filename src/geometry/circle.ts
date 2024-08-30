import { Line, LinePropriety } from "./line"
import { Vector } from "./vector"
import { Numeric } from "../numeric"
import { Fraction } from "../coefficients/fraction"
import { Equation } from "../algebra/equation"
import { Polynom } from "../algebra/polynom"
import { Monom } from "../algebra/monom"

export class Circle {
    #center: Vector | undefined = undefined
    #squareRadius: Fraction | undefined = undefined
    #cartesian: Equation | undefined = undefined

    constructor(...values: unknown[]) {
        if (values.length > 0) {
            this.parse(...values)
        }
    }

    get center(): Vector {
        return this.#center ?? new Vector()
    }

    get squareRadius(): Fraction {
        return this.#squareRadius ?? new Fraction(0)
    }

    get cartesian(): Equation {
        if (this.#cartesian === undefined) { throw new Error('Cartesian equation not defined') }

        return this.#cartesian
    }

    get radius(): { tex: string, display: string, value: number } {
        if (this.#squareRadius === undefined) { return { tex: '', display: '', value: 0 } }
        if (this.#squareRadius.isSquare()) {
            return {
                tex: this.#squareRadius.clone().sqrt().tex,
                display: this.#squareRadius.clone().sqrt().display,
                value: this.#squareRadius.clone().sqrt().value
            }
        } else {
            return {
                tex: `\\sqrt{${this.#squareRadius.tex}}`,
                display: `sqrt(${this.#squareRadius.display})`,
                value: this.#squareRadius.clone().sqrt().value
            }
        }
    }

    get tex(): string {

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

    get developed(): string {
        return this.cartesian.tex
    }

    get display(): string {
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

    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    relativePosition = (L: Line): number => {
        if (this.#center === undefined || this.#squareRadius === undefined) { throw new Error('Circle not defined') }

        const distance = L.distanceTo(this.#center), radius = Math.sqrt(this.#squareRadius.value)

        if (distance.value - radius > 0.0000000001) {
            return 0 // external
        } else if (Math.abs(distance.value - radius) < 0.0000000001) {
            return 1 // tangent
        } else {
            return 2 // external
        }
    }

    lineIntersection = (L: Line): Vector[] => {
        const intersectionPoints: Vector[] = []
        // let solX: Fraction

        if (this.#cartesian === undefined) { return [] }
        const equX = this.#cartesian.clone(), lineX = L.equation.clone().isolate('x'),
            lineY = L.equation.clone().isolate('y')

        if (lineX instanceof Equation && lineY instanceof Equation) {
            equX.replaceBy('y', lineY.right).simplify()
            equX.solve()

            // TODO: rework the solutions of an equation.
            // for (const x of equX.solutions) {
            //     if (x.exact === false && isNaN(x.value)) {
            //         continue
            //     }

            //     solX = new Fraction(x.exact === false ? x.value : x.exact)
            //     intersectionPoints.push(new Vector(solX.clone(), lineY.right.evaluate(solX)))
            // }
        }

        return intersectionPoints
    }

    tangents = (P: Vector | Fraction): Line[] => {
        if (P instanceof Fraction) {
            return this._tangentsWithSlope(P)
        } else if (this.isPointOnCircle(P)) {
            return this._tangentsThroughOnePointOnTheCircle(P)
        } else if (this.#center !== undefined && this.#center.distanceTo(P).value > this.radius.value) {
            //TODO:  Must check it's outside the circle
            this._tangentsThroughOnePointOutsideTheCircle(P); return []
        } else {
            console.log('No tangents as the point is inside !')
        }
        return []
    }

    isPointOnCircle = (P: Vector): boolean => {
        return this.#cartesian?.test({ x: P.x, y: P.y }) ?? false
    }

    getPointsOnCircle = (numberIsInteger?: boolean): Vector[] => {
        if (numberIsInteger === undefined) {
            numberIsInteger = false
        }

        // It means searching for pythagorician triples that make a perfect square.
        // (x-4)^2 + (y+3)^2 = 15

        const triplets = Numeric.pythagoreanTripletsWithTarget(this.squareRadius.value, true)

        const points: Vector[] = []
        let pt: Vector

        triplets.forEach(triplet => {
            // Allow positive / negative values
            // x-a = t  => x = a + t
            // x-a = -t => x = a - t

            for (const k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                pt = new Vector(
                    this.center.x.clone().add(k[0] * triplet[0]),
                    this.center.y.clone().add(k[1] * triplet[1])
                )
                // Check if the point is not already in points.
                // TODO: isInListOfPoints not implemented
                // if (!pt.isInListOfPoints(points)) {
                //     points.push(pt)
                // }
            }
        })
        return points
    }

    clone(): this {
        this.#center = this.center.clone()
        this.#squareRadius = this.squareRadius.clone()
        this._calculateCartesian()
        return this
    }

    private _tangentsThroughOnePointOnTheCircle = (P: Vector): Line[] => {
        const CT = new Vector(this.center, P)
        return [new Line(P, CT, LinePropriety.Perpendicular)]
    }

    private _tangentsThroughOnePointOutsideTheCircle = (P: Vector) => {
        // y = mx + h
        // px, py => h = -m px + py => mx - y -m.px + py = 0 =>
        // Centre: cx, cy, radius: r
        // (m.cx - cy -m.px + py)^2 = r^2  * (m^2  + 1)
        // (m(cx-py) - (cy - py))^2 = r^2  * (m^2  + 1)

        const cx_px = this.center.x.clone().subtract(P.x), cy_py = this.center.y.clone().subtract(P.y),
            polyLeft = new Polynom('x'), polyRight = new Polynom('x^2+1')

        polyLeft.multiply(cx_px).subtract(cy_py).pow(2)
        polyRight.multiply(this.squareRadius)

        const equ = new Equation(polyLeft, polyRight)
        equ.moveLeft().simplify().solve()

        // TODO: solutions for an equations
        // return equ.solutions.map(sol => {
        //     //  h = -m px + py
        //     let h, equ = new Equation('y', 'x')

        //     if (sol.exact instanceof Fraction) {
        //         h = P.x.clone().opposite().multiply(sol.exact).add(P.y)
        //         equ.right.multiply(sol.exact).add(h)
        //     } else {
        //         h = P.x.clone().opposite().multiply(sol.value).add(P.y)
        //         equ.right.multiply(sol.value).add(h)
        //     }

        //     return new Line(equ)
        // })

    }

    private _tangentsWithSlope = (slope: Fraction): Line[] => {
        // d(C;t)=r => ac1+bc2 + x = +- sqrt(a^2 + b^2)*r
        // x = -ac1-bc2  +-  sqrt(a^2 + b^2)*r
        // y = a/bx + h => ax-by + H = 0

        const a = slope.numerator, b = -slope.denominator, c1 = this.center.x.clone(), c2 = this.center.y.clone()

        const sq = this.squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2),
            x1 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt()),
            x2 = c1.clone().multiply(a).opposite().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt())

        return [new Line(a, b, x1), new Line(a, b, x2)]
    }

    private _reset(): this {
        this.#center = undefined
        this.#squareRadius = undefined
        this.#cartesian = undefined

        return this
    }

    private parse(...values: unknown[]): this {
        // Data can be given in these formats:
        // one value, a string -> make it an Equation
        // one value, an Equation
        // one value, a circle -> clone it
        // two values: two points (center and pointThrough)
        // two values: point and Fraction (center and radius)
        // three values: Vector2D, Fraction, Boolean (center, square radius, true)

        this._reset()

        if (typeof values[0] === 'string') {
            this._parseEquation(new Equation(values[0]))
        } else if (values[0] instanceof Equation) {
            this._parseEquation(values[0])
        } else if (values[0] instanceof Circle) {
            this._parseCopyCircle(values[0])
        } else if (values[0] instanceof Vector && values.length > 1) {
            if (values[1] instanceof Vector) {
                if (values[2] instanceof Vector) {
                    // TODO: Add the method to parse through three points
                    // this._parseThroughtThreePoints(values[0], values[1], values[2])
                } else {
                    this._parseCenterAndPointThrough(values[0], values[1])
                }
            } else if (values[1] instanceof Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false)
            }
        }

        // Calculate once the different values.
        this._calculateCartesian()


        return this
    }

    private _calculateCartesian() {
        this.#cartesian = (new Equation(new Polynom(`(x-(${this.center.x.display}))^2+(y-(${this.center.y.display}))^2`), new Polynom(this.squareRadius.display))).moveLeft()
    }

    private _parseCopyCircle(circle: Circle): this {
        this.#center = circle.center.clone()
        this.#squareRadius = circle.squareRadius.clone()
        this._calculateCartesian()
        return this
    }

    private _parseCenterAndRadius(center: Vector, radius: Fraction | number, square?: boolean): this {
        this.#center = center.clone()

        if (square) {
            this.#squareRadius = (new Fraction(radius))
        } else {
            this.#squareRadius = new Fraction(radius).pow(2)
        }

        return this
    }

    private _parseCenterAndPointThrough(center: Vector, pointThrough: Vector): this {
        this.#center = center.clone()
        this.#squareRadius = new Vector(this.#center, pointThrough).normSquare
        return this
    }

    private _parseEquation(equ: Equation): this {

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

                this.#center = new Vector(x1.coefficient.clone().divide(2).opposite(), y1.coefficient.clone().divide(2).opposite())

                this.#squareRadius = c.coefficient.clone().opposite()
                    .add(this.#center.x.clone().pow(2))
                    .add(this.#center.y.clone().pow(2))

                this._calculateCartesian()
            } else {
                // The circle is not a valid circle
                this.#center = undefined
                this.#squareRadius = undefined
            }
        }
        return this
    }

    // private _parseThroughtThreePoints(A: Vector, B: Vector, C: Vector): this {
    //     const T = new Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(),
    //         mAC = T.remarquables.mediators.AC.clone()
    //     this.parse(mAB.intersection(mAC).point, A)

    //     return this
    // }

}