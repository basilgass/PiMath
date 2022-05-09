"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactor = void 0;
const internals_1 = require("../internals");
class ExpFactor extends internals_1.ExpressionFactor {
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX(numberOfFactors, position) {
        // If there is a root value, no need to make further checks
        // TODO: no need to wrap if it's single ?
        if (this.hasRoot() || this.hasPower()) {
            return this.texPower(this.texRoot(this.wrapWithParentheses(this.argument.tex)));
        }
        return this.argument.isFactor() ? this.argument.tex : this.wrapWithParentheses(this.argument.tex);
    }
}
exports.ExpFactor = ExpFactor;
//# sourceMappingURL=ExpFactor.js.map