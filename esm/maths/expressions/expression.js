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
                struct.push(`${indent}${dftIndent}${dftIndent}${factor.constructor.name}: ${factor.tex}`);
                if (factor.argument !== null) {
                    struct.push(factor.argument.structure(depth + 3));
                }
            }
        }
        return struct.join('\n');
    }
}
exports.Expression = Expression;
//# sourceMappingURL=expression.js.map