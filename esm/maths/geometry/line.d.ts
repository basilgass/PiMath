import { Fraction } from "../coefficients";
import { Vector } from "./vector";
import { Point } from "./point";
import { Equation } from "../algebra";
declare enum LinePropriety {
    None = 0,
    Parallel = 1,
    Perpendicular = 2
}
export declare class Line {
    private _a;
    private _b;
    private _c;
    private _OA;
    private _d;
    private _n;
    private _exists;
    private _referencePropriety;
    private _referenceLine;
    static PERPENDICULAR: LinePropriety;
    static PARALLEL: LinePropriety;
    constructor(...values: any);
    get isLine(): boolean;
    get exists(): boolean;
    get equation(): Equation;
    get tex(): {
        canonical: string;
        mxh: string;
        parametric: string;
    };
    get a(): Fraction;
    set a(value: Fraction);
    get b(): Fraction;
    set b(value: Fraction);
    get c(): Fraction;
    set c(value: Fraction);
    get OA(): Point;
    set OA(value: Point);
    get d(): Vector;
    get n(): Vector;
    get normal(): Vector;
    get director(): Vector;
    set d(value: Vector);
    get slope(): Fraction;
    get height(): Fraction;
    parse: (...values: unknown[]) => Line;
    parseEquation: (equ: Equation) => Line;
    parseByCoefficient: (a: Fraction | number, b: Fraction | number, c: Fraction | number) => Line;
    parseByPointAndVector: (P: Point, d: Vector) => Line;
    parseByPointAndNormal: (P: Point, n: Vector) => Line;
    parseByPointAndLine: (P: Point, L: Line, orientation?: LinePropriety) => Line;
    clone: () => Line;
    isParellelTo: (line: Line) => Boolean;
    isSameAs: (line: Line) => Boolean;
    simplify: () => Line;
    simplifyDirection: () => Line;
    intersection: (line: Line) => {
        point: Point;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    distanceTo(pt: Point): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    hitSegment(A: Point, B: Point): boolean;
    getValueAtX: (value: Fraction | number) => Fraction;
    getValueAtY: (value: Fraction | number) => Fraction;
    canonicalAsFloatCoefficient(decimals: number): string;
}
export {};
