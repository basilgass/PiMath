"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
const fraction_1 = require("../coefficients/fraction");
const numeric_1 = require("../numeric");
const point_1 = require("./point");
class Vector {
    constructor(...values) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...values) => {
            // TODO: Must be more strict about what is given and limit to two dimensional vectors.p
            // Maybe more than one value was given...
            // Initialize the vector
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
                // Two points are given - skip the third value.
                if (values[0] instanceof point_1.Point && values[1] instanceof point_1.Point) {
                    this._x = values[1].x.clone().subtract(values[0].x);
                    this._y = values[1].y.clone().subtract(values[0].y);
                    return this;
                }
                // Fractions or a number are give
                if (values[0] instanceof fraction_1.Fraction || !isNaN(values[0])) {
                    this._x = new fraction_1.Fraction(values[0]);
                }
                if (values[1] instanceof fraction_1.Fraction || !isNaN(values[1])) {
                    this._y = new fraction_1.Fraction(values[1]);
                }
                if ((typeof values[0] === 'object' && !isNaN(values[0].x) && !isNaN(values[0].x)) &&
                    (typeof values[1] === 'object' && !isNaN(values[1].x) && !isNaN(values[1].x))) {
                    this._x = new fraction_1.Fraction(+values[1].x - values[0].x);
                    this._y = new fraction_1.Fraction(+values[1].y - values[0].y);
                }
            }
            return this;
        };
        this.clone = () => {
            let V = new Vector();
            if (this._x !== null) {
                V.x = this._x.clone();
            }
            if (this._y !== null) {
                V.y = this._y.clone();
            }
            return V;
        };
        this.reset = () => {
            this._x = null;
            this._y = null;
            return this;
        };
        this.zero = () => {
            this.reset();
            this._x = new fraction_1.Fraction(null);
            this._y = new fraction_1.Fraction(null);
            return this;
        };
        this.one = () => {
            this._x = new fraction_1.Fraction();
            this._y = new fraction_1.Fraction();
            return this;
        };
        this._parseString = (value) => {
            // Split comma, semi colon or single space.
            let components = value.split(/[,;\s]/g);
            // Validate the fraction values.
            this.x = new fraction_1.Fraction(components[0] || null);
            this.y = new fraction_1.Fraction(components[1] || null);
            return this;
        };
        // ------------------------------------------
        // Mathematical operations
        // ------------------------------------------
        this.opposed = () => {
            this._x.opposed();
            this._y.opposed();
            return this;
        };
        this.add = (V) => {
            this._x.add(V.x);
            this._y.add(V.y);
            return this;
        };
        this.subtract = (V) => {
            return this.add(V.clone().opposed());
        };
        this.scalarProductWithVector = (V) => {
            return Vector.scalarProduct(this, V);
            // return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
        };
        this.normal = () => {
            let x = this.x.clone().opposed(), y = this.y.clone();
            this._x = y;
            this._y = x;
            return this;
        };
        this.isNormalTo = (v) => {
            return this.scalarProductWithVector(v).isZero();
        };
        this.multiplyByScalar = (k) => {
            let scalar = new fraction_1.Fraction(k);
            this._x.multiply(scalar);
            this._y.multiply(scalar);
            return this;
        };
        this.divideByScalar = (k) => {
            return this.multiplyByScalar(new fraction_1.Fraction(k).invert());
        };
        // ------------------------------------------
        // Vector functions
        // ------------------------------------------
        this.simplify = () => {
            // Multiply by the lcm of denominators.
            return this.multiplyByScalar(numeric_1.Numeric.lcm(this._x.denominator, this._y.denominator))
                .divideByScalar(numeric_1.Numeric.gcd(this._x.numerator, this._y.numerator));
        };
        this.simplifyDirection = () => {
            let lcm = numeric_1.Numeric.lcm(this.x.denominator, this.y.denominator), gcd = numeric_1.Numeric.gcd(this.x.numerator, this.y.numerator);
            this.x.multiply(lcm).divide(gcd);
            this.y.multiply(lcm).divide(gcd);
            return this;
        };
        this.angleWith = (V, sharp, radian) => {
            let scalar = this.scalarProductWithVector(V).value, toDegree = radian ? 1 : 180 / Math.PI;
            if (sharp) {
                scalar = Math.abs(scalar);
            }
            return toDegree * Math.acos(scalar / (this.norm * V.norm));
        };
        this._x = new fraction_1.Fraction().zero();
        this._y = new fraction_1.Fraction().zero();
        if (values !== undefined) {
            this.parse(...values);
        }
    }
    ;
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = new fraction_1.Fraction(value);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = new fraction_1.Fraction(value);
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
    get asPoint() {
        return new point_1.Point(this.x, this.y);
    }
    get isNull() {
        return this.x.isZero() && this.y.isZero();
    }
}
exports.Vector = Vector;
Vector.scalarProduct = (v1, v2) => {
    return v1.x.clone().multiply(v2.x).add(v1.y.clone().multiply(v2.y));
};
//# sourceMappingURL=vector.js.map