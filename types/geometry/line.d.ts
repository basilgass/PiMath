import { Fraction } from '../coefficients/fraction';
import { Equation } from '../algebra/equation';
import { Vector } from './vector';
import { InputValue, IPiMathObject } from '../pimath.interface';
import { Point } from './point';

export declare enum LinePropriety {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export interface LineConfig {
    points?: Point[];
    point?: Point;
    direction?: Vector;
    normal?: Vector;
}
export declare class Line implements IPiMathObject<Line> {
    #private;
    static PERPENDICULAR: LinePropriety;
    static PARALLEL: LinePropriety;
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
    get OA(): Vector;
    set OA(value: Vector);
    get d(): Vector;
    set d(value: Vector);
    get n(): Vector;
    getEquation(): Equation;
    get canonical(): this;
    get equation(): this;
    get mxh(): this;
    get parametric(): this;
    get system(): this;
    get tex(): string;
    get reduceBeforeDisplay(): boolean;
    set reduceBeforeDisplay(value: boolean);
    get display(): string;
    get normal(): Vector;
    get director(): Vector;
    get slope(): Fraction;
    get height(): Fraction;
    randomPoint: (k?: number) => Vector;
    randomNearPoint: (k?: number) => Vector;
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse: (...values: unknown[]) => this;
    fromPoints(pt1: Point, pt2: Point): this;
    fromEquation: (equ: Equation) => this;
    fromCoefficient: (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>) => this;
    fromPointAndDirection: (P: Point, d: Vector) => this;
    fromPointAndNormal: (P: Point, n: Vector) => this;
    fromPointAndLine: (P: Vector, L: Line, orientation?: LinePropriety) => this;
    clone: () => this;
    isOnLine: (pt: Vector) => boolean;
    isParallelTo: (line: Line) => boolean;
    isSameAs: (line: Line) => boolean;
    isPerpendicularTo: (line: Line) => boolean;
    isVertical: () => boolean;
    simplify: () => this;
    simplifyDirection: () => this;
    intersection: (line: Line) => {
        point: Vector;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    distanceTo(pt: Vector): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    hitSegment(A: Point, B: Point): boolean;
    getValueAtX: (value: Fraction | number) => Fraction;
    getValueAtY: (value: Fraction | number) => Fraction;
    canonicalAsFloatCoefficient(decimals?: number): string;
}
