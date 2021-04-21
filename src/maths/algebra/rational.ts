/**
 * Polynom module contains everythin necessary to handle polynoms.
 * @module Polynom
 */

import {Polynom} from "./polynom";

/**
 * Rational class can handle rational polynoms
 */
export class Rational {
    private _rawString: string;
    private _numerator: Polynom;
    private _denominator: Polynom;

    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     */
    constructor(numerator?: Polynom, denominator?: Polynom) {
        this._numerator = numerator?numerator.clone():new Polynom();
        this._denominator = denominator?denominator.clone():new Polynom();
    }




    get tex(): string {
        return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }
}