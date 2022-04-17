/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {FUNCTION_EXTREMA, Rational} from "./rational";
import {ISolution} from "./equation";
import {Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";

export type StudyableFunction = Rational

export interface IStudy {
    domain: string,
    zeroes: ISolution[]
}

enum ZEROTYPE {
    ZERO = 'z',
    DEFENCE = 'd',
    NOTHING = 't'
}

export interface IZero extends ISolution {
    extrema: FUNCTION_EXTREMA,
    type: ZEROTYPE
}

enum ASYMPTOTE {
    VERTICAL = "av",
    HORIZONTAL = "ah",
    SLOPE = "ao",
    HOLE = "hole"
}

export interface IAsymptote {
    type: ASYMPTOTE,
    tex: string,
    zero: IZero,
    limits: string,
    deltaX: StudyableFunction
}

/**
 * The study class is a "function study" class that will get:
 * fx               : get the function
 * domain           : string
 * zeroes           : Object (tex, IZero)
 * signs            : table of signs + tex output  using tkz-tab
 * av               : vertical asymptotic
 * ah               : horizontal asymptotic
 * ao               : obliques
 * deltaX           : position relative
 * dx               : derivative
 * grows            : growing table + tex output  using tkz-tab
 * ddx              : dérivée seconde
 * variations       : variation table + tex output  using tkz-tab
 */
export class Study {
    private _fx: StudyableFunction
    private _signs: (string[])[]
    private _zeroes: IZero[]
    private _asymptotes: IAsymptote[]

    constructor(fx: StudyableFunction) {
        if (fx instanceof Rational) {
            this._makeRationalStudy(fx)
        }
        return this
    }

    get fx(): StudyableFunction {
        return this._fx;
    }

    get zeroes(): IZero[] {
        return this._zeroes;
    }

    get domain(): string {
        return this._fx.domain()
    }

    get signs(): string[][] {
        return this._signs;
    }

    get asymptotes(): IAsymptote[] {
        return this._asymptotes;
    }

    private _makeRationalStudy(fx: Rational) {
        this._fx = fx
        this._makeZeroesForRational()
        this._makeSignsForRational()
        this._makeAsymptotesForRational()
    }

    private _makeZeroesForRational(): void {
        // All zeroes.
        this._zeroes = []
        this._fx.numerator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            // add the item
            this._zeroes.push({
                tex: z.tex,
                value: z.value,
                exact: z.exact,
                extrema: FUNCTION_EXTREMA.NOTHING,
                type: ZEROTYPE.ZERO
            })
        })
        this._fx.denominator.getZeroes().filter(x => !isNaN(x.value)).forEach(z => {
            let idx = this.indexOfZero(z)
            if (idx !== -1) {
                this._zeroes[idx].type = ZEROTYPE.DEFENCE
            } else {
                // Add the item
                this._zeroes.push({
                    tex: z.tex,
                    value: z.value,
                    exact: z.exact,
                    extrema: FUNCTION_EXTREMA.NOTHING,
                    type: ZEROTYPE.DEFENCE
                })
            }
        })

        // sort all zeroes
        this._zeroes.sort((a, b) => a.value - b.value)
    }

    private _makeSignsForRational(): void {
        // Factorize the rational
        let NFactors = this._fx.numerator.factors,
            DFactors = this._fx.denominator.factors

        this._signs = []
        NFactors.forEach(factor => {
            this._signs.push(this._makeSignsForRationalOneLine(factor, ZEROTYPE.ZERO))
        })
        DFactors.forEach(factor => {
            this._signs.push(this._makeSignsForRationalOneLine(factor, ZEROTYPE.DEFENCE))
        })
        this._signs.push(this._makeSignsResult())
    }

    private _makeSignsForRationalOneLine = (factor: Polynom, zeroSign: ZEROTYPE): string[] => {
        let oneLine: string[] = [],
            currentZero = factor.getZeroes().map(x => x.tex)

        let zeroes = Object.values(this._zeroes)

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

    private _makeAsymptotesForRational(): void {
        const reduced:Rational = this._fx.clone().reduce()
        // Vertical
        this._asymptotes = []
        this._zeroes.filter(x=>x.type===ZEROTYPE.DEFENCE).forEach(zero => {
            // Check if it's a hole or an asymptote
            // TODO: Check for a hole ! Means calculate the limits !
            let Ztype = ASYMPTOTE.VERTICAL,
                tex = `x=${zero.tex}`
            if(zero.exact instanceof Fraction){
                if(reduced.denominator.evaluate(zero.exact).isNotZero()){
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.exact).tex})`
                }
            }else{
                if(reduced.denominator.evaluate(zero.value).isNotZero()){
                    Ztype = ASYMPTOTE.HOLE
                    tex = `(${zero.tex};${reduced.evaluate(zero.value).tex})`
                }
            }

            this._asymptotes.push({
                type: Ztype,
                tex: tex,
                zero: zero,
                limits: `\\lim_{x\\to${zero.tex} }\\ f(x) = \\pm\\infty`,
                deltaX: null
            })
        })

        // Sloped asymptote
        let NDegree = this._fx.numerator.degree(),
            DDegree = this._fx.denominator.degree()
        if(NDegree.isEqual(DDegree)){
            let H = this._fx.numerator.monomByDegree().coefficient.clone().divide(this._fx.denominator.monomByDegree().coefficient).tex
            this._asymptotes.push({
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=${H}`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${H}`,
                deltaX: null
            })
        }else if(DDegree.greater(NDegree)){
            this._asymptotes.push({
                type: ASYMPTOTE.HORIZONTAL,
                tex: `y=0`,
                zero: null,
                limits: `\\lim_{x\\to\\infty}\\ f(x) = ${0}`,
                deltaX: null
            })
        }else if(NDegree.value-1 === DDegree.value){
            // Calculate the slope
            let {quotient, reminder} = reduced.euclidian()

            this._asymptotes.push({
                type: ASYMPTOTE.SLOPE,
                tex: `y=${quotient.tex}`,
                zero: null,
                limits: ``,
                deltaX: new Rational(reminder, reduced.denominator)
            })
        }
    }
    private _makeDerivativeForRational = (): void => {

    }

    private indexOfZero(zero: IZero | ISolution): number {
        for (let i = 0; i < this._zeroes.length; i++) {
            if (this._zeroes[i].tex === zero.tex) {
                return i
            }
        }
        return -1
    }

    private _makeSignsResult = (): string[] => {
        let resultLine: string[] = this._signs[0].map((x, index) => {
            if (index === 0) {
                return ''
            }
            if (index === this._signs[0].length - 1) {
                return ''
            }
            if (index % 2 === 0) {
                return 't'
            }
            return '+'
        })

        for (let current of this._signs) {
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

        return resultLine
    }
}
