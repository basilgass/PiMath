/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import {Fraction} from "../coefficients/fraction";
import {Numeric} from "../numeric.ts";
import {Point} from "./point";

export class Vector {
    private _x: Fraction;   // 1st component
    private _y: Fraction;   // 2nd component

    constructor(...values: unknown[]) {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();

        if (values !== undefined) {
            this.parse(...values);
        }
    };

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get x(): Fraction {
        return this._x;
    }

    set x(value: Fraction | number | string) {
        this._x = new Fraction(value);
    }

    get y(): Fraction {
        return this._y;
    }

    set y(value: Fraction | number | string) {
        this._y = new Fraction(value);
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

    get asPoint(): Point {
        return new Point(this.x, this.y)
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------

    get isNull(): boolean {
        return this.x.isZero() && this.y.isZero()
    }

    static scalarProduct = (v1: Vector, v2: Vector): Fraction => {
        return v1.x.clone().multiply(v2.x).add(v1.y.clone().multiply(v2.y));
    };

    static determinant = (v1: Vector, v2: Vector): Fraction => {
        return v1.x.clone().multiply(v2.y).subtract(v1.y.clone().multiply(v2.x))
    }

    parse = (...values: any): Vector => {
        // TODO: Must be more strict about what is given and limit to two dimensional vectors.p
        // Maybe more than one value was given...
        // Initialize the vector
        this.zero();

        if (values.length === 0) {
            return this;
        }

        if (values.length === 1) {
            if (values[0] instanceof Vector) {
                return values[0].clone()
            } else {
                return this._parseString(values[0])
            }
        }

        if (values.length >= 2) {
            // Two points are given - skip the third value.
            if (values[0] instanceof Point && values[1] instanceof Point) {
                this._x = values[1].x.clone().subtract(values[0].x)
                this._y = values[1].y.clone().subtract(values[0].y)
                return this;
            }

            // Fractions or a number are give
            if (values[0] instanceof Fraction || !isNaN(values[0])) {
                this._x = new Fraction(values[0])
            }
            if (values[1] instanceof Fraction || !isNaN(values[1])) {
                this._y = new Fraction(values[1])
            }

            if (
                (typeof values[0] === 'object' && !isNaN(values[0].x) && !isNaN(values[0].x)) &&
                (typeof values[1] === 'object' && !isNaN(values[1].x) && !isNaN(values[1].x))
            ) {
                this._x = new Fraction(+values[1].x - values[0].x)
                this._y = new Fraction(+values[1].y - values[0].y)
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

    // ------------------------------------------
    // Mathematical operations

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
        return Vector.scalarProduct(this, V)
        // return this._x.clone().multiply(V.x).add(this._y.clone().multiply(V.y));
    }

    determinantWithVector = (V: Vector): Fraction => {
        return Vector.determinant(this, V)
    }

    normal = (): Vector => {
        let x = this.x.clone().opposed(), y = this.y.clone();
        this._x = y;
        this._y = x;
        return this;
    }

    isColinearTo = (v: Vector): boolean => {
        return this.determinantWithVector(v).isZero()
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

    divideByScalar = (k: any): Vector => {
        return this.multiplyByScalar(new Fraction(k).invert());
    }

    simplify = (): Vector => {
        // Multiply by the lcm of denominators.
        return this.multiplyByScalar(Numeric.lcm(this._x.denominator, this._y.denominator))
            .divideByScalar(Numeric.gcd(this._x.numerator, this._y.numerator));
    }
    // ------------------------------------------
    // Vector functions
    // ------------------------------------------

    simplifyDirection = (): Vector => {
        let lcm = Numeric.lcm(this.x.denominator, this.y.denominator),
            gcd = Numeric.gcd(this.x.numerator, this.y.numerator);

        this.x.multiply(lcm).divide(gcd);
        this.y.multiply(lcm).divide(gcd);
        return this
    }

    angleWith = (V: Vector, sharp?: Boolean, radian?: Boolean): number => {
        let scalar = this.scalarProductWithVector(V).value,
            toDegree = radian ? 1 : 180 / Math.PI;
        if (sharp) {
            scalar = Math.abs(scalar);
        }

        return toDegree * Math.acos(scalar / (this.norm * V.norm));
    }

    private _parseString = (value: string): Vector => {
        // Split comma, semi colon or single space.
        let components = value.split(/[,;\s]/g);

        // Validate the fraction values.
        this.x = new Fraction(components[0] || null);
        this.y = new Fraction(components[1] || null);
        return this;
    };
}
