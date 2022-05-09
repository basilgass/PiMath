"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorPower = void 0;
const internals_1 = require("../internals");
class ExpFactorPower extends internals_1.ExpressionFactor {
    constructor(radical, power, power2, root) {
        super(radical, power2, root);
        this.powerArgument = power;
    }
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX() {
        let tex = `{ ${this.argument.tex} }^{ ${this.powerArgument.tex} }`;
        return this.texPowerAndRoot(this.wrapWithParentheses(tex));
    }
}
exports.ExpFactorPower = ExpFactorPower;
//# sourceMappingURL=ExpFactorPower.js.map