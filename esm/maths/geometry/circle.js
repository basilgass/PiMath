"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const point_1 = require("./point");
const coefficients_1 = require("../coefficients");
const algebra_1 = require("../algebra");
const vector_1 = require("./vector");
const triangle_1 = require("./triangle");
class Circle {
    _center;
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
    get exists() {
        return this._exists;
    }
    get squareRadius() {
        return this._squareRadius;
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
    get display() {
        return this._cartesian.display;
    }
    get cartesian() {
        return this._cartesian;
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
        if (this._exists) {
            this._calculateCartesian();
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
        equ.moveLeft();
        if (equ.degree('x').value === 2 && equ.degree('y').value === 2) {
            let x2 = equ.left.monomByDegree(2, 'x'), y2 = equ.left.monomByDegree(2, 'y'), x1, y1, c;
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
    lineIntersection = (L) => {
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
}
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map