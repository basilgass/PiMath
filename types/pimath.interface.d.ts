import type { Fraction, Root } from "./coefficients";
import type { Equation, Monom } from "./algebra";
import type { Line, Line3, Point, Vector } from "./geometry";
import type { Solution } from "./analyze/solution";
export type InputValue<T> = T | string | number | Fraction;
export type InputAlgebra<T> = InputValue<T> | Monom;
export type LiteralType<T> = Record<string, T>;
export type EquationSign = "=" | "<=" | ">=" | "<" | ">";
export type CompareSign = EquationSign | "=>" | "geq" | "=<" | "leq" | "<>" | "neq" | "same";
export type OutputStyle = 'tex' | 'display';
export interface PolynomRoot {
    readonly fraction: Fraction;
    readonly root: Root;
    readonly exact: boolean;
    readonly multiplicity: number;
}
export interface IPiMathObject<T> {
    readonly display: string;
    readonly tex: string;
    clone(): T;
    copy(value: T): T;
}
export interface IExpressionBase<T> {
    add(value: InputValue<T>): T;
    isEqual(value: InputValue<T>): boolean;
    isOne(): boolean;
    isZero(): boolean;
    one(): T;
    opposite(): T;
    reduce(): T;
    subtract(value: InputValue<T>): T;
    zero(): T;
}
export interface IExpressionMultiply<T> extends IExpressionBase<T> {
    multiply(value: InputValue<T>): T;
    pow(value: number): T;
}
export interface IExpression<T> extends IExpressionMultiply<T> {
    divide(value: InputValue<T>): T;
    inverse(): T;
    root(value: number): T;
    sqrt(): T;
}
export interface IEquation<T> {
    reduce(): T;
    solve(): Solution[];
}
export interface IAlgebra {
    readonly variables: string[];
    degree(variable?: string): Fraction;
    hasVariable(variable: string): boolean;
}
export interface IEvaluable {
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric: true): number;
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: false): Fraction;
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number;
}
export interface IMatrixElement<T> extends IPiMathObject<T>, IExpressionMultiply<T> {
    divide(value: InputValue<T>): T;
    readonly value: number | undefined;
}
export interface IAnalyse<T> {
    derivative(): T | T[];
    integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, variable?: string): Fraction;
    primitive(): T;
}
export type TableOfSignsValues = '-' | '+' | 'h' | 'z' | 't' | 'd' | '';
export type LineIntersection = {
    hasIntersection: true;
    point: Point;
    isParallel: false;
    isSame: false;
} | {
    hasIntersection: false;
    point: null;
    isParallel: boolean;
    isSame: boolean;
};
export type PlaneLineIntersection = {
    hasIntersection: true;
    point: Point;
    isParallel: false;
    isOnPlane: false;
} | {
    hasIntersection: false;
    point: null;
    isParallel: boolean;
    isOnPlane: boolean;
};
export type PlanePlaneIntersection = {
    hasIntersection: true;
    line: Line3;
    isParallel: false;
    isEqual: false;
} | {
    hasIntersection: false;
    line: null;
    isParallel: boolean;
    isEqual: boolean;
};
export declare enum LineProperty {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export declare enum Line3Property {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export interface Plane3Config {
    coefficients?: number[];
    directions?: Vector[];
    equation?: Equation;
    normal?: Vector;
    point?: Point;
    points?: Point[];
}
type TriangleLineTriad<K extends string> = Record<K, Line> & {
    intersection: Point | null;
};
export interface RemarquableLines {
    bisectors: TriangleLineTriad<'A' | 'B' | 'C'> | null;
    externalBisectors: TriangleLineTriad<'A' | 'B' | 'C'> | null;
    heights: TriangleLineTriad<'A' | 'B' | 'C'> | null;
    medians: TriangleLineTriad<'A' | 'B' | 'C'> | null;
    mediators: TriangleLineTriad<'a' | 'b' | 'c'> | null;
}
export {};
//# sourceMappingURL=pimath.interface.d.ts.map