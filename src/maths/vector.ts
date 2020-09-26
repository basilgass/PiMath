/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import {Fraction} from "./fraction";
import {Nthroot} from "./nthroot";

export interface vectorK {
    numerator: Nthroot,
    denominator: number
}

export class Vector {
    private _x: Fraction;
    private _y: Fraction;
    private _z: Fraction;
    private _k: vectorK;

    constructor(parseStr: String) {
        this._x = new Fraction().zero();
        this._y = new Fraction().zero();
        this._z = null;
        this._k = null;

        if (parseStr !== undefined) {
            this.parse(parseStr);
        }
    };

    parse = (parseStr: String): Vector => {
        let c = parseStr.split(' ');
        console.log(c);
        if (c.length >= 2) {
            this._x.parse(c[0]);
            this._y.parse(c[1]);
            if (c.length === 3) {
                this._z = new Fraction(c[2]);
            }
            return this;
        }
    };

    static scalarProduct = (v1: Vector, v2: Vector): number => {
        let s;
        s = v1.x.value * v2.x.value + v1.y.value * v2.y.value;
        if (v1.z !== null && v2.z !== null) {
            s += v1.z.value * v2.z.value
        }
        // Multiply the answer by the scalar coefficient.
        if (v1.k !== null) {
            s *= v1.valueOfK
        }
        if (v2.k !== null) {
            s *= v2.valueOfK
        }

        // Return the scalar product.
        return s;
    };


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

    get z(): Fraction {
        return this._z;
    }

    set z(value: Fraction) {
        this._z = value;
    }

    get k(): vectorK {
        return this._k;
    }

    set k(value: vectorK) {
        this._k = value;
    }

    get valueOfK(): number {
        return this._k.numerator.value / this._k.denominator;
    }
}
