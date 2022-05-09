"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionMember = void 0;
const internals_1 = require("./internals");
class ExpressionMember {
    constructor(...values) {
        this._factors = values;
    }
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
    get tex() {
        let num = this.numerator, den = this.denominator, numTex = num.map((x, index) => x.makeTeX(num.length, index)), denTex = den.map((x, index) => x.makeTeX(den.length, index));
        if (den.length > 0) {
            return `\\frac{ ${numTex.join("")} }{ ${denTex.join("")} }`;
        }
        else {
            return numTex.join("");
        }
    }
    opposed() {
        let firstMember = this.factors[0];
        if (firstMember === undefined) {
            return this;
        }
        if (firstMember instanceof internals_1.ExpFactorNumber) {
            if (firstMember.hasPower() || firstMember.hasRoot()) {
                this.factors.unshift(new internals_1.ExpFactorNumber(-1));
            }
            else {
                firstMember.number = -firstMember.number;
            }
        }
        else {
            this.factors.unshift(new internals_1.ExpFactorNumber(-1));
        }
        return this;
    }
    add(value) {
        this._factors.push(value);
        return this;
    }
    addFactors(...values) {
        for (let value of values) {
            this._factors.push(value);
        }
        return this;
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
    hasVariable(variable) {
        if (variable === undefined) {
            return !this.isNumeric();
        }
        for (let factor of this._factors) {
            if (factor.hasVariable(variable)) {
                return true;
            }
        }
        return false;
    }
    isNumeric() {
        for (let factor of this._factors) {
            if (factor instanceof internals_1.ExpFactorVariable) {
                return false;
            }
        }
        return true;
    }
}
exports.ExpressionMember = ExpressionMember;
//# sourceMappingURL=expressionMember.js.map