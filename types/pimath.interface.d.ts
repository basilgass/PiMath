import { Fraction, NthRoot } from './coefficients';
import { Monom, Factor, Equation } from './algebra';
import { Line, Point, Vector } from './geometry';
export type InputValue<T> = T | string | number | Fraction | NthRoot;
export type InputAlgebra<T> = InputValue<T> | Monom;
export type literalType<T> = Record<string, T>;
export type compareSign = '>' | ">=" | "=>" | "geq" | '<' | "<=" | "=<" | "leq" | '=' | "<>" | "neq" | "same";
export type EQUATION_SIGN = "=" | "<=" | ">=" | "<" | ">";
export declare enum PARTICULAR_SOLUTION {
    real = "\\mathbb{R}",
    varnothing = "\\varnothing"
}
export interface IPiMathObject<T> {
    readonly tex: string;
    readonly display: string;
    clone(): T;
    parse(...value: unknown[]): T;
}
export interface IExpressionBase<T> {
    isEqual(value: InputValue<T>): boolean;
    zero(): T;
    one(): T;
    isZero(): boolean;
    isOne(): boolean;
    add(value: InputValue<T>): T;
    subtract(value: InputValue<T>): T;
    opposite(): T;
    reduce(): T;
}
export interface IExpressionMultiply<T> extends IExpressionBase<T> {
    multiply(value: InputValue<T>): T;
    pow(value: number): T;
}
export interface IExpression<T> extends IExpressionMultiply<T> {
    inverse(): T | undefined;
    divide(value: InputValue<T>): T | null;
    sqrt(): T | undefined;
    root(value: number): T | undefined;
}
export interface IEquation<T> {
    reduce(): T;
    solve(): ISolution[];
}
export interface IAlgebra<T> {
    readonly variables: string[];
    hasVariable(letter: string): boolean;
    degree(letter?: string): Fraction;
    evaluate(values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number | boolean;
}
export interface IAnalyse<T> {
    derivative(): T | T[];
    primitive(): T;
    integrate(a: InputValue<Fraction>, b: InputValue<T>, letter?: string): Fraction;
}
export interface ISolution {
    variable: string;
    display: string;
    exact: Fraction | boolean;
    tex: string;
    value: number;
}
export type TABLE_OF_SIGNS_VALUES = '-' | '+' | 'h' | 'z' | 't' | 'd' | 'u' | 'n' | '';
export interface TABLE_OF_SIGNS {
    roots: ISolution[];
    signs: TABLE_OF_SIGNS_VALUES[];
}
export interface FACTOR_TABLE_OF_SIGNS extends TABLE_OF_SIGNS {
    factor: Factor;
}
export interface POLYFACTOR_TABLE_OF_SIGNS extends TABLE_OF_SIGNS {
    factors: FACTOR_TABLE_OF_SIGNS[];
}
export declare enum LinePropriety {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export declare enum Line3Propriety {
    None = "none",
    Parallel = "parallel",
    Perpendicular = "perpendicular",
    Tangent = "tangent"
}
export interface Plane3Config {
    point?: Point;
    normal?: Vector;
    directions?: Vector[];
    equation?: Equation;
    points?: Point[];
    coefficients?: number[];
}
export interface remarquableLines {
    'medians': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector | null;
    };
    'mediators': {
        'AB': Line;
        'AC': Line;
        'BC': Line;
        'intersection': Vector | null;
    };
    'heights': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector | null;
    };
    'bisectors': {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector | null;
    };
    externalBisectors: {
        'A': Line;
        'B': Line;
        'C': Line;
        'intersection': Vector | null;
    };
}
