/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */
import { Polynom } from "./polynom";
import { Fraction } from "../coefficients/fraction";
import { literalType } from "./monom";
import { ISolution } from "./equation";
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
    constructor(numerator?: Polynom | string, denominator?: Polynom | string);
    private _numerator;
    get numerator(): Polynom;
    private _denominator;
    get denominator(): Polynom;
    get tex(): string;
    get texFactors(): string;
    clone: () => Rational;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    derivative: (letter?: string) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    limits: (value: Fraction | number, offset?: string, letter?: string) => Fraction;
    makeTableOfSigns: () => {
        factors: Polynom[];
        zeroes: ISolution[];
        signs: (string[])[];
        tex: string;
    };
    private _makeTexFromTableOfSigns;
    private _makeOneLineOfTableOfSigns;
    get plotFunction(): string;
    evaluate: (values: literalType | Fraction | number) => Fraction;
}
