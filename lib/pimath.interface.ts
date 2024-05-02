import {Fraction} from "./maths/coefficients/fraction.ts";
import {NthRoot} from "./maths/coefficients/nthRoot.ts";

export type InputValue<T> = T | string | number | Fraction | NthRoot;

export interface IOperations<T> {
    add(value: InputValue<T>): T;

    subtract(value: InputValue<T>): T;

    multiply(value: InputValue<T>): T;

    divide(value: InputValue<T>): T;

    opposite(): T;

}