/**
 * This class works for 2d line in a plane.
 */
import { Vector } from "./vector";
import { Point } from "./point";
import { Fraction } from "../coefficients/fraction";
import { Equation } from "../algebra/equation";
export declare enum LinePropriety {
    None = 0,
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export declare class Line {
    static PERPENDICULAR: LinePropriety;
    static PARALLEL: LinePropriety;
    private _referencePropriety;
    private _referenceLine;
    constructor(...values: unknown[]);
    private _a;
    get a(): Fraction;
    set a(value: Fraction);
    private _b;
    get b(): Fraction;
    set b(value: Fraction);
    private _c;
    get c(): Fraction;
    set c(value: Fraction);
    private _OA;
    get OA(): Point;
    set OA(value: Point);
    private _d;
    get d(): Vector;
    set d(value: Vector);
    private _n;
    get n(): Vector;
    private _exists;
    get exists(): boolean;
    get equation(): Equation;
    get tex(): {
        canonical: string;
        mxh: string;
        parametric: string;
        equation: string;
    };
    get display(): {
        canonical: string;
        mxh: string;
        parametric: string;
    };
    get normal(): Vector;
    get director(): Vector;
    get slope(): Fraction;
    get height(): Fraction;
    randomPoint: (k?: number) => Point;
    randomNearPoint: (k?: number) => Point;
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse: (...values: unknown[]) => Line;
    parseEquation: (equ: Equation) => Line;
    parseByCoefficient: (a: Fraction | number, b: Fraction | number, c: Fraction | number) => Line;
    parseByPointAndVector: (P: Point, d: Vector) => Line;
    parseByPointAndNormal: (P: Point, n: Vector) => Line;
    parseByPointAndLine: (P: Point, L: Line, orientation?: LinePropriety) => Line;
    clone: () => Line;
    isOnLine: (pt: Point) => Boolean;
    isParallelTo: (line: Line) => Boolean;
    isSameAs: (line: Line) => Boolean;
    isPerpendicularTo: (line: Line) => Boolean;
    isVertical: () => Boolean;
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
