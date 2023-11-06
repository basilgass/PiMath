import {Monom} from "./algebra/monom";
import {Polynom} from "./algebra/polynom";
import {Rational} from "./algebra/rational";
import {CoefficientTypes} from "./coefficients/coefficientCore";

interface coreInterface {
    parse: (...values: unknown[]) => ThisType<this>,
    clone: () => ThisType<this>,

    readonly tex: string,
    readonly display: string
}

interface operationInterface {
    add: (...values: unknown[]) => ThisType<this>,
    subtract: (...values: unknown[]) => ThisType<this>,
    multiply: (...values: unknown[]) => ThisType<this>,
    divide: (value: unknown) => ThisType<this>,
    opposite: () => ThisType<this>,
    invert: () => ThisType<this>,
    pow: (value: unknown) => ThisType<this>,
    root: (value: unknown) => ThisType<this>,
    reduce: () => ThisType<this>,
}

interface compareInterface {
    compare: (value: unknown, sign: COMPARESIGNS) => boolean,
    isEqualTo: (value: unknown) => boolean,
    isReduced: () => boolean,
    isOne: () => boolean,
    isMinusOne: () => boolean,
    isUnit: () => boolean,
    isZero: () => boolean,
}

export interface coefficientInterface extends coreInterface, operationInterface, compareInterface {
    isGreaterOrEqualTo: (value: unknown) => boolean,
    isGreaterThan: (value: unknown) => boolean,
    isLesserOrEqualTo: (value: unknown) => boolean,
    isLesserThan: (value: unknown) => boolean,
    isNaN: () => boolean,
    isPositive: () => boolean,
    isNegative: () => boolean,
    isStrictlyNegative: () => boolean,
    isStrictlyPositive: () => boolean,
    isOpposedTo: (value: unknown) => boolean,
    isInvertedTo: (value: unknown) => boolean,
    isNatural: () => boolean,
    isRelative: () => boolean,
    isRational: () => boolean,
    isReal: () => boolean,
    isComplex: () => boolean,
    isInfinity: () => boolean,
    isEven: () => boolean,
    isOdd: () => boolean,
    readonly value: number,
}

export interface coefficientStaticTypes {
    average: (...values: unknown[]) => coefficientInterface,
    max: (...values: unknown[]) => coefficientInterface,
    min: (...values: unknown[]) => coefficientInterface,
    sort: (...values: unknown[]) => coefficientInterface[],
    unique: (...values: unknown[]) => coefficientInterface[],
}

export interface expressionInterface extends coreInterface, operationInterface, compareInterface {
    // variables getter
    readonly variables: string[],
    hasLetter: (letter?: string) => boolean

    // Evaluate
    evaluate: (value?: evaluateType) => numericType,

    // Helpers
    isDivisible?: (value: unknown) => boolean,
}


export type literalType = { [Key: string]: CoefficientTypes }
export type numericType = number | string | CoefficientTypes
export type expressionType = Monom | Polynom | Rational
export type evaluateType = numericType | { [key: string]: numericType }

export enum COMPARESIGNS {
    "EQUALS" = "=",
    "SAME" = "same",
    "GREATER" = ">",
    "GEQ" = ">=",
    "LESSER" = "<",
    "LEQ" = "<=",
    "DIFFERENT" = "<>"
}