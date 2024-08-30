import { Fraction } from '../coefficients/fraction';
import { Equation } from '../algebra/equation';
import { Vector } from './vector';
import { InputValue } from '../pimath.interface';

export declare enum LinePropriety {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export declare class Line {
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
    randomPoint: (k?: number) => Vector;
    randomNearPoint: (k?: number) => Vector;
    /**
     * Parse data to a line
     * @param {any} values
     * @returns {Line}
     */
    parse: (...values: unknown[]) => Line;
    parseEquation: (equ: Equation) => this;
    parseByCoefficient: (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>) => this;
    parseByPointAndVector: (P: Vector, d: Vector) => this;
    parseByPointAndNormal: (P: Vector, n: Vector) => this;
    parseByPointAndLine: (P: Vector, L: Line, orientation?: LinePropriety) => this;
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
    hitSegment(A: Vector, B: Vector): boolean;
    getValueAtX: (value: Fraction | number) => Fraction;
    getValueAtY: (value: Fraction | number) => Fraction;
    canonicalAsFloatCoefficient(decimals?: number): string;
}
