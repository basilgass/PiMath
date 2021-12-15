"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const point_1 = require("./point");
const coefficients_1 = require("../coefficients");
const algebra_1 = require("../algebra");
const vector_1 = require("./vector");
class Circle {
    _center;
    _radius;
    _squareRadius;
    _cartesian;
    _exists;
    constructor(...values) {
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    get center() {
        return this._center;
    }
    parse(...values) {
        if (values.length === 1 && typeof values[0] === 'string') {
            this.checkCircle(new algebra_1.Equation(values[0]));
        }
        else if (values.length >= 2) {
            this._center = new point_1.Point(values[0]);
            if (values[1] instanceof point_1.Point) {
                this._squareRadius = new vector_1.Vector(this._center, values[1]).normSquare;
            }
            else {
                if (values[2] === true) {
                    this._squareRadius = new coefficients_1.Fraction(values[1]);
                }
                else {
                    this._radius = new coefficients_1.Fraction(values[1]);
                    this._squareRadius = this._radius.clone().pow(2);
                }
            }
            this._cartesian = (new algebra_1.Equation(new algebra_1.Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new algebra_1.Polynom(`${this._squareRadius.display}`))).moveLeft();
        }
    }
    get radius() {
        if (this._squareRadius.isSquare()) {
            return {
                tex: this._squareRadius.clone().sqrt().tex,
                display: this._squareRadius.clone().sqrt().display,
            };
        }
        else {
            return {
                tex: `\\sqrt{${this._squareRadius.tex}}`,
                display: `sqrt(${this._squareRadius.display})`
            };
        }
        return this._squareRadius;
    }
    get tex() {
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
    get developed() {
        return this._cartesian.tex;
    }
    checkCircle = (P) => {
        if (P.degree('x').value === 2 && P.degree('y').value === 2) {
            let x2 = P.left.monomByDegree(2, 'x'), y2 = P.left.monomByDegree(2, 'y'), x1, y1, c;
            if (x2.coefficient.isEqual(y2.coefficient)) {
                P.divide(x2.coefficient);
                x1 = P.left.monomByDegree(1, 'x');
                y1 = P.left.monomByDegree(1, 'y');
                c = P.left.monomByDegree(0);
                this._center = new point_1.Point(x1.coefficient.clone().divide(2).opposed(), y1.coefficient.clone().divide(2).opposed());
                this._squareRadius = c.coefficient.clone().opposed()
                    .add(this._center.x.clone().pow(2))
                    .add(this._center.y.clone().pow(2));
            }
        }
        return false;
    };
    relativePosition = (L) => {
        let distance = L.distanceTo(this.center), radius = Math.sqrt(this._squareRadius.value);
        if (distance.value - radius > 0.0000000001) {
            return 0;
        }
        else if (Math.abs(distance.value - radius) < 0.0000000001) {
            return 1;
        }
        else {
            return 2;
        }
    };
}
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map