"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorSin = void 0;
const expressionFactor_1 = require("../expressionFactor");
class ExpFactorSin extends expressionFactor_1.ExpressionFactor {
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX() {
        let tex = "\\sin";
        if (this.root > 1) {
            tex += `^{ ${this.root} }`;
        }
        tex += `\\left( ${this.argument.tex} \\right)`;
        return this.texRoot(tex);
    }
}
exports.ExpFactorSin = ExpFactorSin;
//# sourceMappingURL=ExpFactorSin.js.map