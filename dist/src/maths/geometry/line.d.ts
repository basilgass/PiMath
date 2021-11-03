import { Fraction } from "../coefficients/fraction";
import { Vector } from "./vector";
import { Point } from "./point";
import { Equation } from "../algebra/equation";
export declare class Line {
    private _a;
    private _b;
    private _c;
    private _OA;
    private _d;
    private _n;
    private _exists;
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
    set d(value: Vector);
    get slope(): Fraction;
    get height(): Fraction;
    parse: (...values: any) => Line;
    parseByCoefficient: (a: Fraction, b: Fraction, c: Fraction) => Line;
    parseByPointAndVector: (P: Point, d: Vector) => Line;
    clone: () => Line;
    isParellelTo: (line: Line) => Boolean;
    isSameAs: (line: Line) => Boolean;
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
    canonicalAsFloatCoefficient(decimals: number): string;
}
