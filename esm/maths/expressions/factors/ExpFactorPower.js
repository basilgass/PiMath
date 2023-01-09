"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorPower = void 0;
const internals_1 = require("../internals");
class ExpFactorPower extends internals_1.ExpressionFactor {
    get powerArgument() {
        return this._powerArgument;
    }
    set powerArgument(value) {
        this._powerArgument = value;
    }
    constructor(radical, power, power2, root) {
        super(radical, power2, root);
        this._powerArgument = power;
    }
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX() {
        let tex = `{ ${this.argument.tex} }^{ ${this._powerArgument.tex} }`;
        return this.texPowerAndRoot(this.wrapWithParentheses(tex));
    }
    getArguments() {
        return [this.argument, this.powerArgument];
    }
    makeDisplay(numberOfFactors, position) {
        let display = `( ${this.argument.display} )^( ${this._powerArgument.display} )`;
        return this.displayPowerAndRoot(this.wrapWithParentheses(display, false));
    }
}
exports.ExpFactorPower = ExpFactorPower;
//# sourceMappingURL=ExpFactorPower.js.map