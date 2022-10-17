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
        return this.toString(true);
    }
    get display() {
        return this.toString(false);
    }
    toString(asTex) {
        if (asTex === undefined) {
            asTex = true;
        }
        let outputArray = this.factors.map(x => {
            return {
                value: asTex ? x.tex : x.display,
                valueWithoutParentheses: asTex ? x.makeTeX(1, 0) : x.makeDisplay(1, 0),
                denominator: x.power < 0,
                number: (x instanceof internals_1.ExpFactorNumber)
            };
        }), output = '';
        while (outputArray.length > 0) {
            let item = outputArray.shift();
            if (item.denominator) {
                if (asTex) {
                    output += `\\frac{1}{ ${item.valueWithoutParentheses} }`;
                }
                else {
                    output += `1/(${item.valueWithoutParentheses})`;
                }
            }
            else {
                if (outputArray.length > 0 && outputArray[0].denominator) {
                    let item2 = outputArray.shift();
                    if (asTex) {
                        output += `\\frac{ ${item.valueWithoutParentheses} }{ ${item2.valueWithoutParentheses} }`;
                    }
                    else {
                        output += `(${item.valueWithoutParentheses})/(${item2.valueWithoutParentheses})`;
                    }
                }
                else {
                    output += item.value;
                    // Check if we need to add the multiplication sign.
                    if (outputArray.length > 0) {
                        if (item.number && outputArray[0].number) {
                            if (outputArray.length > 1) {
                                if (!outputArray[1].denominator) {
                                    output += asTex ? " \\cdot " : "*";
                                }
                            }
                            else {
                                output += asTex ? " \\cdot " : "*";
                            }
                        }
                    }
                }
            }
        }
        return output;
    }
    // opposed(): ExpressionMember {
    //     let firstMember = this.factors[0]
    //
    //     if (firstMember === undefined) {
    //         return this
    //     }
    //
    //     if (firstMember instanceof ExpFactorNumber) {
    //         if (firstMember.hasPower() || firstMember.hasRoot()) {
    //             this.factors.unshift(new ExpFactorNumber(-1))
    //         } else {
    //             firstMember.number = -firstMember.number
    //         }
    //     } else {
    //         this.factors.unshift(new ExpFactorNumber(-1))
    //     }
    //
    //     return this
    // }
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
    /**
     * Returns the "coefficient", ie a member with only numeric values factors.
     */
    coefficient() {
        let EM = new ExpressionMember();
        for (let factor of this.factors) {
            if (factor.isNumeric()) {
                EM.add(factor);
            }
        }
        return EM;
    }
    /**
     * Returns a member with all factors containing a literal part.
     */
    literal() {
        let EM = new ExpressionMember();
        for (let factor of this.factors) {
            if (!factor.isNumeric()) {
                EM.add(factor);
            }
        }
        return EM;
    }
    similarTo(member) {
        // TODO: identify two "similar" member, ie with the same literal parts.
        return true;
    }
    reduce() {
        // Merge all ExpFactorNumbers that are number
        let numerator = new internals_1.ExpFactorNumber(1), denominator = new internals_1.ExpFactorNumber(1, -1), literal = [];
        for (let factor of this.factors) {
            // Reduce the factor
            factor.reduce();
            if (factor instanceof internals_1.ExpFactorNumber && factor.root === 1) {
                if (factor.power > 0) {
                    numerator.number = numerator.number * (factor.number ** factor.power);
                }
                else {
                    denominator.number = denominator.number * (factor.number ** (-factor.power));
                }
            }
            else {
                literal.push(factor);
            }
        }
        let EM = new ExpressionMember();
        // There is a numerator
        if (numerator.number !== 1) {
            EM.addFactors(numerator);
        }
        // No denominator.
        if (denominator.number !== 1) {
            EM.addFactors(denominator);
        }
        // Add the other factors
        EM.addFactors(...literal);
        return EM;
    }
}
exports.ExpressionMember = ExpressionMember;
//# sourceMappingURL=expressionMember.js.map