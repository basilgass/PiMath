"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpFactorSin = void 0;
const expressionFactor_1 = require("../expressionFactor");

class ExpFactorSin extends expressionFactor_1.ExpressionFactor {
    derivative(variable) {
        return undefined;
    }

    integrate(variable) {
        return undefined;
    }

    template() {
        let tex = `\\sin`;
        // The power is different from one
        if (this.power !== 1 && this.power !== -1) {
            tex += `^{${this.power}}`;
        }
        tex += `(@)`;
        // The root value is two or greater
        tex = this.texRoot(tex);
        return tex;
    }
}

exports.ExpFactorSin = ExpFactorSin;
//# sourceMappingURL=ExpFactorSin.js.map