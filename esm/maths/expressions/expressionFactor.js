"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpressionFactor = void 0;
const expression_1 = require("./expression");

class ExpressionFactor {
    constructor(_argument, _power, _root) {
        this._argument = _argument;
        this._power = _power;
        this._root = _root;
        if (this._power === undefined) {
            this._power = 1;
        }
        if (this._root === undefined) {
            this._root = 1;
        }
    }

    get tex() {
        return this.template().replace('@', this.texArgument);
    }

    get texArgument() {
        if (this._argument instanceof expression_1.Expression) {
            return this._argument.tex;
        } else {
            return this._argument.toString();
        }
    }

    get power() {
        return this._power;
    }

    set power(value) {
        if (!Number.isSafeInteger(value)) {
            throw `Power value (${value}) is not a safe integer`;
        }
        this._power = value;
    }

    get root() {
        return this._root;
    }

    set root(value) {
        if (!Number.isSafeInteger(value)) {
            throw `Root value (${value}) is not a safe integer`;
        }
        this._root = value;
    }

    get argument() {
        return this._argument;
    }

    set argument(value) {
        this._argument = value;
    }

    hasVariable(variable) {
        // The argument is an Expression
        if (this._argument instanceof expression_1.Expression) {
            return this._argument.hasVariable(variable);
        }
        // The argument is either a number (falsy) or a string (might be truthy)
        return variable === this._argument;
    }

    isZero() {
        if (this._argument instanceof expression_1.Expression) {
            return this._argument.isZero();
        }
        return this._argument === 0;
    }

    texPower(tex) {
        if (this.power !== 1 && this.power !== -1) {
            return `${tex}^{ ${Math.abs(this.power)} }`;
        }
    }

    texRoot(tex) {
        if (this.root === 2) {
            return `\\sqrt{ ${tex} }`;
        } else if (this.root > 2) {
            return `\\sqrt[${this.root}]{ ${tex} }`;
        }
        return tex;
    }
}

exports.ExpressionFactor = ExpressionFactor;
//# sourceMappingURL=expressionFactor.js.map