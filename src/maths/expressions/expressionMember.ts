import {ExpressionFactor} from "./expressionFactor";

export class ExpressionMember {
    private _factors: ExpressionFactor[]

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

    hasVariable(variable: string): boolean {
        for (let factor of this._factors) {
            if (factor.hasVariable(variable)) {
                return true
            }
        }

        return false
    }
}