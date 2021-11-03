/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import { Fraction } from "./fraction";
import { Nthroot } from "./nthroot";
export interface vectorK {
    numerator: Nthroot;
    denominator: number;
}
export declare class Vector {
    private _x;
    private _y;
    private _z;
    private _k;
    constructor(parseStr: String);
    parse: (parseStr: String) => Vector;
    static scalarProduct: (v1: Vector, v2: Vector) => number;
    get x(): Fraction;
    set x(value: Fraction);
    get y(): Fraction;
    set y(value: Fraction);
    get z(): Fraction;
    set z(value: Fraction);
    get k(): vectorK;
    set k(value: vectorK);
    get valueOfK(): number;
}
