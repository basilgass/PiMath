/**
 * Vector module contains everything necessary to handle 2d or 3d vectors.
 * @module Vector
 */
import { Line } from "./line";
import { Fraction } from "../coefficients/fraction";
export declare class Point {
    private _x;
    private _y;
    private _exist;
    constructor(...values: unknown[]);
    get x(): Fraction;
    set x(value: Fraction);
    get y(): Fraction;
    set y(value: Fraction);
    get tex(): string;
    get display(): string;
    parse: (...values: unknown[]) => Point;
    clone: () => Point;
    zero: () => Point;
    origin: () => Point;
    middleOf: (P1: Point, P2: Point) => Point;
    texValues: (numberOfDigits: number) => string;
    static pmatrix: (a: any, b: any, c?: any) => string;
    distanceTo: (item: Point | Line) => {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    get key(): string;
    isInListOfPoints: (list: Point[]) => boolean;
}
