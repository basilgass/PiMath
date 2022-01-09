import {Point} from "./point";
import {Fraction} from "../coefficients";
import {Equation, Monom, Polynom} from "../algebra";
import {Line} from "./line";
import {Vector} from "./vector";
import {Triangle} from "./triangle";

export class Circle {
    private _center: Point;
    private _squareRadius: Fraction;
    private _cartesian: Equation;
    private _exists: boolean;

    constructor(...values: unknown[]) {
        this._exists = false

        if (values !== undefined) {
            this.parse(...values)
        }
    }


    get center(): Point {
        return this._center;
    }


    get exists(): boolean {
        return this._exists;
    }

    get squareRadius(): Fraction {
        return this._squareRadius
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

        if (this._exists) {
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
        } else {
            return `\\text{le cercle n'existe pas.}`
        }
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

    clone(): Circle {
        this._center = this._center.clone()
        this._squareRadius = this._squareRadius.clone()
        this._calculateCartesian()
        return this
    }

    private _reset(): Circle {
        this._center = null
        this._squareRadius = null
        this._cartesian = null
        this._exists = false

        return this
    }

    private parse(...values: unknown[]): Circle {
        // Data can be given in these formats:
        // one value, a string -> make it an Equation
        // one value, an Equation
        // one value, a circle -> clone it
        // two values: two points (center and pointThrough)
        // two values: point and Fraction (center and radius)
        // three values: Point, Fraction, Boolean (center, square radius, true)

        this._reset()

        if (typeof values[0] === 'string') {
            this._parseEquation(new Equation(values[0]))
        } else if (values[0] instanceof Equation) {
            this._parseEquation(values[0])
        } else if (values[0] instanceof Circle) {
            this._parseCopyCircle(values[0])
        } else if (values[0] instanceof Point && values.length > 1) {
            if (values[1] instanceof Point) {
                if (values[2] instanceof Point) {
                    this._parseThroughtThreePoints(values[0], values[1], values[2])
                } else {
                    this._parseCenterAndPointThrough(values[0], values[1])
                }
            } else if (values[1] instanceof Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false)
            }
        }

        // Calculate once the different values.
        if(this._exists) {
            this._calculateCartesian()

            // If the square radius is zero or positive, the circle exists.
            if (this._squareRadius !== undefined && this._squareRadius.isNegative()) {
                this._exists = false
            }
        }

        return this
    }

    private _calculateCartesian() {
        this._cartesian = (new Equation(
            new Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`),
            new Polynom(`${this._squareRadius.display}`)
        )).moveLeft()
    }

    private _parseCopyCircle(circle: Circle): Circle {
        this._center = circle.center.clone()
        this._squareRadius = circle.squareRadius.clone()
        this._calculateCartesian()
        this._exists = circle.exists
        return this
    }

    private _parseCenterAndRadius(center: Point, radius: Fraction | number, square?: boolean): Circle {
        this._center = center.clone()

        if (square) {
            this._squareRadius = (new Fraction(radius))
        } else {
            this._squareRadius = new Fraction(radius).pow(2)
        }

        this._exists = true
        return this
    }

    private _parseCenterAndPointThrough(center: Point, pointThrough: Point): Circle {
        this._center = center.clone()
        this._squareRadius = new Vector(this._center, pointThrough).normSquare
        this._exists = true
        return this
    }

    private _parseEquation(equ: Equation): Circle {
        this._exists = false

        // Move everything to the left.
        equ.moveLeft()

        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            // Both must be of degree 2.
            let x2 = equ.left.monomByDegree(2, 'x'),
                y2 = equ.left.monomByDegree(2, 'y'),
                x1: Monom, y1: Monom, c: Monom

            // Both square monoms must have the same coefficient.
            if (x2.coefficient.isEqual(y2.coefficient)) {
                equ.divide(x2.coefficient)

                x1 = equ.left.monomByDegree(1, 'x')
                y1 = equ.left.monomByDegree(1, 'y')

                c = equ.left.monomByDegree(0)

                this._center = new Point(
                    x1.coefficient.clone().divide(2).opposed(),
                    y1.coefficient.clone().divide(2).opposed()
                )

                this._squareRadius = c.coefficient.clone().opposed()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2))

                this._calculateCartesian()
                this._exists = true
            }else{
                // The circle is not a valid circle
                this._center = null
                this._squareRadius = null
                this._exists = false
            }
        }
        return this
    }

    private _parseThroughtThreePoints(A: Point, B: Point, C: Point): Circle {
        let T = new Triangle(A, B, C),
            mAB = T.remarquables.mediators.AB.clone(),
            mAC = T.remarquables.mediators.AC.clone()
        this.parse(mAB.intersection(mAC).point, A)

        return this
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
        let intersectionPoints: Point[] = [], solX: Fraction

        if(this._cartesian===null){return []}
        const equX = this._cartesian.clone(),
            lineX = L.equation.clone().isolate('x'),
            lineY = L.equation.clone().isolate('y')

        if (lineX instanceof Equation && lineY instanceof Equation) {
            equX.replaceBy('y', lineY.right).simplify()
            equX.solve()

            for(let x of equX.solutions){
                if(x.exact===false && isNaN(x.value)){continue}

                solX = new Fraction(x.exact===false?x.value:x.exact)
                intersectionPoints.push(
                    new Point(
                        solX.clone(),
                        lineY.right.evaluate(solX)
                    )
                )
            }
        }

        return intersectionPoints
    }
}