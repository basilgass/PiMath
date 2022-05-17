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
        // TODO: no need to wrap if it's single ?
        if (this.hasRoot() || this.hasPower()) {
            return this.texPower(this.texRoot(this.argument.tex
            // this.wrapWithParentheses(this.argument.tex)
            ));
        }
        if (numberOfFactors === 1) {
            return this.argument.tex;
        }
        else {
            return this.argument.isFactor() ? this.argument.tex : this.wrapWithParentheses(this.argument.tex);
        }
    }
    makeDisplay(numberOfFactors, position) {
        if (this.hasRoot() || this.hasPower()) {
            return this.displayPower(this.texRoot(this.wrapWithParentheses(this.argument.display, false)));
        }
        return this.argument.isFactor() ? this.argument.display : this.wrapWithParentheses(this.argument.display);
    }
}
exports.ExpFactor = ExpFactor;
//# sourceMappingURL=ExpFactor.js.map