"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpFactorVariable = void 0;
const expressionFactor_1 = require("../expressionFactor");

class ExpFactorVariable extends expressionFactor_1.ExpressionFactor {
    constructor(variable, power, root) {
        if (typeof variable !== "string") {
            throw `The variable ${variable} is not a valid value.`;
        }
        super(variable, power, root);
    }

    derivative(variable) {
        return undefined;
    }

    integrate(variable) {
        return undefined;
    }

    template() {
        // the argument is a string !
        return this.texPower(this.texRoot(`${this.argument}`));
    }
}

exports.ExpFactorVariable = ExpFactorVariable;
//# sourceMappingURL=ExpFactorVariable.js.map