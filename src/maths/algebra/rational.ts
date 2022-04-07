/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {literalType} from "./monom";
import {log} from "util";

/**
 * Rational class can handle rational polynoms
 */
export class Rational {
    private _rawString: string;

    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator?: Polynom, denominator?: Polynom) {
        this._numerator = numerator ? numerator.clone() : new Polynom();
        this._denominator = denominator ? denominator.clone() : new Polynom();
    }

    private _numerator: Polynom;

    get numerator(): Polynom {
        return this._numerator
    }

    private _denominator: Polynom;

    get denominator(): Polynom {
        return this._denominator
    }

    get tex(): string {
        return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }

    get texFactors(): string {
        this._numerator.factorize()
        this._denominator.factorize()

        return `\\dfrac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`
    }

    clone = (): Rational => {
        this._numerator = this._numerator.clone()
        this._denominator = this._denominator.clone()

        return this;
    }

    domain = (): string => {
        let zeroes = this._denominator.getZeroes();
        if (zeroes.length === 0 || zeroes[0] === false) {
            return '\\mathbb{R}'
        } else if (zeroes[0] === true) {
            return '\\varnothing'
        } else {
            return '\\mathbb{R}\\setminus\\left{' +
                zeroes.map(x => {
                    return (typeof x === 'boolean') ? '' : x.frac
                })
                    .join(';') + '\\right}'
        }
    }

    amplify = (P: Polynom): Rational => {
        this._numerator.multiply(P);
        this._denominator.multiply(P);

        return this;
    }

    simplify = (P: Polynom): Rational => {
        let NumeratorEuclidien = this._numerator.euclidian(P);
        if (!NumeratorEuclidien.reminder.isZero()) {
            return this;
        }

        let DenominatorEuclidien = this._denominator.euclidian(P);
        if (!DenominatorEuclidien.reminder.isZero()) {
            return this;
        }

        this._numerator = NumeratorEuclidien.quotient;
        this._denominator = DenominatorEuclidien.quotient;
        return this;
    }

    reduce = (): Rational => {
        this._numerator.factorize();
        for (let f of this._numerator.factors) {
            this.simplify(f);
        }

        return this;
    }

    opposed = (): Rational => {
        this._numerator.opposed();
        return this;
    }
    add = (R: Rational): Rational => {
        // 1. Make sure both rational are at the same denominator
        // 2. Add the numerators.
        // 3. Simplify

        // Store the adding denominator
        let denominator = this._denominator.clone()

        // Amplif the main rational polynom by the adding denominator
        this.amplify(R._denominator)

        // Add to the numerator the adding value...
        this._numerator.add(R._numerator.clone().multiply(denominator));

        return this;
    }

    subtract = (R: Rational): Rational => {
        return this.add(R.clone().opposed())
    }

    limits = (value: Fraction | number, offset?: string, letter?: string): Fraction => {
        if (value === Infinity || value === -Infinity) {
            let {quotient, reminder} = this._numerator.clone().euclidian(this._denominator)

            // quotient is positive => it will be infinite.
            if(quotient.degree(letter).isStrictlyPositive()){
                return value===Infinity ? quotient.limitToInfinity(letter):quotient.limitToNegativeInfinity(letter)
                // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposed()
            }else{
                return quotient.monomByDegree(undefined, letter).coefficient
            }
        }
        else {
            let evalValues: literalType = {},
                evalValuesOffset: literalType = {},
                theLimit: Fraction | number,
                theSign: number,
                FR = this.clone().reduce()

            evalValues[letter === undefined ? 'x' : letter] = new Fraction(value)

            if (offset !== 'above' && offset !== 'below') {
                theLimit = FR._numerator.evaluate(evalValues)
                    .divide(FR._denominator.evaluate(evalValues))

                return theLimit.isInfinity()?theLimit.abs():theLimit
            } else {
                if (offset === 'above') {
                    evalValuesOffset[letter === undefined ? 'x' : letter] = (new Fraction(value)).add(0.000001)
                } else if (offset === 'below') {
                    evalValuesOffset[letter === undefined ? 'x' : letter] = (new Fraction(value)).subtract(0.000001)
                }

                theLimit = FR._numerator.evaluate(evalValues)
                    .divide(FR._denominator.evaluate(evalValues))
                theSign = FR._numerator.evaluate(evalValuesOffset)
                    .divide(FR._denominator.evaluate(evalValuesOffset)).sign()

                if (theLimit.isInfinity()) {
                    return theSign===1?theLimit.abs():theLimit.abs().opposed()
                }else{
                    return theLimit
                }
            }
        }
    }
}
