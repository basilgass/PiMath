/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {literalType} from "./monom";
import {Equation, ISolution, PARTICULAR_SOLUTION} from "./equation";

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

    private _numerator: Polynom;

    get numerator(): Polynom {
        return this._numerator
    }

    private _denominator: Polynom;

    get denominator(): Polynom {
        return this._denominator
    }

    get tex(): string {
        return `\\frac{ ${this._numerator.tex} }{ ${this._denominator.tex} }`;
    }

    get texFactors(): string {
        return `\\frac{ ${this._numerator.texFactors} }{ ${this._denominator.texFactors} }`
    }

    clone = (): Rational => {
        this._numerator = this._numerator.clone()
        this._denominator = this._denominator.clone()

        return this;
    }

    domain = (): string => {
        let zeroes = this._denominator.getZeroes();
        if (zeroes.length === 0 || zeroes[0].tex === PARTICULAR_SOLUTION.real) {
            return PARTICULAR_SOLUTION.real
        } else if (zeroes[0].tex === PARTICULAR_SOLUTION.varnothing) {
            return PARTICULAR_SOLUTION.varnothing
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

    makeTableOfSigns = (): { factors: Polynom[], zeroes: ISolution[], signs: (string[])[], tex: string } => {
        // Factorize the numerator and the denominator
        this._numerator.factorize()
        this._denominator.factorize()

        let zeroes = Equation.makeSolutionsUnique([...this._numerator.getZeroes(), ...this._denominator.getZeroes()], true).filter(x => !isNaN(x.value)),
            NFactors = this._numerator.factors,
            DFactors = this._denominator.factors

        let tableOfSigns: (string[])[] = [],
            result: string[] = []

        NFactors.forEach(factor => {
            tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'z'))
        })
        DFactors.forEach(factor => {
            tableOfSigns.push(this._makeOneLineOfTableOfSigns(factor, zeroes, 'd'))
        })

        // Empty line
        tableOfSigns.push([])

        // Add the final row as cumulative
        let resultLine: string[] = tableOfSigns[0].map((x, index) => {
            if (index === 0) {
                return ''
            }
            if (index === tableOfSigns[0].length - 1) {
                return ''
            }
            if (index % 2 === 0) {
                return 't'
            }
            return '+'
        })

        for (let current of tableOfSigns) {
            for (let i = 0; i < current.length; i++) {
                if (i % 2 === 0) {
                    // t, z or d
                    if (resultLine[i] === 'd') {
                        continue
                    }
                    if (current[i] !== 't') {
                        resultLine[i] = current[i]
                    }
                } else {
                    // + or -
                    if (current[i] === '-') {
                        resultLine[i] = resultLine[i] === '+' ? '-' : '+'
                    }
                }
            }
        }

        // Add the variation line.
        // TODO: add the variation line.

        tableOfSigns.push(resultLine)

        let tos = {
            factors: [...NFactors, ...DFactors],
            zeroes: zeroes,
            signs: tableOfSigns,
            tex: ''
        }

        this._makeTexFromTableOfSigns(tos)

        return tos
    }

    private _makeTexFromTableOfSigns = (tos: { factors: Polynom[], zeroes: ISolution[], signs: (string[])[], tex: string }): string => {

        let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,\\(${tos.factors.map(x => x.tex).join('\\)/1,\\(')}\\)/1,/.1,\\(f(x)\\)/1.2}{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${tos.zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`
        tos.signs.forEach(list => {
            tex += (`\n\\tkzTabLine{${list.join(',')}}`)
        })
        tex += `\n\\end{tikzpicture}`

        tos.tex = tex

        return tex
    }
    private _makeOneLineOfTableOfSigns = (factor: Polynom, zeroes: ISolution[], zeroSign: string): string[] => {
        let oneLine: string[] = [],
            currentZero = factor.getZeroes().map(x => x.tex)

        // First +/- sign, before the first zero
        oneLine.push('')
        if (factor.degree().isZero()) {
            oneLine.push(factor.monoms[0].coefficient.sign() === 1 ? '+' : '-')
        } else {
            oneLine.push(factor.evaluate(zeroes[0].value - 1).sign() === 1 ? '+' : '-')
        }


        for (let i = 0; i < zeroes.length; i++) {
            // Add the zero if it's the current one
            oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : 't')

            // + / - sign after the current zero
            if (i < zeroes.length - 1) {
                oneLine.push(factor.evaluate((zeroes[i].value + zeroes[i + 1].value) / 2).sign() === 1 ? '+' : '-')
            } else if (i === zeroes.length - 1) {
                oneLine.push(factor.evaluate(zeroes[i].value + 1).sign() === 1 ? '+' : '-')
            }

        }


        oneLine.push('')

        return oneLine
    }
}
