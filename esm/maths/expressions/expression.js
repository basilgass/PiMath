"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const internals_1 = require("./internals");
class Expression {
    constructor(...values) {
        this._members = [];
        this.addMembers(...values);
        return this;
    }
    get tex() {
        let tex = "";
        for (let item of this._members) {
            try {
                if (tex === "") {
                    tex = (item.sign === -1 ? "-" : "") + item.member.tex;
                }
                else {
                    tex += (item.sign === -1 ? "-" : "+") + item.member.tex;
                }
            }
            catch {
                console.log('Error while generating the TeX code for ', item.constructor.name);
            }
        }
        return tex;
    }
    get display() {
        let display = "";
        for (let item of this._members) {
            try {
                if (display === "") {
                    display = (item.sign === -1 ? "-" : "") + item.member.display;
                }
                else {
                    display += (item.sign === -1 ? "-" : "+") + item.member.display;
                }
            }
            catch {
                console.log('Error while generating the display code for ', item.constructor.name);
            }
        }
        return display;
    }
    get members() {
        return this._members;
    }
    set members(value) {
        this._members = value;
    }
    addMembers(...values) {
        for (let item of values) {
            if (item instanceof internals_1.ExpressionMember) {
                this._members.push({
                    member: item,
                    sign: 1
                });
            }
            else if (item instanceof internals_1.ExpressionFactor) {
                this._members.push({
                    member: new internals_1.ExpressionMember(item),
                    sign: 1
                });
            }
            else {
                this._members.push(item);
            }
        }
        return this;
    }
    add(value) {
        if (value instanceof Expression) {
            this.members = this.members.concat(...value.members);
        }
        else if (value instanceof internals_1.ExpressionMember) {
            this.members.push({
                member: value,
                sign: 1
            });
        }
        else if (value instanceof internals_1.ExpressionFactor) {
            this.members.push({
                member: new internals_1.ExpressionMember(value),
                sign: 1
            });
        }
        return this;
    }
    subtract(value) {
        if (value instanceof Expression) {
            this.members = this.members.concat(...value.members
                .map(item => {
                return { member: item.member, sign: -item.sign };
            }));
        }
        else if (value instanceof internals_1.ExpressionMember) {
            this.members.push({
                member: value,
                sign: -1
            });
        }
        else if (value instanceof internals_1.ExpressionFactor) {
            this.members.push({
                member: new internals_1.ExpressionMember(value),
                sign: -1
            });
        }
        return this;
    }
    variables() {
        let values = [], varFactor;
        values = this.getAllFactors().filter(x => x instanceof internals_1.ExpFactorVariable).map(x => {
            return x instanceof internals_1.ExpFactorVariable ? x.variable : null;
        });
        return [...new Set(values)];
    }
    isPolynom() {
        // Allow variable, number, factor, power, constant
        let factors = this.getAllFactors();
        for (let factor of factors) {
            // No root
            if (factor.root > 1) {
                return false;
            }
            // Allow power, as long as the power argument is numeric
            if (factor instanceof internals_1.ExpFactorPower) {
                if (!factor.powerArgument.isNumeric()) {
                    return false;
                }
                // TODO: the power must be an integer value.
                if (!factor.powerArgument.isNumber()) {
                    return false;
                }
            }
            // Allow some type of factors.
            if (!(factor instanceof internals_1.ExpFactor ||
                factor instanceof internals_1.ExpFactorConstant ||
                factor instanceof internals_1.ExpFactorNumber ||
                factor instanceof internals_1.ExpFactorVariable)) {
                return false;
            }
        }
        return true;
    }
    getAllFactors() {
        let EF = [];
        for (let item of this._members) {
            for (let factor of item.member.factors) {
                EF.push(factor);
                for (let expr of factor.getArguments()) {
                    EF = EF.concat(...expr.getAllFactors());
                }
            }
        }
        return EF;
    }
    hasVariable(variable) {
        if (variable === undefined) {
            return !this.isNumeric();
        }
        for (let item of this._members) {
            if (item.member.hasVariable(variable)) {
                return true;
            }
        }
        // The variable hasn't been found !
        return false;
    }
    isZero() {
        // TODO: Must check if all the members has a value of zero
        if (this._members.length === 0) {
            return true;
        }
        for (let item of this._members) {
            if (item.member.isZero()) {
                return true;
            }
        }
        return false;
    }
    isNumeric() {
        for (let item of this._members) {
            if (!item.member.isNumeric()) {
                return false;
            }
        }
        return true;
    }
    isNumber() {
        if (this._members.length === 1) {
            if (this._members[0]?.member.factors[0] instanceof internals_1.ExpFactorNumber) {
                return this._members[0].member.factors[0].root === 1;
            }
        }
        return false;
    }
    isSingle() {
        if (this.members.length > 1) {
            return false;
        }
        else if (this.members[0]?.member.factors.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }
    isFactor() {
        return this.members.length === 1;
    }
    structure(depth) {
        let struct = [], indent = "", dftIndent = "\t";
        if (depth === undefined) {
            depth = 0;
        }
        for (let i = 0; i < depth; i++) {
            indent += dftIndent;
        }
        struct.push(`${indent}${this.constructor.name}: ${this.tex}`);
        for (let item of this._members) {
            struct.push(`${indent}${dftIndent}${item.member.constructor.name}: ${item.member.tex}`);
            for (let factor of item.member.factors) {
                struct.push(`${indent}${dftIndent}${dftIndent}${factor.constructor.name}: ${factor.tex} ; power: ${factor.power}; root: ${factor.root}`);
                if (factor.argument !== null) {
                    struct.push(factor.argument.structure(depth + 3));
                }
            }
        }
        return struct.join('\n');
    }
    reduce() {
        for (let item of this.members) {
            item.member.reduce();
        }
        return this;
    }
}
exports.Expression = Expression;
//# sourceMappingURL=expression.js.map