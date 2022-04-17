/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {IEuclidian, Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {literalType} from "./monom";
import {Equation, ISolution, PARTICULAR_SOLUTION} from "./equation";
import {Point} from "../geometry/point";

export enum FUNCTION_EXTREMA {
    MIN = "min",
    MAX = "max",
    FLAT = "flat",
    NOTHING = ""
}

interface IExtrema {
    tex: {
        x: string,
        y: string
    },
    type: FUNCTION_EXTREMA,
    value: {
        x: number,
        y: number
    }

}

interface ITableOfSign {
    extrema: IExtrema[]
    factors: Polynom[],
    hasGrow: boolean,
    signs: (string[])[],
    tex: string
    variation: string[]
    zeroes: ISolution[],
}

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

    makeTableOfSigns = (dxFromFx?: Rational): ITableOfSign => {
        // Factorize the numerator and the denominator
        this._numerator.factorize()
        this._denominator.factorize()

        let zeroes = Equation.makeSolutionsUnique([...this._numerator.getZeroes(), ...this._denominator.getZeroes()], true).filter(x => !isNaN(x.value)),
            NFactors = this._numerator.factors,
            DFactors = this._denominator.factors,
            extrema: IExtrema[] = [],
            varLine: string[] = []

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

        // Initiaise the line.
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

        // TODO: add the variation line.

        if (dxFromFx !== undefined) {
            // Add the variation line.


            // \tkzTabLine{  ,  +  ,  z    ,  -  ,  d  ,  -  ,  z  ,  +  ,  }
            // \tkzTabVar{     -/  , +/$3$ ,       -D+/ , -/$1$  , +/  }
            // The first and last line aren't used.
            varLine.push(resultLine[1] === '+' ? '/-' : '/+')
            for (let i = 1; i < resultLine.length - 1; i++) {
                if (resultLine[i] === "z") {
                    varLine.push(`${resultLine[i - 1]}/\\(EXT\\)/${resultLine[i + 1] === '+' ? '-' : '+'}`)
                } else if (resultLine[i] === 'd') {
                    varLine.push(`${resultLine[i - 1]}D${resultLine[i + 1] === '+' ? '-' : '+'}/`)
                }
            }
            varLine.push(`${resultLine[resultLine.length - 2]}/`)

            // Add the min and max
            for (let i = 0; i < zeroes.length; i++) {
                let pos = 2 * i + 2
                if (resultLine[pos] === 'z') {
                    // It's a zero. Get the coordinates
                    let x: number, y: number, zero = zeroes[i].exact,
                        pt: Point,
                        xTex: string, yTex: string,
                        pointType: FUNCTION_EXTREMA


                    if (zero instanceof Fraction) {
                        let value: Fraction = zero,
                            evalY = dxFromFx.evaluate(value)

                        x = zero.value
                        y = evalY.value
                        xTex = zero.tex
                        yTex = evalY.tex
                    } else {
                        x = zeroes[i].value
                        y = dxFromFx.evaluate(zeroes[i].value).value

                        xTex = x.toFixed(2)
                        yTex = y.toFixed(2)
                    }

                    if (resultLine[pos - 1] === resultLine[pos + 1]) {
                        pointType = FUNCTION_EXTREMA.FLAT
                    } else if (resultLine[pos - 1] === '+') {
                        pointType = FUNCTION_EXTREMA.MAX
                    } else {
                        pointType = FUNCTION_EXTREMA.MIN

                    }

                    // Add the point to the list
                    extrema.push({
                        type: pointType,
                        tex: {x: xTex, y: yTex},
                        value: {x, y}
                    })
                }
            }
        }

        // Add the result line.
        tableOfSigns.push(resultLine)

        let tos = {
            hasGrow: dxFromFx !== undefined,
            factors: [...NFactors, ...DFactors],
            zeroes,
            signs: tableOfSigns,
            tex: '',
            extrema: extrema,
            variation: varLine
        }


        this._makeTexFromTableOfSigns(tos)

        return tos
    }

    evaluate = (values: literalType | Fraction | number): Fraction => {
        const r = new Fraction().zero();

        let N = this._numerator.evaluate(values),
            D = this._denominator.evaluate(values)

        return N.divide(D)
    };

    private _makeTexFromTableOfSigns = (tos: ITableOfSign): string => {

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
