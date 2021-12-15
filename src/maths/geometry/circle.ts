import {Point} from "./point";
import {Fraction} from "../coefficients";
import {Equation, Monom, Polynom} from "../algebra";
import {Line} from "./line";
import {Vector} from "./vector";


export class Circle {
    private _center: Point;
    private _radius: Fraction;
    private _squareRadius: Fraction;
    private _cartesian: Equation;
    private _exists: boolean;

    constructor(...values: any) {
        this._exists = false

        if (values !== undefined) {
            this.parse(...values)
        }
    }


    get center(): Point {
        return this._center;
    }

    get radius(): { tex: string, display: string } {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
            }
        } else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`
            }
        }
        return this._squareRadius
    }

    get tex(): string {
        let cx, cy
        if (this._center.x.isZero()) {
            cx = 'x^2'
        } else {
            cx = `\\left(x${this._center.x.isNegative() ? '+' : '-'}${this._center.x.clone().abs().tex}\\right)^2`
        }
        if (this._center.y.isZero()) {
            cy = 'y^2'
        } else {
            cy = `\\left(y${this._center.y.isNegative() ? '+' : '-'}${this._center.y.clone().abs().tex}\\right)^2`
        }
        return `${cx}+${cy}=${this._squareRadius.tex}`
    }

    get developed(): string {
        return this._cartesian.tex
    }


    // TODO: reformat code for better display.
    get display(): string {
        return this._cartesian.display
    }

    get cartesian(): Equation {
        return this._cartesian
    }

    private parse(...values: any) {
        if (values.length === 1 && typeof values[0] === 'string') {
            this.checkCircle(new Equation(values[0]))
        } else if (values.length >= 2) {
            this._center = new Point(values[0])

            if (values[1] instanceof Point) {
                // Go through this point
                this._squareRadius = new Vector(this._center, values[1]).normSquare
            } else {
                if (values[2] === true) {
                    this._squareRadius = new Fraction(values[1])
                } else {
                    this._radius = new Fraction(values[1])
                    this._squareRadius = this._radius.clone().pow(2)
                }
            }
            this._cartesian = (new Equation(
                new Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`),
                new Polynom(`${this._squareRadius.display}`)
            )).moveLeft()
        }
    }


    checkCircle = (P: Equation): boolean => {
        if (P.degree('x').value === 2 && P.degree('y').value === 2) {
            // Both must be of degree 2.
            let x2 = P.left.monomByDegree(2, 'x'),
                y2 = P.left.monomByDegree(2, 'y'),
                x1: Monom, y1: Monom, c: Monom

            // Both square monoms must have the same coefficient.
            if (x2.coefficient.isEqual(y2.coefficient)) {
                P.divide(x2.coefficient)

                x1 = P.left.monomByDegree(1, 'x')
                y1 = P.left.monomByDegree(1, 'y')

                c = P.left.monomByDegree(0)

                this._center = new Point(
                    x1.coefficient.clone().divide(2).opposed(),
                    y1.coefficient.clone().divide(2).opposed()
                )

                this._squareRadius = c.coefficient.clone().opposed()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2))

            }
        }

        return false
    }

    /**
     * Get the relative position between circle and line. It corresponds to the number of intersection.
     * @param {Line} L
     * @returns {number}
     */
    relativePosition = (L: Line): number => {
        let distance = L.distanceTo(this.center),
            radius = Math.sqrt(this._squareRadius.value)

        if (distance.value - radius > 0.0000000001) {
            return 0 // external
        } else if (Math.abs(distance.value - radius) < 0.0000000001) {
            return 1 // tangent
        } else {
            return 2 // external
        }
    }

    lineIntersection = (L: Line): Point[] => {
        let P1: Point, P2: Point

        const equ = this._cartesian.clone(),
            yLine = L.equation.clone().isolate('y')

        if (yLine instanceof Equation) {
            equ.replaceBy('y', yLine.right)
            equ.solve()
        }

        return []
    }
}