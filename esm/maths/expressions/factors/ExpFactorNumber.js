"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorNumber = void 0;
const internals_1 = require("../internals");
class ExpFactorNumber extends internals_1.ExpressionFactor {
    constructor(value, power, root) {
        super(null, power, root);
        if (typeof value !== "number") {
            throw `The number ${value} is not a valid value.`;
        }
        this._number = value;
    }
    get value() {
        return Math.pow(this._number, this.root / this.root);
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    makeTeX() {
        return this.texPower(this.texRoot(this._number.toString()));
    }
    makeDisplay(numberOfFactors, position) {
        return this.displayPower(this.displayRoot(this._number.toString()));
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
    reduce() {
        // Reduce the power / root value
        super.reduce();
        if (this.power > 1) {
            this.number = this.number ** this.power;
            this.power = 1;
        }
        if (this.power < -1) {
            this.number = this.number ** (-this.power);
            this.power = -1;
        }
        if (this.root > 1) {
            // Maybe it's a perfect root ?
            if (Number.isSafeInteger(Math.pow(this.number, 1 / this.root))) {
                this.number = Math.pow(this.number, 1 / this.root);
                this.root = 1;
            }
        }
        return this;
    }
}
exports.ExpFactorNumber = ExpFactorNumber;
//# sourceMappingURL=ExpFactorNumber.js.map