/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import { IEuclidian, Polynom } from "./polynom";
import { Fraction } from "../coefficients/fraction";
import { literalType } from "./monom";
import { RationalStudy } from "./study/rationalStudy";
/**
 * Rational class can handle rational polynoms
 */
export declare class Rational {
    private _denominator;
    private _numerator;
    private _rawString;
    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator?: Polynom | string, denominator?: Polynom | string);
    get numerator(): Polynom;
    get denominator(): Polynom;
    get tex(): string;
    get texFactors(): string;
    get plotFunction(): string;
    clone: () => Rational;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    derivative: (letter?: string) => Rational;
    factorize: (letter?: string) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    euclidian: () => IEuclidian;
    limits: (value: Fraction | number, offset?: string, letter?: string) => Fraction;
    evaluate: (values: literalType | Fraction | number) => Fraction;
    evaluateAsNumeric: (values: number | {
        [Key: string]: number;
    }) => number;
    study: () => RationalStudy;
}
