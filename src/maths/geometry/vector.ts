/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import {Fraction} from "../coefficients/fraction";
import {Numeric} from "../numeric";

export class Vector {
    private _x: Fraction;   // 1st component
    private _y: Fraction;   // 2nd component

    constructor(...values: any) {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();

        if (values !== undefined) {
            this.parse(...values);
        }
    };

    get isVector() {
        return true;
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get x(): Fraction {
        return this._x;
    }

    set x(value: Fraction) {
        this._x = value;
    }

    get y(): Fraction {
        return this._y;
    }

    set y(value: Fraction) {
        this._y = value;
    }

    get normSquare(): Fraction {
        return this._x.clone().pow(2).add(this._y.clone().pow(2));
    }

    get norm(): number {
        return Math.sqrt(this.normSquare.value);
    }

    get tex(): string {
        return `\\begin{pmatrix}${this._x.tex} \\\\\ ${this._y.tex} \\end{pmatrix}`
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------

    parse = (...values: any): Vector => {
        // TODO: Must be more strict about what is given and limit to two dimensional vectors.p
        // Maybe more than one value was given...
        // Initialize the vector
        this.zero();

        if (values.length === 0) {
            return this;
        }

        if (values.length === 1) {
            if (values[0].isVector) {
                return values[0].clone()
            } else {
                return this._parseString(values[0])
            }
        }

        if (values.length >= 2) {
            // Two points are given - skip the third value.
            if (values[0].isPoint && values[1].isPoint) {
                this._x = values[1].x.clone().subtract(values[0].x)
                this._y = values[1].y.clone().subtract(values[0].y)
                return this;
            }

            // Fractions or a number are give
            if (values[0].isFraction || !isNaN(values[0])) {
                this._x = new Fraction(values[0])
            }
            if (values[1].isFraction || !isNaN(values[1])) {
                this._y = new Fraction(values[1])
            }
        }

        return this;
    };

    clone = (): Vector => {
        let V = new Vector();

        if (this._x !== null) {
            V.x = this._x.clone();
        }
        if (this._y !== null) {
            V.y = this._y.clone();
        }
        return V;
    }

    reset = (): Vector => {
        this._x = null;
        this._y = null;
        return this;
    }

    zero = (): Vector => {
        this.reset();
        this._x = new Fraction(null);
        this._y = new Fraction(null);
        return this;
    }

    one = (): Vector => {
        this._x = new Fraction();
        this._y = new Fraction();
        return this;
    }

    private _parseString = (value: string): Vector => {
        // Split comma, semi colon or single space.
        let components = value.split(/[,;\s]/g);

        // Validate the fraction values.
        this.x = new Fraction(components[0] || null);
        this.y = new Fraction(components[1] || null);
        return this;
    };

    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    opposed = (): Vector => {
        this._x.opposed();
        this._y.opposed();
        return this;
    }

    add = (V: Vector): Vector => {
        this._x.add(V.x);
        this._y.add(V.y);

        return this;
    }

    subtract = (V: Vector): Vector => {
        return this.add(V.clone().opposed());
    }

    scalarProductWithVector = (V: Vector): Fraction => {
        // TODO: Add the scalar factor !!!!
        return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
    }

    static scalarProduct = (v1: Vector, v2: Vector): number => {
        // TODO: Transform to fraction with nthroot.
        return  v1.x.value * v2.x.value + v1.y.value * v2.y.value;
    };

    normal = (): Vector => {
        let x = this.x.clone().opposed(), y = this.y.clone();
        this._x = y;
        this._y = x;
        return this;
    }

    isNormalTo = (v: Vector): boolean => {
        return this.scalarProductWithVector(v).isZero()
    }

    multiplyByScalar = (k: any): Vector => {
        let scalar = new Fraction(k);
        this._x.multiply(scalar);
        this._y.multiply(scalar);
        return this;
    }

    divideByScalar = (k:any): Vector => {
        return this.multiplyByScalar(new Fraction(k).invert());
    }
    // ------------------------------------------
    // Vector functions
    // ------------------------------------------

    simplify = (): Vector => {
        // Multiply by the lcm of denominators.
        return this.multiplyByScalar(Numeric.lcm(this._x.denominator, this._y.denominator))
            .divideByScalar(Numeric.gcd(this._x.numerator, this._y.numerator));
    }

    angleWith = (V: Vector, sharp?: Boolean, radian?: Boolean): number => {
        let scalar = this.scalarProductWithVector(V).value,
            toDegree = radian ? 1 : 180 / Math.PI;
        if (sharp) {
            scalar = Math.abs(scalar);
        }

        return toDegree * Math.acos(scalar / (this.norm * V.norm));
    }
}
