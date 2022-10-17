"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpFactorExponential = void 0;
const expressionFactor_1 = require("../expressionFactor");

class ExpFactorExponential extends expressionFactor_1.ExpressionFactor {
    derivative(variable) {
        return undefined;
    }

    integrate(variable) {
        return undefined;
    }

    template() {
        let tex = `\\text{e}^{@}`;
        // The power is different from one
        if (this.power !== 1 && this.power !== -1) {
            tex += `^{${this.power}}`;
        }
        // The root value is two or greater
        tex = this.texRoot(tex);
        return tex;
    }
}

exports.ExpFactorExponential = ExpFactorExponential;
//# sourceMappingURL=ExpFactorExponential.js.map