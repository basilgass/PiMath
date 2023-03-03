/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import { Fraction } from "../coefficients/fraction";
import { Point } from "./point";
export declare class Vector {
    private _x;
    private _y;
    constructor(...values: unknown[]);
    get x(): Fraction;
    set x(value: Fraction | number | string);
    get y(): Fraction;
    set y(value: Fraction | number | string);
    get normSquare(): Fraction;
    get norm(): number;
    get tex(): string;
    get asPoint(): Point;
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
    static scalarProduct: (v1: Vector, v2: Vector) => Fraction;
    normal: () => Vector;
    isNormalTo: (v: Vector) => boolean;
    get isNull(): boolean;
    multiplyByScalar: (k: any) => Vector;
    divideByScalar: (k: any) => Vector;
    simplify: () => Vector;
    simplifyDirection: () => Vector;
    angleWith: (V: Vector, sharp?: Boolean, radian?: Boolean) => number;
}
