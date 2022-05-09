import {ExpFactorNumber, ExpFactorVariable, ExpressionFactor} from "./internals";

export class ExpressionMember {
    private _factors: ExpressionFactor[]

    constructor(...values: ExpressionFactor[]) {
        this._factors = values
    }

    get factors(): ExpressionFactor[] {
        return this._factors;
    }

    set factors(value: ExpressionFactor[]) {
        this._factors = value;
    }

    get numerator(): ExpressionFactor[] {
        return this._factors.filter(factor => factor.power > 0)
    }

    get denominator(): ExpressionFactor[] {
        return this._factors.filter(factor => factor.power < 0)
    }

    get tex(): string {
        let num = this.numerator,
            den = this.denominator,
            numTex = num.map((x, index) => x.makeTeX(num.length, index)),
            denTex = den.map((x, index) => x.makeTeX(den.length, index))

        if (den.length > 0) {
            return `\\frac{ ${numTex.join("")} }{ ${denTex.join("")} }`
        } else {
            return numTex.join("")
        }
    }

    opposed(): ExpressionMember {
        let firstMember = this.factors[0]

        if (firstMember === undefined) {
            return this
        }

        if (firstMember instanceof ExpFactorNumber) {
            if (firstMember.hasPower() || firstMember.hasRoot()) {
                this.factors.unshift(new ExpFactorNumber(-1))
            } else {
                firstMember.number = -firstMember.number
            }
        } else {
            this.factors.unshift(new ExpFactorNumber(-1))
        }


        return this
    }

    add(value: ExpressionFactor): ExpressionMember {
        this._factors.push(value)
        return this
    }

    addFactors(...values: ExpressionFactor[]): ExpressionMember {

        for (let value of values) {
            this._factors.push(value)
        }

        return this
    }

    isZero(): Boolean {

        if (this._factors.length === 0) {
            return true
        }

        for (let factor of this._factors) {
            if (factor.isZero()) {
                return true
            }
        }

        return false
    }

    hasVariable(variable?: string): boolean {

        if (variable === undefined) {
            return !this.isNumeric()
        }


        for (let factor of this._factors) {
            if (factor.hasVariable(variable)) {
                return true
            }
        }

        return false
    }

    isNumeric(): boolean {
        for (let factor of this._factors) {
            if (factor instanceof ExpFactorVariable) {
                return false
            }
        }

        return true
    }
}