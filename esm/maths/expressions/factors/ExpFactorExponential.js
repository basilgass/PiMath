"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorExponential = void 0;
const internals_1 = require("../internals");
class ExpFactorExponential extends internals_1.ExpressionFactor {
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX() {
        let tex = `\\text{e}^{ ${this.argument.tex} }`;
        return this.texPowerAndRoot(tex);
    }
}
exports.ExpFactorExponential = ExpFactorExponential;
//# sourceMappingURL=ExpFactorExponential.js.map