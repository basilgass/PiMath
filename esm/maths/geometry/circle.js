"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const point_1 = require("./point");
const coefficients_1 = require("../coefficients");
const algebra_1 = require("../algebra");
const line_1 = require("./line");
const vector_1 = require("./vector");
const triangle_1 = require("./triangle");
const numeric_1 = require("../numeric");
class Circle {
    constructor(...values) {
        /**
         * Get the relative position between circle and line. It corresponds to the number of intersection.
         * @param {Line} L
         * @returns {number}
         */
        this.relativePosition = (L) => {
            let distance = L.distanceTo(this.center), radius = Math.sqrt(this._squareRadius.value);
            if (distance.value - radius > 0.0000000001) {
                return 0; // external
            }
            else if (Math.abs(distance.value - radius) < 0.0000000001) {
                return 1; // tangent
            }
            else {
                return 2; // external
            }
        };
        this.lineIntersection = (L) => {
            let intersectionPoints = [], solX;
            if (this._cartesian === null) {
                return [];
            }
            const equX = this._cartesian.clone(), lineX = L.equation.clone().isolate('x'), lineY = L.equation.clone().isolate('y');
            if (lineX instanceof algebra_1.Equation && lineY instanceof algebra_1.Equation) {
                equX.replaceBy('y', lineY.right).simplify();
                equX.solve();
                for (let x of equX.solutions) {
                    if (x.exact === false && isNaN(x.value)) {
                        continue;
                    }
                    solX = new coefficients_1.Fraction(x.exact === false ? x.value : x.exact);
                    intersectionPoints.push(new point_1.Point(solX.clone(), lineY.right.evaluate(solX)));
                }
            }
            return intersectionPoints;
        };
        this.tangents = (P) => {
            if (P instanceof coefficients_1.Fraction) {
                return this._tangentsWithSlope(P);
            }
            else if (this.isPointOnCircle(P)) {
                return this._tangentsThroughOnePointOnTheCircle(P);
            }
            else if (this.center.distanceTo(P).value > this.radius.value) {
                //TODO:  Must check it's outside the circle
                return this._tangentsThroughOnePointOutsideTheCircle(P);
            }
            else {
                console.log('No tangents as the point is inside !');
            }
            return [];
        };
        this.isPointOnCircle = (P) => {
            return this._cartesian.test({ x: P.x, y: P.y });
        };
        this.getPointsOnCircle = (numberIsInteger) => {
            if (numberIsInteger === undefined) {
                numberIsInteger = false;
            }
            // It means searching for pythagorician triples that make a perfect square.
            // (x-4)^2 + (y+3)^2 = 15
            let triplets = numeric_1.Numeric.pythagoricianTripletsWithTarget(this._squareRadius.value, true);
            let points = [], pt;
            triplets.forEach(triplet => {
                // Allow positive / negative values
                // x-a = t  => x = a + t
                // x-a = -t => x = a - t
                for (let k of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
                    pt = new point_1.Point(this.center.x.clone().add(k[0] * triplet[0]), this.center.y.clone().add(k[1] * triplet[1]));
                    // Check if the point is not already in points.
                    if (!pt.isInListOfPoints(points)) {
                        points.push(pt);
                    }
                }
            });
            return points;
        };
        this._tangentsThroughOnePointOnTheCircle = (P) => {
            let CT = new vector_1.Vector(this._center, P);
            return [new line_1.Line(P, CT, line_1.LinePropriety.Perpendicular)];
        };
        this._tangentsThroughOnePointOutsideTheCircle = (P) => {
            // y = mx + h
            // px, py => h = -m px + py => mx - y -m.px + py = 0 =>
            // Centre: cx, cy, radius: r
            // (m.cx - cy -m.px + py)^2 = r^2  * (m^2  + 1)
            // (m(cx-py) - (cy - py))^2 = r^2  * (m^2  + 1)
            let cx_px = this.center.x.clone().subtract(P.x), cy_py = this.center.y.clone().subtract(P.y), polyLeft = new algebra_1.Polynom('x'), polyRight = new algebra_1.Polynom('x^2+1');
            polyLeft.multiply(cx_px).subtract(cy_py).pow(2);
            polyRight.multiply(this.squareRadius);
            let equ = new algebra_1.Equation(polyLeft, polyRight);
            equ.moveLeft().simplify().solve();
            return equ.solutions.map(sol => {
                //  h = -m px + py
                let h, equ = new algebra_1.Equation('y', 'x');
                if (sol.exact instanceof coefficients_1.Fraction) {
                    h = P.x.clone().opposed().multiply(sol.exact).add(P.y);
                    equ.right.multiply(sol.exact).add(h);
                }
                else {
                    h = P.x.clone().opposed().multiply(sol.value).add(P.y);
                    equ.right.multiply(sol.value).add(h);
                }
                return new line_1.Line(equ);
            });
        };
        this._tangentsWithSlope = (slope) => {
            // d(C;t)=r => ac1+bc2 + x = +- sqrt(a^2 + b^2)*r
            // x = -ac1-bc2  +-  sqrt(a^2 + b^2)*r
            // y = a/bx + h => ax-by + H = 0
            const a = slope.numerator, b = -slope.denominator, c1 = this._center.x.clone(), c2 = this._center.y.clone(), r = this._squareRadius;
            let sq = this._squareRadius.clone().multiply(slope.numerator ** 2 + slope.denominator ** 2), x1 = c1.clone().multiply(a).opposed().subtract(c2.clone().multiply(b)).add(sq.clone().sqrt()), x2 = c1.clone().multiply(a).opposed().subtract(c2.clone().multiply(b)).subtract(sq.clone().sqrt());
            return [new line_1.Line(a, b, x1), new line_1.Line(a, b, x2)];
        };
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    get center() {
        return this._center;
    }
    get squareRadius() {
        return this._squareRadius;
    }
    get cartesian() {
        return this._cartesian;
    }
    get exists() {
        return this._exists;
    }
    get radius() {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
                value: this._squareRadius.clone().sqrt().value
            };
        }
        else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`,
                value: this._squareRadius.clone().sqrt().value
            };
        }
        return this._squareRadius;
    }
    get tex() {
        if (this._exists) {
            let cx, cy;
            if (this._center.x.isZero()) {
                cx = 'x^2';
            }
            else {
                cx = `\\left(x${this._center.x.isNegative() ? '+' : '-'}${this._center.x.clone().abs().tex}\\right)^2`;
            }
            if (this._center.y.isZero()) {
                cy = 'y^2';
            }
            else {
                cy = `\\left(y${this._center.y.isNegative() ? '+' : '-'}${this._center.y.clone().abs().tex}\\right)^2`;
            }
            return `${cx}+${cy}=${this._squareRadius.tex}`;
        }
        else {
            return `\\text{le cercle n'existe pas.}`;
        }
    }
    get developed() {
        return this._cartesian.tex;
    }
    // TODO: reformat code for better display.
    get display() {
        return this._cartesian.display;
    }
    clone() {
        this._center = this._center.clone();
        this._squareRadius = this._squareRadius.clone();
        this._calculateCartesian();
        return this;
    }
    _reset() {
        this._center = null;
        this._squareRadius = null;
        this._cartesian = null;
        this._exists = false;
        return this;
    }
    parse(...values) {
        // Data can be given in these formats:
        // one value, a string -> make it an Equation
        // one value, an Equation
        // one value, a circle -> clone it
        // two values: two points (center and pointThrough)
        // two values: point and Fraction (center and radius)
        // three values: Point, Fraction, Boolean (center, square radius, true)
        this._reset();
        if (typeof values[0] === 'string') {
            this._parseEquation(new algebra_1.Equation(values[0]));
        }
        else if (values[0] instanceof algebra_1.Equation) {
            this._parseEquation(values[0]);
        }
        else if (values[0] instanceof Circle) {
            this._parseCopyCircle(values[0]);
        }
        else if (values[0] instanceof point_1.Point && values.length > 1) {
            if (values[1] instanceof point_1.Point) {
                if (values[2] instanceof point_1.Point) {
                    this._parseThroughtThreePoints(values[0], values[1], values[2]);
                }
                else {
                    this._parseCenterAndPointThrough(values[0], values[1]);
                }
            }
            else if (values[1] instanceof coefficients_1.Fraction || typeof values[1] === 'number') {
                this._parseCenterAndRadius(values[0], values[1], (typeof values[2] === "boolean") ? values[2] : false);
            }
        }
        // Calculate once the different values.
        if (this._exists) {
            this._calculateCartesian();
            // If the square radius is zero or positive, the circle exists.
            if (this._squareRadius !== undefined && this._squareRadius.isNegative()) {
                this._exists = false;
            }
        }
        return this;
    }
    _calculateCartesian() {
        this._cartesian = (new algebra_1.Equation(new algebra_1.Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new algebra_1.Polynom(`${this._squareRadius.display}`))).moveLeft();
    }
    _parseCopyCircle(circle) {
        this._center = circle.center.clone();
        this._squareRadius = circle.squareRadius.clone();
        this._calculateCartesian();
        this._exists = circle.exists;
        return this;
    }
    _parseCenterAndRadius(center, radius, square) {
        this._center = center.clone();
        if (square) {
            this._squareRadius = (new coefficients_1.Fraction(radius));
        }
        else {
            this._squareRadius = new coefficients_1.Fraction(radius).pow(2);
        }
        this._exists = true;
        return this;
    }
    _parseCenterAndPointThrough(center, pointThrough) {
        this._center = center.clone();
        this._squareRadius = new vector_1.Vector(this._center, pointThrough).normSquare;
        this._exists = true;
        return this;
    }
    _parseEquation(equ) {
        this._exists = false;
        // Move everything to the left.
        equ.moveLeft();
        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            // Both must be of degree 2.
            let x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y'), x1, y1, c;
            // Both square monoms must have the same coefficient.
            if (x2.coefficient.isEqual(y2.coefficient)) {
                equ.divide(x2.coefficient);
                x1 = equ.left.monomByDegree(1, 'x');
                y1 = equ.left.monomByDegree(1, 'y');
                c = equ.left.monomByDegree(0);
                this._center = new point_1.Point(x1.coefficient.clone().divide(2).opposed(), y1.coefficient.clone().divide(2).opposed());
                this._squareRadius = c.coefficient.clone().opposed()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2));
                this._calculateCartesian();
                this._exists = true;
            }
            else {
                // The circle is not a valid circle
                this._center = null;
                this._squareRadius = null;
                this._exists = false;
            }
        }
        return this;
    }
    _parseThroughtThreePoints(A, B, C) {
        let T = new triangle_1.Triangle(A, B, C), mAB = T.remarquables.mediators.AB.clone(), mAC = T.remarquables.mediators.AC.clone();
        this.parse(mAB.intersection(mAC).point, A);
        return this;
    }
}
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map