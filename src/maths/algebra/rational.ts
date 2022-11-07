/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {IEuclidian, Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {literalType} from "./monom";
import {PARTICULAR_SOLUTION} from "./equation";
import {RationalStudy} from "./study/rationalStudy";
import {StudyConfig} from "./study";

/**
 * Rational class can handle rational polynoms
 */
export class Rational {
    private _denominator: Polynom;
    private _numerator: Polynom;
    private _rawString: string;

    /**
     *
     * @param numerator
     * @param denominator
     */
    constructor(numerator?: Polynom | string, denominator?: Polynom | string) {
        if (numerator instanceof Polynom) {
            this._numerator = numerator.clone()
        } else if (typeof numerator === 'string') {
            this._numerator = new Polynom(numerator)
        } else {
            this._numerator = new Polynom()
        }

        if (denominator instanceof Polynom) {
            this._denominator = denominator.clone()
        } else if (typeof denominator === 'string') {
            this._denominator = new Polynom(denominator)
        } else {
            this._denominator = new Polynom()
        }

    }

    get numerator(): Polynom {
        return this._numerator
    }

    get denominator(): Polynom {
        return this._denominator
    }

    get tex(): string {
        return `\\frac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }

    get texFactors(): string {
        return `\\frac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`
    }

    get plotFunction(): string {
        return `(${this._numerator.plotFunction})/(${this._denominator.plotFunction})`
    }

    clone = (): Rational => {
        return new Rational(
            this._numerator.clone(),
            this._denominator.clone()
        )
    }

    domain = (): string => {
        let zeroes = this._denominator.getZeroes();

        if (zeroes.length === 0 || zeroes[0].tex === PARTICULAR_SOLUTION.real) {
            return PARTICULAR_SOLUTION.varnothing
        } else if (zeroes[0].tex === PARTICULAR_SOLUTION.varnothing) {
            return PARTICULAR_SOLUTION.real
        } else {
            return '\\mathbb{R}\\setminus\\left\\{' +
                zeroes.map(x => x.tex).join(';') + '\\right\\}'
        }
    }

    amplify = (P: Polynom): Rational => {
        this._numerator.multiply(P);
        this._denominator.multiply(P);

        return this;
    }

    derivative = (letter?: string): Rational => {
        let N = this._numerator.clone(),
            D = this._denominator.clone(),
            dN = N.clone().derivative(letter),
            dD = D.clone().derivative(letter)

        this._numerator = dN.clone().multiply(D).subtract(N.clone().multiply(dD))
        this._denominator = D.clone().pow(2)

        return this
    }

    factorize = (letter?: string): Rational => {
        this._numerator.factorize(letter)
        this._denominator.factorize(letter)
        return this
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

    euclidian = (): IEuclidian => {
        return this._numerator.euclidian(this._denominator)
    }

    // TODO : where and how is used limits ?
    limits = (value: Fraction | number, offset?: string, letter?: string): Fraction => {
        if (value === Infinity || value === -Infinity) {
            let {quotient, reminder} = this._numerator.clone().euclidian(this._denominator)

            // quotient is positive => it will be infinite.
            if (quotient.degree(letter).isStrictlyPositive()) {
                return value === Infinity ? quotient.limitToInfinity(letter) : quotient.limitToNegativeInfinity(letter)
                // return quotient.monomByDegree(undefined, letter).coefficient.sign()===1?(new Fraction()).infinite():(new Fraction()).infinite().opposed()
            } else {
                return quotient.monomByDegree(undefined, letter).coefficient
            }
        } else {
            let evalValues: literalType = {},
                evalValuesOffset: literalType = {},
                theLimit: Fraction | number,
                theSign: number,
                FR = this.clone().reduce()

            evalValues[letter === undefined ? 'x' : letter] = new Fraction(value)

            if (offset !== 'above' && offset !== 'below') {
                theLimit = FR._numerator.evaluate(evalValues)
                    .divide(FR._denominator.evaluate(evalValues))

                return theLimit.isInfinity() ? theLimit.abs() : theLimit
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
                    return theSign === 1 ? theLimit.abs() : theLimit.abs().opposed()
                } else {
                    return theLimit
                }
            }
        }
    }

    evaluate = (values: literalType | Fraction | number): Fraction => {
        const r = new Fraction().zero();

        let N = this._numerator.evaluate(values),
            D = this._denominator.evaluate(values)

        return N.divide(D)
    };

    evaluateAsNumeric = (values: { [Key: string]: number } | number): number => {
        return this._numerator.evaluateAsNumeric(values) / this._denominator.evaluateAsNumeric(values)
    }

    study = (config?:StudyConfig|string): RationalStudy => {
        return new RationalStudy(this, config)
    }
}
