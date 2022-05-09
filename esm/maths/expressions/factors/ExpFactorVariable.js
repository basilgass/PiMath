"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorVariable = void 0;
const internals_1 = require("../internals");
class ExpFactorVariable extends internals_1.ExpressionFactor {
    constructor(value, power, root) {
        super(null, power, root);
        if (typeof value !== "string") {
            throw `The variable ${value} is not a valid value.`;
        }
        this._variable = value;
    }
    get variable() {
        return this._variable;
    }
    set variable(value) {
        this._variable = value;
    }
    makeTeX() {
        return this.texPower(this.texRoot(this._variable));
    }
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    hasVariable(variable) {
        return this._variable === variable;
    }
}
exports.ExpFactorVariable = ExpFactorVariable;
//# sourceMappingURL=ExpFactorVariable.js.map