import type {Fraction, NthRoot} from "./coefficients"
import type {Equation, Factor, Monom} from "./algebra"
import type {Line, Point, Vector} from "./geometry"

export type InputValue<T> = T | string | number | Fraction | NthRoot;
export type InputAlgebra<T> = InputValue<T> | Monom
export type literalType<T> = Record<string, T>;

export type compareSign =
    '>' | ">=" | "=>" | "geq" |
    '<' | "<=" | "=<" | "leq" |
    '=' | "<>" | "neq" | "same";

export type EQUATION_SIGN = "=" | "<=" | ">=" | "<" | ">"

export enum PARTICULAR_SOLUTION {
    real = "\\mathbb{R}",
    varnothing = "\\varnothing"
}

export interface IPiMathObject<T> {
    readonly display: string
    readonly tex: string

    parse(...value: unknown[]): T;

    clone(): T;
}
export interface IExpressionBase<T>{
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

export interface IExpressionMultiply<T> extends IExpressionBase<T>{
    multiply(value: InputValue<T>): T;

    pow(value: number): T;
}
export interface IExpression<T> extends IExpressionMultiply<T>{
    divide(value: InputValue<T>): T | null;

    inverse(): T | undefined;

    root(value: number): T | undefined;

    sqrt(): T | undefined;
}

export interface IEquation<T> {

    reduce(): T;

    solve(): ISolution[]
}

export interface IAlgebra<T> {
    readonly variables: string[];

    degree(letter?: string): Fraction;

    evaluate(values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number | boolean;

    hasVariable(letter: string): boolean;
}

export interface IAnalyse<T> {
    derivative(): T | T[];

    integrate(a: InputValue<Fraction>, b: InputValue<T>, letter?: string): Fraction;

    primitive(): T;
}

export interface ISolution {
    display: string,
    exact: Fraction | boolean
    tex: string,
    value: number,
    variable: string,
}

export type TABLE_OF_SIGNS_VALUES = '-'|'+'|'h'|'z'|'t'|'d'|'u'|'n'|''

export interface TABLE_OF_SIGNS {roots: ISolution[], signs: TABLE_OF_SIGNS_VALUES[]}
export interface FACTOR_TABLE_OF_SIGNS extends TABLE_OF_SIGNS {factor: Factor}
export interface POLYFACTOR_TABLE_OF_SIGNS extends TABLE_OF_SIGNS {
    factors: FACTOR_TABLE_OF_SIGNS[]
}

export enum LinePropriety {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export enum Line3Propriety {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export interface Plane3Config {
    coefficients?: number[]
    directions?: Vector[],
    equation?: Equation,
    normal?: Vector,
    point?: Point,
    points?: Point[],
}


export interface remarquableLines {
    'bisectors': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    externalBisectors: {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    }
    'heights': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    'medians': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
    'mediators': {
        'AB': Line,
        'AC': Line,
        'BC': Line,
        'intersection': Vector | null
    },
}
