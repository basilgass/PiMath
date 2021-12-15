"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const fraction_1 = require("../coefficients/fraction");
const numeric_1 = require("../numeric");
class Vector {
    _x;
    _y;
    constructor(...values) {
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
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
    get normSquare() {
        return this._x.clone().pow(2).add(this._y.clone().pow(2));
    }
    get norm() {
        return Math.sqrt(this.normSquare.value);
    }
    get tex() {
        return `\\begin{pmatrix}${this._x.tex} \\\\\ ${this._y.tex} \\end{pmatrix}`;
    }
    parse = (...values) => {
        this.zero();
        if (values.length === 0) {
            return this;
        }
        if (values.length === 1) {
            if (values[0] instanceof Vector) {
                return values[0].clone();
            }
            else {
                return this._parseString(values[0]);
            }
        }
        if (values.length >= 2) {
            if (values[0].isPoint && values[1].isPoint) {
                this._x = values[1].x.clone().subtract(values[0].x);
                this._y = values[1].y.clone().subtract(values[0].y);
                return this;
            }
            if (values[0].isFraction || !isNaN(values[0])) {
                this._x = new fraction_1.Fraction(values[0]);
            }
            if (values[1].isFraction || !isNaN(values[1])) {
                this._y = new fraction_1.Fraction(values[1]);
            }
        }
        return this;
    };
    clone = () => {
        let V = new Vector();
        if (this._x !== null) {
            V.x = this._x.clone();
        }
        if (this._y !== null) {
            V.y = this._y.clone();
        }
        return V;
    };
    reset = () => {
        this._x = null;
        this._y = null;
        return this;
    };
    zero = () => {
        this.reset();
        this._x = new fraction_1.Fraction(null);
        this._y = new fraction_1.Fraction(null);
        return this;
    };
    one = () => {
        this._x = new fraction_1.Fraction();
        this._y = new fraction_1.Fraction();
        return this;
    };
    _parseString = (value) => {
        let components = value.split(/[,;\s]/g);
        this.x = new fraction_1.Fraction(components[0] || null);
        this.y = new fraction_1.Fraction(components[1] || null);
        return this;
    };
    opposed = () => {
        this._x.opposed();
        this._y.opposed();
        return this;
    };
    add = (V) => {
        this._x.add(V.x);
        this._y.add(V.y);
        return this;
    };
    subtract = (V) => {
        return this.add(V.clone().opposed());
    };
    scalarProductWithVector = (V) => {
        return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
    };
    static scalarProduct = (v1, v2) => {
        return v1.x.value * v2.x.value + v1.y.value * v2.y.value;
    };
    normal = () => {
        let x = this.x.clone().opposed(), y = this.y.clone();
        this._x = y;
        this._y = x;
        return this;
    };
    isNormalTo = (v) => {
        return this.scalarProductWithVector(v).isZero();
    };
    multiplyByScalar = (k) => {
        let scalar = new fraction_1.Fraction(k);
        this._x.multiply(scalar);
        this._y.multiply(scalar);
        return this;
    };
    divideByScalar = (k) => {
        return this.multiplyByScalar(new fraction_1.Fraction(k).invert());
    };
    simplify = () => {
        return this.multiplyByScalar(numeric_1.Numeric.lcm(this._x.denominator, this._y.denominator))
            .divideByScalar(numeric_1.Numeric.gcd(this._x.numerator, this._y.numerator));
    };
    angleWith = (V, sharp, radian) => {
        let scalar = this.scalarProductWithVector(V).value, toDegree = radian ? 1 : 180 / Math.PI;
        if (sharp) {
            scalar = Math.abs(scalar);
        }
        return toDegree * Math.acos(scalar / (this.norm * V.norm));
    };
}
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map