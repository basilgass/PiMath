import {Polynom} from "../algebra";
import {Fraction} from "../coefficients";
import {Random} from "../random";
import polynom = Random.polynom;


type Factor = {
    polynom: Polynom,
    degree: Fraction
}

export class PolynomExpFactor {
    private _factors: { polynom: Polynom, degree: Fraction }[]
    private _powerAsInteger: boolean

    constructor(...values: unknown[]) {
        this._powerAsInteger = false
        this._factors = []

    }

    addFactor = (value: Factor): PolynomExpFactor => {
        this._factors.push({
            polynom: value.polynom.clone(),
            degree: value.degree.clone()
        })
        return this
    }

    multiply = (value: PolynomExpFactor): PolynomExpFactor => {
        for (let k of this._factors) {
            this.addFactor(k)
        }
        return this
    }

    divide = (value: PolynomExpFactor): PolynomExpFactor => {
        for (let k of this._factors) {
            this.addFactor({
                polynom: k.polynom,
                degree: k.degree.clone().opposed()
            })
        }
        return this
    }

    get factors(): { polynom: Polynom; degree: Fraction }[] {
        return this._factors;
    }

    get tex(): string {
        // group positive and negative degrees.
        let numerators: String[] = [],
            denominators: String[] = []

        for (let k of this._factors) {
            if (k.degree.isPositive()) {
                numerators.push(this.factorAsTex(k))
            } else {
                denominators.push(this.factorAsTex({
                    polynom: k.polynom,
                    degree: k.degree.clone().opposed()
                }))
            }
        }

        if (denominators.length > 0) {
            return `\\dfrac{ ${numerators.join('')} }{ ${denominators.join('')} }`
        } else {
            return ''
        }

    }


    get powerAsInteger(): boolean {
        return this._powerAsInteger;
    }

    set powerAsInteger(value: boolean) {
        this._powerAsInteger = value;
    }

    factorAsTex = (factor: Factor, withParenthesis?: Boolean): string => {
        let tex:string = ''
        if (factor.degree.isOne()) {
            if (withParenthesis === undefined || withParenthesis) {
                tex = `\\left(${factor.polynom.tex}\\right)`
            } else {
                tex = factor.polynom.tex
            }
        } else if (factor.degree.isNatural()) {
            tex = `\\left(${factor.polynom.tex}\\right)^{ ${factor.degree.tex} }`
        } else {
            if (this._powerAsInteger) {
                if (factor.degree.denominator === 2) {
                    tex = `\\sqrt{${factor.polynom.tex}}`
                } else {
                    tex = `\\sqrt[${factor.degree.denominator}]{${factor.polynom.tex}}`
                }

                if (factor.degree.numerator !== 1) {
                    tex += `^{ ${factor.degree.numerator} }`
                }
            } else {
                tex = `\\left(${factor.polynom.tex}\\right)^{ ${factor.degree.tex} }`
            }
        }
        return tex
    }
}

export class PolynomExp {
    private _factors: PolynomExpFactor[]
    private _powerAsInteger: boolean

    constructor(...values: unknown[]) {
        this._factors = []
        this._factors.push(new PolynomExpFactor())
    }

    addFactors = (value: PolynomExpFactor): PolynomExp => {
        value.powerAsInteger = this._powerAsInteger
        this._factors.push(value)
        return this
    }

    get tex(): string {
        return this._factors.map(x=>x.tex).join('')
    }


    get powerAsInteger(): boolean {
        return this._powerAsInteger;
    }

    set powerAsInteger(value: boolean) {
        for(let factor of this._factors){
            factor.powerAsInteger = value
        }
        this._powerAsInteger = value;
    }
}