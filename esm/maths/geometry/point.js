"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
const line_1 = require("./line");
const vector_1 = require("./vector");
const fraction_1 = require("../coefficients/fraction");
/**
 * Helper class - a way to identify an object {x: number, y: number}
 */
class PointXY {
}
class Point {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...values) => {
            // Initialize the value.
            this.zero();
            // Nothing is given
            if (values.length === 0) {
                return this;
            }
            // One element is given - might be already a point !
            if (values.length === 1) {
                // it's already a point - clone it
                if (values[0] instanceof Point) {
                    this._x = values[0].x.clone();
                    this._y = values[0].y.clone();
                    return this;
                }
                // Value is given as string, comma separated.
                if (typeof values[0] === 'string') {
                    let xy = values[0].split(',');
                    if (xy.length === 2) {
                        this._x = new fraction_1.Fraction(xy[0]).reduce();
                        this._y = new fraction_1.Fraction(xy[1]).reduce();
                        return this;
                    }
                }
                // Value given as an object with {x: value, y: value}
                if (values[0] instanceof PointXY) {
                    this._x = new fraction_1.Fraction(values[0].x).reduce();
                    this._y = new fraction_1.Fraction(values[0].y).reduce();
                    return this;
                }
                else {
                    return this.zero();
                }
            }
            if (values.length === 2) {
                this._x = new fraction_1.Fraction(values[0]).reduce();
                this._y = new fraction_1.Fraction(values[1]).reduce();
                return this;
            }
            return this;
        };
        this.clone = () => {
            this._x = this._x.clone();
            this._y = this._y.clone();
            return this;
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
        // ------------------------------------------
        // Display functions
        // ------------------------------------------
        this.texValues = (numberOfDigits) => {
            let pts = [];
            pts.push(this._x.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            pts.push(this._y.value.toFixed(numberOfDigits === undefined ? 2 : numberOfDigits));
            return `\\left(${pts.join(';')}\\right)`;
        };
        this.distanceTo = (item) => {
            let value = 0, fraction = new fraction_1.Fraction(), tex = '';
            if (item instanceof line_1.Line) {
                return item.distanceTo(this);
            }
            else if (item instanceof Point) {
                let V = new vector_1.Vector(this, item);
                value = V.norm;
                fraction = V.normSquare.sqrt();
                tex = V.normSquare.isSquare() ? fraction.tex : `\\sqrt{\\frac{ ${V.normSquare.numerator} }{ ${V.normSquare.denominator} }}`;
            }
            return { value, fraction, tex };
        };
        this.isInListOfPoints = (list) => {
            const keyList = list.map(x => x.key);
            return keyList.includes(this.key);
        };
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
        return this;
    }
    ;
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
    get key() {
        return `${this.x.display};${this.y.display}`;
    }
}
exports.Point = Point;
// ------------------------------------------
// Mathematical operations
// ------------------------------------------
// ------------------------------------------
// Vector functions
// ------------------------------------------
// ------------------------------------------
// Static functions
// ------------------------------------------
Point.pmatrix = (a, b, c) => {
    if (c === undefined) {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\end{pmatrix}`;
    }
    else {
        return `\\begin{pmatrix} ${a.tex ? a.tex : a} \\\\ ${b.tex ? b.tex : b} \\\\ ${c.tex ? c.tex : c} \\end{pmatrix}`;
    }
};
//# sourceMappingURL=point.js.map