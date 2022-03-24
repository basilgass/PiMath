/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import { Polynom } from "./polynom";
import { Fraction } from "../coefficients";
/**
 * Rational class can handle rational polynoms
 */
export declare class Rational {
    private _rawString;
    private _numerator;
    private _denominator;
    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator?: Polynom, denominator?: Polynom);
    clone: () => Rational;
    get tex(): string;
    get texFactors(): string;
    get numerator(): Polynom;
    get denominator(): Polynom;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    limits: (value: Fraction | number, letter?: string) => Fraction | number;
}
