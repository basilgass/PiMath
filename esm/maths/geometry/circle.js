"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const point_1 = require("./point");
const fraction_1 = require("../coefficients/fraction");
const equation_1 = require("../algebra/equation");
const polynom_1 = require("../algebra/polynom");
class Circle {
    _center;
    _radius;
    _exists;
    constructor(...values) {
        this._exists = false;
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    parse(...values) {
        if (values.length === 2) {
            this._center = new point_1.Point(values[0]);
            this._radius = new fraction_1.Fraction(values[1]);
        }
    }
    get tex() {
        let cx, cy;
        if (this._center.x.isZero()) {
            cx = 'x^2';
        }
        else {
            cx = `\\left(x-${this._center.x.tex}\\right)^2`;
        }
        if (this._center.y.isZero()) {
            cy = 'y^2';
        }
        else {
            cy = `\\left(y-${this._center.y.tex}\\right)^2`;
        }
        return `${cx}+${cy}=${this._radius.pow(2).tex}`;
    }
    get developed() {
        let equ = new equation_1.Equation(new polynom_1.Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`), new polynom_1.Polynom(`${this._radius.pow(2).display}`));
        return equ.moveLeft().tex;
    }
}
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map