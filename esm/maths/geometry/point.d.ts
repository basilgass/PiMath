import { Fraction } from "../coefficients";
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
}
