/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {Polynom} from "./polynom";
import {Fraction} from "../coefficients";

/**
 * Rational class can handle rational polynoms
 */
    export class Rational {
        private _rawString: string;
        private _numerator: Polynom;
        private _denominator: Polynom;

        /**
         *
         * @param numerator
         * @param denominator
         */
        constructor(numerator?: Polynom, denominator?: Polynom) {
            this._numerator = numerator ? numerator.clone() : new Polynom();
            this._denominator = denominator ? denominator.clone() : new Polynom();
        }

        clone = (): Rational => {
            this._numerator = this._numerator.clone()
            this._denominator = this._denominator.clone()

            return this;
        }

        get tex(): string {
            return `\\dfrac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
        }

        get texFactors(): string {
            this._numerator.factorize()
            this._denominator.factorize()

            return `\\dfrac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`
        }

        get numerator(): Polynom {
            return this._numerator
        }

        get denominator(): Polynom {
            return this._denominator
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
            console.log(this._numerator.tex)
            this._numerator.factorize();
            console.log(this._numerator.factors.map(x => x.tex))
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

        limits = (value: Fraction | number, letter?: string): Fraction | number => {
            if (value === Infinity || value === -Infinity) {
                let N = this._numerator.monomByDegree(this._numerator.degree(letter), letter),
                    D = this._denominator.monomByDegree(this._denominator.degree(letter), letter)

                N.divide(D)

                if (N.degree(letter).isStrictlyPositive()) {
                    return N.coefficient.sign() * (Math.pow((value > 0 ? 1 : -1), N.degree(letter).value % 2)) === 1 ? Infinity : -Infinity
                }
                if (N.degree(letter).isZero()) {
                    return N.coefficient
                }
                if (N.degree(letter).isStrictlyPositive()) {
                    return N.coefficient.sign() * (Math.pow(-1, N.degree(letter).value % 2)) === 1 ? 0 : -0
                }
            } else {
                return this._numerator.evaluate({letter: new Fraction(value)}).divide(this._denominator.evaluate({letter: new Fraction(value)}))
            }
        }
    }
