/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import { Fraction } from "../coefficients/fraction";
export declare class Vector {
    private _x;
    private _y;
    constructor(...values: any);
    get x(): Fraction;
    set x(value: Fraction);
    get y(): Fraction;
    set y(value: Fraction);
    get normSquare(): Fraction;
    get norm(): number;
    get tex(): string;
    parse: (...values: any) => Vector;
    clone: () => Vector;
    reset: () => Vector;
    zero: () => Vector;
    one: () => Vector;
    private _parseString;
    opposed: () => Vector;
    add: (V: Vector) => Vector;
    subtract: (V: Vector) => Vector;
    scalarProductWithVector: (V: Vector) => Fraction;
    static scalarProduct: (v1: Vector, v2: Vector) => number;
    normal: () => Vector;
    isNormalTo: (v: Vector) => boolean;
    multiplyByScalar: (k: any) => Vector;
    divideByScalar: (k: any) => Vector;
    simplify: () => Vector;
    angleWith: (V: Vector, sharp?: Boolean, radian?: Boolean) => number;
}
