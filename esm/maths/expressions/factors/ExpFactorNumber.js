"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ExpFactorNumber = void 0;
const expressionFactor_1 = require("../expressionFactor");

class ExpFactorNumber extends expressionFactor_1.ExpressionFactor {
    constructor(variable, power, root) {
        if (typeof variable !== "number") {
            throw `The number ${variable} is not a valid value.`;
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

exports.ExpFactorNumber = ExpFactorNumber;
//# sourceMappingURL=ExpFactorNumber.js.map