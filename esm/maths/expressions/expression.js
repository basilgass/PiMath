"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.Expression = void 0;

class Expression {
    constructor() {
        this._members = [];
    }

    get tex() {
        return '';
    }

    get members() {
        return this._members;
    }

    set members(value) {
        this._members = value;
    }

    addMembers(...values) {
        for (let value of values) {
            this._members.push(value);
        }
        return this;
    }

    hasVariable(variable) {
        for (let member of this._members) {
            if (member.hasVariable(variable)) {
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
        for (let member of this._members) {
            if (member.isZero()) {
                return true;
            }
        }
        return false;
    }
}

exports.Expression = Expression;
//# sourceMappingURL=expression.js.map