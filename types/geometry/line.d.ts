import { Fraction } from '../coefficients';
import { Equation } from '../algebra';
import { Vector } from './vector';
import { InputValue, IPiMathObject, LinePropriety } from '../pimath.interface';
import { Point } from './point';
import { Root } from '../coefficients/root';
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
    set OA(value: Vector | Point);
    get a(): Fraction;
    set a(value: Fraction);
    asCanonical(): this;
    asCartesian(): this;
    asMxh(): this;
    asParametric(): this;
    asSystem(): this;
    get b(): Fraction;
    set b(value: Fraction);
    get c(): Fraction;
    set c(value: Fraction);
    canonicalAsFloatCoefficient(decimals?: number): string;
    get d(): Vector;
    set d(value: Vector);
    get director(): Vector;
    distanceTo(pt: Point): Root;
    fromCoefficient: (a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>) => this;
    fromEquation: (equ: Equation) => this;
    fromPointAndDirection: (P: Point | Vector, d: Vector) => this;
    fromPointAndLine: (P: Vector, L: Line, orientation?: LinePropriety) => this;
    fromPointAndNormal: (P: Point | Vector, n: Vector) => this;
    fromPoints(A: Point, B: Point): this;
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
    isOnLine(pt: Point): boolean;
    isParallelTo: (line: Line) => boolean;
    isPerpendicularTo: (line: Line) => boolean;
    isSameAs: (line: Line) => boolean;
    isVertical: () => boolean;
    get n(): Vector;
    get normal(): Vector;
    randomNearPoint: (k?: number) => Point;
    randomPoint: (k?: number) => Point;
    simplify: () => this;
    get slope(): Fraction;
}
