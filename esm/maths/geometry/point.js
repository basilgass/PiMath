"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const coefficients_1 = require("../coefficients");
class PointXY {
    x;
    y;
}
class Point {
    _x;
    _y;
    _exist;
    constructor(...values) {
        this._x = new coefficients_1.Fraction().zero();
        this._y = new coefficients_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
        return this;
    }
    ;
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
    get display() {
        let pts = [];
        pts.push(this._x.tex);
        pts.push(this._y.tex);
        return `(${pts.join(';')})`;
    }
    parse = (...values) => {
        this.zero();
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Point) {
                this._x = values[0].x.clone();
                this._y = values[0].y.clone();
                return this;
            }
            if (typeof values[0] === 'string') {
                let xy = values[0].split(',');
                if (xy.length === 2) {
                    this._x = new coefficients_1.Fraction(xy[0]).reduce();
                    this._y = new coefficients_1.Fraction(xy[1]).reduce();
                    return this;
                }
            }
            if (values[0] instanceof PointXY) {
                this._x = new coefficients_1.Fraction(values[0].x).reduce();
                this._y = new coefficients_1.Fraction(values[0].y).reduce();
                return this;
            }
            else {
                return this.zero();
            }
        }
        if (values.length === 2) {
            this._x = new coefficients_1.Fraction(values[0]).reduce();
            this._y = new coefficients_1.Fraction(values[1]).reduce();
            return this;
        }
        return this;
    };
    clone = () => {
        this._x = this._x.clone();
        this._y = this._y.clone();
        return this;
    };
    zero = () => {
        this._x = new coefficients_1.Fraction(null);
        this._y = new coefficients_1.Fraction(null);
        return this;
    };
    origin = () => {
        this.zero();
        return this;
    };
    middleOf = (P1, P2) => {
        this._x = P1.x.clone().add(P2.x).divide(2);
        this._y = P1.y.clone().add(P2.y).divide(2);
        return this;
    };
    texValues = (numberOfDigits) => {
        let pts = [];
        pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
        pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
        return `\\left(${pts.join(';')}\\right)`;
    };
    static pmatrix = (a, b, c) => {
        if (c === undefined) {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
        }
        else {
            return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
        }
    };
}
exports.Point = Point;
//# sourceMappingURL=point.js.map