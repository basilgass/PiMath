"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFactor = void 0;
const internals_1 = require("./internals");
const numeric_1 = require("../numeric");
class ExpressionFactor {
    constructor(_argument, _power, _root, _inline) {
        this._argument = _argument;
        this._power = _power;
        this._root = _root;
        this._inline = _inline;
        if (this._power === undefined) {
            this._power = 1;
        }
        if (this._root === undefined) {
            this._root = 1;
        }
        if (this._inline === undefined) {
            this._inline = false;
        }
    }
    get inline() {
        return this._inline;
    }
    set inline(value) {
        this._inline = value;
    }
    get tex() {
        return this.makeTeX();
    }
    get display() {
        return this.makeDisplay();
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
    getArguments() {
        if (this._argument !== null) {
            return [this.argument];
        }
        return [];
    }
    hasVariable(variable) {
        if (variable === undefined) {
            return !this.isNumeric();
        }
        // The argument is an Expression
        if (this._argument instanceof internals_1.Expression) {
            return this._argument.hasVariable(variable);
        }
        return false;
    }
    isNumeric() {
        for (let expressionArgument of this.getArguments()) {
            if (!expressionArgument.isNumeric()) {
                return false;
            }
        }
        return true;
    }
    hasRoot() {
        return this.root > 1;
    }
    hasPower(inline) {
        if (inline === true) {
            return !(this.power === 1);
        }
        else {
            return !(this.power === 1 || this.power === -1);
        }
    }
    texPowerAndRoot(tex) {
        return this.texPower(this.texRoot(tex));
    }
    displayPowerAndRoot(display) {
        return this.displayPower(this.displayRoot(display));
    }
    displayPower(display) {
        if (this.hasPower(this.inline)) {
            return `${display}^(${Math.abs(this.power)})`;
        }
        return display;
    }
    displayRoot(display) {
        if (this.root === 2) {
            return `sqrt( ${display} )`;
        }
        else if (this.root > 2) {
            return `nthrt(${display},${this.root})`;
        }
        return display;
    }
    texPower(tex) {
        if (this.hasPower(this.inline)) {
            return `${tex}^{ ${Math.abs(this.power)} }`;
        }
        return tex;
    }
    wrapWithParentheses(tex, asTex) {
        if (asTex === undefined || asTex === true) {
            return `\\left( ${tex} \\right)`;
        }
        else {
            return `( ${tex} )`;
        }
    }
    texRoot(tex) {
        if (this.root === 2) {
            return `\\sqrt{ ${tex} }`;
        }
        else if (this.root > 2) {
            return `\\sqrt[${this.root}]{ ${tex} }`;
        }
        return tex;
    }
    isZero() {
        if (this._argument instanceof internals_1.Expression) {
            return this._argument.isZero();
        }
        return this._argument === 0;
    }
    reduce() {
        let gcd = numeric_1.Numeric.gcd(this.root, this.power);
        if (gcd > 1) {
            this.root = this.root / gcd;
            this.power = this.power / gcd;
        }
        for (let expressionArgument of this.getArguments()) {
            expressionArgument.reduce();
        }
        return this;
    }
}
exports.ExpressionFactor = ExpressionFactor;
//# sourceMappingURL=expressionFactor.js.map