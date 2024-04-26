import { Equation } from '../algebra/equation';
import { Fraction } from '../coefficients/fraction';
import { Point } from './point';
import { Vector } from './vector';

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
    private _reduceBeforeDisplay;
    private _a;
    private _b;
    private _c;
    private _OA;
    private _d;
    private _n;
    private _exists;
    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(...values: unknown[]);
    get a(): Fraction;
    set a(value: Fraction);
    get b(): Fraction;
    set b(value: Fraction);
    get c(): Fraction;
    set c(value: Fraction);
    get OA(): Point;
    set OA(value: Point);
    get d(): Vector;
    set d(value: Vector);
    get n(): Vector;
    get exists(): boolean;
    get equation(): Equation;
    get system(): {
        x: Equation;
        y: Equation;
    };
    get tex(): {
        canonical: string;
        mxh: string;
        parametric: string;
        equation: string;
        system: string;
    };
    get reduceBeforeDisplay(): boolean;
    set reduceBeforeDisplay(value: boolean);
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
