/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import { Polynom } from "./polynom";
import { Fraction } from "../coefficients/fraction";
/**
 * Rational class can handle rational polynoms
 */
export declare class Rational {
    private _rawString;
    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator?: Polynom, denominator?: Polynom);
    private _numerator;
    get numerator(): Polynom;
    private _denominator;
    get denominator(): Polynom;
    get tex(): string;
    get texFactors(): string;
    clone: () => Rational;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    limits: (value: Fraction | number, offset?: string, letter?: string) => Fraction;
}
