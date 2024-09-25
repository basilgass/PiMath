import type { Fraction } from "./coefficients/fraction"
import type { NthRoot } from "./coefficients/nthRoot"
import type { Monom } from "./algebra/monom"

export type InputValue<T> = T | string | number | Fraction | NthRoot;
export type InputAlgebra<T> = InputValue<T> | Monom
export type literalType<T> = Record<string, T>;

export type compareSign =
    '>' | ">=" | "=>" | "geq" |
    '<' | "<=" | "=<" | "leq" |
    '=' | "<>" | "neq" | "same";


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

export type TABLE_OF_SIGNS_VALUES = '-'|'+'|'h'|'z'|'t'|'d'|''

export interface TABLE_OF_SIGNS {roots: ISolution[], signs: TABLE_OF_SIGNS_VALUES[]}