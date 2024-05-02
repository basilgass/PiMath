import {Fraction} from "./maths/coefficients/fraction.ts";
import {NthRoot} from "./maths/coefficients/nthRoot.ts";

export type InputValue<T> = T | string | number | Fraction | NthRoot;

export interface IPiMathObject<T> {
    readonly tex: string
    readonly display: string

    clone(): T;

    parse(value: InputValue<T>): T;
}

export interface IOperations<T> {
    add(value: InputValue<T>): T;

    subtract(value: InputValue<T>): T;

    multiply(value: InputValue<T>): T;

    divide(value: InputValue<T>): T;

    opposite(): T;

    inverse(): T;

    pow(value: number): T;

    root(value: number): T;
}