import { Fraction } from '../coefficients/fraction';
import { Equation } from '../algebra/equation';
import { Vector } from './vector';
import { InputValue, IPiMathObject, LinePropriety } from '../pimath.interface';
import { Point } from './point';
export interface LineConfig {
    direction?: Vector;
    normal?: Vector;
    point?: Point;
    points?: Point[];
}
export declare class Line implements IPiMathObject<Line> {
    #private;
    static PARALLEL: LinePropriety;
    static PERPENDICULAR: LinePropriety;
    /**
     * Value can be a mix of:
     *
     * @param values
     */
    constructor(...values: unknown[]);
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse: (...values: unknown[]) => this;
    clone: () => this;
    get tex(): string;
    get display(): string;
    get OA(): Vector;
    set OA(value: Vector);
    get a(): Fraction;
    set a(value: Fraction);
    get b(): Fraction;
    set b(value: Fraction);
    get c(): Fraction;
    set c(value: Fraction);
    get canonical(): this;
    canonicalAsFloatCoefficient(decimals?: number): string;
    get d(): Vector;
    set d(value: Vector);
    get director(): Vector;
    distanceTo(pt: Point): {
        value: number;
        fraction: Fraction;
        tex: string;
    };
    get equation(): this;
    fromCoefficient: (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>) => this;
    fromEquation: (equ: Equation) => this;
    fromPointAndDirection: (P: Point, d: Vector) => this;
    fromPointAndLine: (P: Vector, L: Line, orientation?: LinePropriety) => this;
    fromPointAndNormal: (P: Point, n: Vector) => this;
    fromPoints(pt1: Point, pt2: Point): this;
    getEquation(): Equation;
    getValueAtX: (value: Fraction | number) => Fraction;
    getValueAtY: (value: Fraction | number) => Fraction;
    get height(): Fraction;
    hitSegment(A: Point, B: Point): boolean;
    intersection: (line: Line) => {
        point: Point;
        hasIntersection: boolean;
        isParallel: boolean;
        isSame: boolean;
    };
    isOnLine: (pt: Vector) => boolean;
    isParallelTo: (line: Line) => boolean;
    isPerpendicularTo: (line: Line) => boolean;
    isSameAs: (line: Line) => boolean;
    isVertical: () => boolean;
    get mxh(): this;
    get n(): Vector;
    get normal(): Vector;
    get parametric(): this;
    randomNearPoint: (k?: number) => Point;
    randomPoint: (k?: number) => Point;
    get reduceBeforeDisplay(): boolean;
    set reduceBeforeDisplay(value: boolean);
    simplify: () => this;
    simplifyDirection: () => this;
    get slope(): Fraction;
    get system(): this;
}
