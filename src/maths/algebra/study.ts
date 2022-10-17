/**
 * Rational polynom module contains everything necessary to handle rational polynoms.
 * @module Polynom
 */

import {Rational} from "./rational";
import {ISolution} from "./equation";
import {Polynom} from "./polynom";
import {Fraction} from "../coefficients/fraction";
import {Point} from "../geometry/point";
import {NumExp} from "../expressions/numexp";

export type StudyableFunction = Rational


export enum ZEROTYPE {
    ZERO = 'z',
    DEFENCE = 'd',
    NOTHING = 't'
}

export interface IZero extends ISolution {
    extrema: FUNCTION_EXTREMA,
    type: ZEROTYPE
}

export enum ASYMPTOTE {
    VERTICAL = "av",
    HORIZONTAL = "ah",
    SLOPE = "ao",
    HOLE = "hole"
}

export enum ASYMPTOTE_POSITION {
    "LT" = "LT",
    "RT" = "RT",
    "LB" = "LB",
    "RB" = "RB"
}
export interface IAsymptote {
    fx: Polynom,
    deltaX: StudyableFunction
    limits: string,
    tex: string,
    type: ASYMPTOTE,
    zero: IZero,
    position: ASYMPTOTE_POSITION[]
    tableOfSign: ITableOfSigns,
}

export enum FUNCTION_EXTREMA {
    MIN = "min",
    MAX = "max",
    FLAT = "flat",
    NOTHING = ""
}

export interface IExtrema {
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

export interface ITableOfSigns {
    extremes: { [Key: string]: IExtrema },
    factors: Polynom[],
    fx: StudyableFunction,
    signs: (string[])[],
    type: TABLE_OF_SIGNS
    zeroes: IZero[],
    tex: string
}

export enum TABLE_OF_SIGNS {
    SIGNS = "signs",
    GROWS = "grows",
    VARIATIONS = "variations"
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
    fx: StudyableFunction
    private _asymptotes: IAsymptote[]
    private _derivative: ITableOfSigns
    private _signs: ITableOfSigns
    private _variations: ITableOfSigns
    private _zeroes: IZero[]

    constructor(fx: StudyableFunction) {
        this.fx = fx
        this.makeStudy()
        return this
    }

    get zeroes(): IZero[] {
        return this._zeroes;
    }

    get domain(): string {
        return this.fx.domain()
    }

    get signs(): ITableOfSigns {
        return this._signs;
    }

    get asymptotes(): IAsymptote[] {
        return this._asymptotes;
    }

    get derivative(): ITableOfSigns {
        return this._derivative;
    }

    get texSigns(): string {
        return this._makeTexFromTableOfSigns(this._signs)
    }

    get texGrows(): string {
        return this._makeTexFromTableOfSigns(this._derivative)
    }

    get texVariations(): string {
        return this._makeTexFromTableOfSigns(this._variations)
    }

    makeStudy = (): void => {
        this._zeroes = this.makeZeroes()

        this._signs = this.makeSigns()

        this._asymptotes = this.makeAsymptotes()

        this._derivative = this.makeDerivative()

        this._variations = this.makeVariation()

        this._signs.tex = this.texSigns

        this._derivative.tex = this.texGrows

        this._variations.tex = this.texVariations

    };

    indexOfZero = (zeroes: IZero[], zero: IZero | ISolution): number => {
        for (let i = 0; i < zeroes.length; i++) {
            if (zeroes[i].tex === zero.tex) {
                return i
            }
        }
        return -1
    };

    makeOneLineForSigns = (factor: Polynom, zeroes: IZero[], zeroSign: ZEROTYPE): string[] => {
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
            oneLine.push(currentZero.includes(zeroes[i].tex) ? zeroSign : ZEROTYPE.NOTHING)

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

    makeSignsResult = (signs: (string[])[]): string[] => {

        // Initialize the result line with the first line of the signs table
        let resultLine: string[] = signs[0].map((x, index) => {
            if (index === 0 || index === signs[0].length - 1) {
                return ''
            }

            if (index % 2 === 0) {
                return 't'
            }

            return '+'
        })

        // Go through each lines (except the first)
        for (let current of signs) {

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

    makeGrowsResult = (tos: ITableOfSigns): { growsLine: string[], extremes: { [Key: string]: IExtrema } } => {

        // Use the last line (=> resultLine) to grab the necessary information
        let signsAsArray = Object.values(tos.signs),
            resultLine = signsAsArray[signsAsArray.length - 1],
            growsLine: string[] = [],
            extremes: { [Key: string]: IExtrema } = {},
            zeroes = tos.zeroes

        // Get the extremes
        for (let i = 0; i < zeroes.length; i++) {

            // Get the corresponding item in the resultLine.
            let pos = 2 * i + 2
            if (resultLine[pos] === 'z') {

                // It's a zero. Get the coordinates
                let x: number, y: number, zero = zeroes[i].exact,
                    pt: Point,
                    xTex: string, yTex: string,
                    pointType: FUNCTION_EXTREMA

                // TODO: NumExp should parse something that isn't yet plotFunction
                let exp = new NumExp(this.fx.plotFunction)

                if (zero instanceof Fraction) {
                    let value: Fraction = zero,
                        evalY = this.fx.evaluate(value)

                    x = zero.value
                    y = evalY.value
                    xTex = zero.tex
                    yTex = evalY.tex
                } else {
                    x = zeroes[i].value
                    y = exp.evaluate({x})

                    xTex = x.toFixed(2)
                    yTex = y.toFixed(2)
                }

                // Determine the type of the zero.
                if (resultLine[pos - 1] === resultLine[pos + 1]) {
                    pointType = FUNCTION_EXTREMA.FLAT
                } else if (resultLine[pos - 1] === '+') {
                    pointType = FUNCTION_EXTREMA.MAX
                } else {
                    pointType = FUNCTION_EXTREMA.MIN

                }

                // Add the point to the list
                extremes[zeroes[i].tex] = {
                    type: pointType,
                    tex: {x: xTex, y: yTex},
                    value: {x, y}
                }
            }
        }

        // Create the grows line, based on tkz-tab
        // \tkzTabLine{  ,  +  ,  z    ,  -  ,  d  ,  -  ,  z  ,  +  ,  }
        // \tkzTabVar{     -/  , +/$3$ ,       -D+/ , -/$1$  , +/  }
        growsLine.push(resultLine[1] === '+' ? '-/' : '+/')
        for (let i = 1; i < resultLine.length - 1; i++) {
            if (resultLine[i] === "z") {
                let extr = extremes[zeroes[(i - 2) / 2].tex]

                growsLine.push(`${resultLine[i - 1]}/\\(${extr.type}(${extr.tex.x};${extr.tex.y})\\)`)
            } else if (resultLine[i] === 'd') {
                growsLine.push(`${resultLine[i - 1]}D${resultLine[i + 1] === '+' ? '-' : '+'}/`)
            }
        }
        growsLine.push(`${resultLine[resultLine.length - 2]}/`)

        return {growsLine, extremes}
    }

    makeVariationsResult = (tos: ITableOfSigns): { varsLine: string[], extremes: { [Key: string]: IExtrema } } => {
        // TODO: make variations result is not yet implemented.
        let extremes = {},
            varsLine: string[] = []
        return {varsLine, extremes}
    }

    makeZeroes(): IZero[] {
        return []
    };

    makeSigns(): ITableOfSigns {
        return {
            type: TABLE_OF_SIGNS.SIGNS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        }
    };

    makeAsymptotes(): IAsymptote[] {
        return []
    }

    makeDerivative(): ITableOfSigns {
        return {
            type: TABLE_OF_SIGNS.GROWS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        }
    }

    makeVariation(): ITableOfSigns {
        return {
            type: TABLE_OF_SIGNS.VARIATIONS,
            fx: null,
            factors: [],
            zeroes: [],
            signs: [],
            extremes: {},
            tex: ''
        }
    }

    private _makeTexFromTableOfSigns = (tos: ITableOfSigns): string => {
        let factors = tos.factors.map(x => `\\(${x.tex}\\)/1`),
            factorsFx = "\\(fx\\)/1.2",
            zeroes = tos.zeroes

        // Add the last lines "label"
        if (tos.type === TABLE_OF_SIGNS.GROWS) {
            factorsFx = "\\(f'(x)\\)/1.2,\\(f(x)\\)/2"
        } else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
            factorsFx = "\\(f''(x)\\)/1.2,\\(f(x)\\)/2"
        }

        // Create the tikzPicture header
        let tex = `\\begin{tikzpicture}
\\tkzTabInit[lgt=3,espcl=2,deltacl=0]{/1.2,${factors.join(',')},/.1,${factorsFx} }{{\\scriptsize \\hspace{1cm} \\(-\\infty\\)},\\(${zeroes.map(x => x.tex).join('\\),\\(')}\\),{\\scriptsize \\hspace{-1cm} \\(+\\infty\\)}}`

        let pos
        for (pos = 0; pos < tos.factors.length; pos++) {
            tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`)
        }

        // Add the result line
        tex += (`\n\\tkzTabLine{${tos.signs[pos].join(',')}}`)
        // Add the grows / vars line
        if (tos.type === TABLE_OF_SIGNS.GROWS) {
            tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`)
        } else if (tos.type === TABLE_OF_SIGNS.VARIATIONS) {
            // TODO: Check variations table for as tex
            tex += (`\n\\tkzTabVar{${tos.signs[pos + 1].join(',')}}`)
        }

        tex += `\n\\end{tikzpicture}`

        return tex
    }

    drawCode = (): string => {
        // Function as string
        let code = `f(x)=${this.fx.plotFunction}`

        // Asymptotes
        let i: number = 1
        this.asymptotes.forEach(asymptote => {
            if (asymptote.type === ASYMPTOTE.VERTICAL) {
                code += `\nav_${i}=line x=${asymptote.zero.value}->red,dash`
                i++
            } else if (asymptote.type === ASYMPTOTE.HORIZONTAL) {
                code += `\nah=line y=${asymptote.fx.monoms[0].coefficient.value}->orange,dash`
            } else if (asymptote.type === ASYMPTOTE.SLOPE) {
                code += `\nao=line y=${asymptote.fx.plotFunction}->red,dash`
            }
            i++
        })

        // Extremes
        for (let zero in this.derivative.extremes) {
            let extreme = this.derivative.extremes[zero]

            code += `\nM_${i}(${extreme.value.x},${extreme.value.y})*`
            i++
        }

        // Zeroes
        this.zeroes.forEach(zero => {
            if (zero.type === ZEROTYPE.ZERO) {
                code += `\nZ_${i}(${zero.value},0)*`
                i++
            }
        })

        return code
    }
}
