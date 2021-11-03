"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const fraction_1 = require("../coefficients/fraction");
class Point {
    constructor(...values) {
        this.parse = (...values) => {
            this.zero();
            if (values.length === 0) {
                return this;
            }
            if (values.length === 1) {
                if (values[0].isPoint) {
                    return values.clone();
                }
                if (values[0].x !== undefined && values[0].y !== undefined) {
                    this._x = new fraction_1.Fraction(values[0].x).reduce();
                    this._y = new fraction_1.Fraction(values[0].y).reduce();
                }
                else {
                    return this.zero();
                }
            }
            if (values.length === 2) {
                this._x = new fraction_1.Fraction(values[0]).reduce();
                this._y = new fraction_1.Fraction(values[1]).reduce();
            }
            return this;
        };
        this.clone = () => {
            let V = new Point();
            if (this._x !== null) {
                V.x = this._x.clone();
            }
            if (this._y !== null) {
                V.y = this._y.clone();
            }
            return V;
        };
        this.zero = () => {
            this._x = new fraction_1.Fraction(null);
            this._y = new fraction_1.Fraction(null);
            return this;
        };
        this.origin = () => {
            this.zero();
            return this;
        };
        this.middleOf = (P1, P2) => {
            this._x = P1.x.clone().add(P2.x).divide(2);
            this._y = P1.y.clone().add(P2.y).divide(2);
            return this;
        };
        this.texValues = (numberOfDigits) => {
            let pts = [];
            pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            return `\\left(${pts.join(';')}\\right)`;
        };
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    ;
    get isPoint() {
        return true;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get tex() {
        let pts = [];
        pts.push(this._x.tex);
        pts.push(this._y.tex);
        return `\\left(${pts.join(';')}\\right)`;
    }
}
exports.Point = Point;
Point.pmatrix = (a, b, c) => {
    if (c === undefined) {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
    }
    else {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
    }
};
//# sourceMappingURL=point.js.map