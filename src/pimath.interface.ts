import type { Fraction } from "./coefficients"
import type { NthRoot } from "./coefficients"
import type { Monom } from "./algebra"
import type {Factor} from "./algebra"
import type {Line, Point, Vector} from "./geometry"
import type {Equation} from "./algebra"

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
    readonly tex: string
    readonly display: string

    clone(): T;

    parse(...value: unknown[]): T;
}

export interface IExpression<T> {
    isEqual(value: InputValue<T>): boolean;

    zero(): T;

    one(): T;

    isZero(): boolean;

    isOne(): boolean;

    add(value: InputValue<T>): T;

    subtract(value: InputValue<T>): T;

    opposite(): T;

    multiply(value: InputValue<T>): T;

    divide(value: InputValue<T>): T | null;

    reduce(): T;

    inverse(): T | undefined;

    sqrt(): T | undefined;

    pow(value: number): T;

    root(value: number): T | undefined;
}

export interface IEquation<T> {

    reduce(): T;

    solve(): ISolution[]
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
    variable: string,
    display: string,
    exact: Fraction | boolean
    tex: string,
    value: number,
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
    point?: Point,
    normal?: Vector,
    directions?: Vector[],
    equation?: Equation,
    points?: Point[],
    coefficients?: number[]
}


export interface remarquableLines {
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
    'heights': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Vector | null
    },
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
}
