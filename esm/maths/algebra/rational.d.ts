/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import {IEuclidian, Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {literalType} from "./monom";
import {RationalStudy} from "./study/rationalStudy";

/**
 * Rational class can handle rational polynoms
 */
export declare class Rational {
    private _denominator;
    euclidian: () => IEuclidian;
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
    evaluateAsNumeric: (values: number | {
        [Key: string]: number;
    }) => number;
    clone: () => Rational;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    derivative: (letter?: string) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    study: () => RationalStudy;
    limits: (value: Fraction | number, offset?: string, letter?: string) => Fraction;
    evaluate: (values: literalType | Fraction | number) => Fraction;
    private _numerator;

    get plotFunction(): string;
}
