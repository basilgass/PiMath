"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpressionMember = void 0;

class ExpressionMember {
    get factors() {
        return this._factors;
    }

    set factors(value) {
        this._factors = value;
    }

    get numerator() {
        return this._factors.filter(factor => factor.power > 0);
    }

    get denominator() {
        return this._factors.filter(factor => factor.power < 0);
    }

    addFactors(...values) {
        for (let value of values) {
            this._factors.push(value);
        }
        return this;
    }

    hasVariable(variable) {
        for (let factor of this._factors) {
            if (factor.hasVariable(variable)) {
                return true;
            }
        }
        return false;
    }

    isZero() {
        if (this._factors.length === 0) {
            return true;
        }
        for (let factor of this._factors) {
            if (factor.isZero()) {
                return true;
            }
        }
        return false;
    }
}

exports.ExpressionMember = ExpressionMember;
//# sourceMappingURL=expressionMember.js.map