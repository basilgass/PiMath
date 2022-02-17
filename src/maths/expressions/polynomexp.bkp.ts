import {Polynom} from "../algebra";
import {Fraction} from "../coefficients";

type Factor = {
    polynom: Polynom,
    degree: Fraction
}

export function isFactor(value: any): value is Factor {
    return value && 'polynom' in value && 'degree' in value
}

export class PolynomExpFactor {
    constructor(...values: unknown[]) {
        this._powerAsInteger = true
        this._factors = []

        for (let factor of values) {
            if (isFactor(factor)) {
                this.addFactor({
                    polynom: factor.polynom,
                    degree: factor.degree
                })
            }
        }
    }

    private _factors: Factor[]

    get factors(): Factor[] {
        return this._factors;
    }

    private _powerAsInteger: boolean

    get powerAsInteger(): boolean {
        return this._powerAsInteger;
    }

    set powerAsInteger(value: boolean) {
        this._powerAsInteger = value;
    }

    get tex(): string {
        // group positive and negative degrees.
        const numerators: String[] = [],
            denominators: String[] = []

        for (const k of this._factors) {
            if (k.degree.isPositive()) {
                numerators.push(this._factorAsTex(k))
            } else {
                denominators.push(this._factorAsTex({
                    polynom: k.polynom,
                    degree: k.degree.clone().opposed()
                }))
            }
        }

        console.log(numerators.length)
        if (denominators.length > 0) {
            return `\\dfrac{ ${numerators.length > 0 ? numerators.join('') : 1} }{ ${denominators.join('')} }`
        } else {
            return numerators.join('')
        }
    }

    addFactor = (value: Factor): PolynomExpFactor => {
        this._factors.push({
            polynom: new Polynom(value.polynom),
            degree: new Fraction(value.degree)
        })

        return this
    }

    multiply = (value: PolynomExpFactor): PolynomExpFactor => {
        for (const k of value.factors) {
            this.addFactor(k)
        }
        return this
    }

    divide = (value: PolynomExpFactor): PolynomExpFactor => {
        for (const k of value.factors) {
            this.addFactor({
                polynom: k.polynom,
                degree: k.degree.clone().opposed()
            })
        }
        return this
    }

    derivative = (letter: string): PolynomExp => {
        // A*B*C*D =

        // Basic version
        // TODO: create derivative with more than only two factors.
        if (this._factors.length === 2) {
            const A = this._factors[0], B = this._factors[1],
                P = new PolynomExp()
            let Ad = this._factorDerivative(A),
                Bd = this._factorDerivative(B)

            P.add(
                new PolynomExpFactor(
                    {
                        polynom: A.polynom.derivative(letter),
                    }
                )
            )
        }
        return
    }

    private _factorDerivative = (factor: Factor, letter?: string): PolynomExpFactor => {
        let derivativeExpression = new PolynomExpFactor()
        derivativeExpression.addFactor({polynom: new Polynom(factor.degree), degree: new Fraction().one()})
        derivativeExpression.addFactor({polynom: factor.polynom, degree: factor.degree.subtract(1)})
        derivativeExpression.addFactor({
            polynom: factor.polynom.clone().derivative(letter),
            degree: new Fraction().one()
        })

        return derivativeExpression

    }

    private _factorAsTex = (factor: Factor, withParenthesis?: Boolean): string => {
        let tex: string = ''

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
    private _factors: { factors: PolynomExpFactor, positive: boolean }[]

    constructor(...values: PolynomExpFactor[]) {
        this._factors = []
        if (values !== undefined) {
            for (const factor of values) {
                console.log('ADDING', factor.tex)
                this._factors.push({
                    factors: factor,
                    positive: true
                })
            }
        }
        this._powerAsInteger = true
    }

    private _powerAsInteger: boolean

    get powerAsInteger(): boolean {
        return this._powerAsInteger;
    }

    set powerAsInteger(value: boolean) {
        for (const factor of this._factors) {
            factor.factors.powerAsInteger = value
        }
        this._powerAsInteger = value;
    }

    get tex(): string {
        let tex = ''

        for (const factor of this._factors) {
            if (factor.factors.tex === '') {
                continue
            }
            if (tex !== '' || !factor.positive) {
                tex += factor.positive ? '+' : '-'
            }
            tex += factor.factors.tex
        }


        return tex
    }

    add = (value: PolynomExpFactor): PolynomExp => {
        value.powerAsInteger = this._powerAsInteger
        this._factors.push({
            factors: value,
            positive: true
        })
        return this
    }

    subtract = (value: PolynomExpFactor): PolynomExp => {
        value.powerAsInteger = this._powerAsInteger
        this._factors.push({
            factors: value,
            positive: false
        })
        return this
    }
}