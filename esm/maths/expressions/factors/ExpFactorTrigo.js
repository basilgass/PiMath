"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpFactorTrigo = exports.TRIGONOMETRIC = void 0;
const internals_1 = require("../internals");
var TRIGONOMETRIC;
(function (TRIGONOMETRIC) {
    TRIGONOMETRIC["sin"] = "sin";
    TRIGONOMETRIC["cos"] = "cos";
    TRIGONOMETRIC["tan"] = "tan";
    TRIGONOMETRIC["cot"] = "cot";
    TRIGONOMETRIC["asin"] = "asin";
    TRIGONOMETRIC["atan"] = "atan";
    TRIGONOMETRIC["acos"] = "acos";
    TRIGONOMETRIC["acot"] = "acot";
})(TRIGONOMETRIC = exports.TRIGONOMETRIC || (exports.TRIGONOMETRIC = {}));
class ExpFactorTrigo extends internals_1.ExpressionFactor {
    constructor(trigo, argument, power, root) {
        super(argument, power, root);
        if (!(trigo in TRIGONOMETRIC)) {
            throw `The ${trigo} is not a valid trigonometric function.`;
        }
        this._trigo = trigo;
    }
    derivative(variable) {
        return undefined;
    }
    integrate(variable) {
        return undefined;
    }
    makeTeX() {
        let tex = `\\${this._trigo}`;
        if (this.root > 1) {
            tex += `^{ ${this.root} }`;
        }
        tex += `\\left( ${this.argument.tex} \\right)`;
        return this.texRoot(tex);
    }
}
exports.ExpFactorTrigo = ExpFactorTrigo;
//# sourceMappingURL=ExpFactorTrigo.js.map