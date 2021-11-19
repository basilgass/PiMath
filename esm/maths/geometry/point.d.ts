import Fraction from "../coefficients/fraction";
export default class Point {
    private _x;
    private _y;
    private _exist;
    constructor(...values: any);
    get isPoint(): boolean;
    get x(): Fraction;
    set x(value: Fraction);
    get y(): Fraction;
    set y(value: Fraction);
    get tex(): string;
    parse: (...values: any) => Point;
    clone: () => Point;
    zero: () => Point;
    origin: () => Point;
    middleOf: (P1: Point, P2: Point) => Point;
    texValues: (numberOfDigits: number) => string;
    static pmatrix: (a: any, b: any, c?: any) => string;
}
