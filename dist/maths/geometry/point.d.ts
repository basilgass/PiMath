import { Fraction } from '../coefficients/fraction';
import { Vector } from './vector';
import { Line } from './line';

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
    get asVector(): Vector;
    get key(): string;
    static pmatrix: (a: any, b: any, c?: any) => string;
    parse: (...values: unknown[]) => Point;
    clone: () => Point;
    zero: () => Point;
    origin: () => Point;
    middleOf: (P1: Point, P2: Point) => Point;
    translate: (value: {
        x: number | Fraction;
        y: number | Fraction;
    }) => Point;
    texValues: (numberOfDigits: number) => string;
    distanceTo: (item: Point | Line) => {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    isInListOfPoints: (list: Point[]) => boolean;
    isEqual: (pt: Point) => boolean;
}
