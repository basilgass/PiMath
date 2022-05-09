"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorConstant = void 0;
const internals_1 = require("../internals");
class ExpFactorConstant extends internals_1.ExpressionFactor {
    constructor(value, power, root) {
        if (typeof value !== "string") {
            throw `The number ${value} is not a valid value.`;
        }
        super(null, power, root);
        this._availableConstant = {
            'pi': {
                value: Math.PI,
                tex: '\\pi'
            },
            'e': {
                value: Math.E,
                tex: '\\text{e}'
            },
            'phi': {
                value: (1 + Math.sqrt(5)) / 2,
                tex: '\\phi'
            }
        };
        this._constant = value;
    }
    get value() {
        // TODO: constant value
        return Math.pow(0, this.root / this.root);
    }
    get constant() {
        return this._constant;
    }
    makeTeX() {
        let tex = this._availableConstant[this._constant].tex;
        return this.texPower(this.texRoot(tex));
    }
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    hasVariable(variable) {
        return false;
    }
}
exports.ExpFactorConstant = ExpFactorConstant;
//# sourceMappingURL=ExpFactorConstant.js.map