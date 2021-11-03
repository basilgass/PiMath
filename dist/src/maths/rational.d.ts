/**
 * Polynom module contains everythin necessary to handle polynoms.
 * @module Polynom
 */
import { Polynom } from "./polynom";
/**
 * Rational class can handle rational polynoms
 */
export declare class Rational {
    private _rawString;
    private _numerator;
    private _denominator;
    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     */
    constructor(numerator?: Polynom, denominator?: Polynom);
    get tex(): string;
}
