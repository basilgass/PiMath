import { Point } from './point';
import { Fraction } from '../coefficients/fraction';

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
    get isNull(): boolean;
    static scalarProduct: (v1: Vector, v2: Vector) => Fraction;
    static determinant: (v1: Vector, v2: Vector) => Fraction;
    parse: (...values: any) => Vector;
    clone: () => Vector;
    reset: () => Vector;
    zero: () => Vector;
    one: () => Vector;
    opposed: () => Vector;
    add: (V: Vector) => Vector;
    subtract: (V: Vector) => Vector;
    scalarProductWithVector: (V: Vector) => Fraction;
    determinantWithVector: (V: Vector) => Fraction;
    normal: () => Vector;
    isColinearTo: (v: Vector) => boolean;
    isNormalTo: (v: Vector) => boolean;
    multiplyByScalar: (k: any) => Vector;
    divideByScalar: (k: any) => Vector;
    simplify: () => Vector;
    simplifyDirection: () => Vector;
    angleWith: (V: Vector, sharp?: Boolean, radian?: Boolean) => number;
    private _parseString;
}
