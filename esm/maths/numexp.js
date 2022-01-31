"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumExp = void 0;
const shutingyard_1 = require("./shutingyard");
const coefficients_1 = require("./coefficients");
class NumExp {
    _rpn;
    _expression;
    constructor(value) {
        this._expression = value;
        this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.NUMERIC).parse(value).rpn;
    }
    get rpn() {
        return this._rpn;
    }
    get expression() {
        return this._expression;
    }
    _extractDecimalPart(value) {
        let decimal = value.toString();
        if (!decimal.includes('.')) {
            return '';
        }
        decimal = decimal.split('.')[1];
        return decimal.substring(0, decimal.length - 2);
    }
    _numberCorrection(value) {
        const epsilon = 0.00000000000001, number_of_digits = 6;
        let decimal = this._extractDecimalPart(value);
        if (decimal === '') {
            return value;
        }
        const n9 = decimal.match(/9+$/g);
        const n0 = decimal.match(/0+$/g);
        if (n9 && n9[0].length >= number_of_digits) {
            let mod = this._extractDecimalPart(value + epsilon), mod0 = mod.match(/0+$/g);
            if (mod0 && mod0[0].length >= number_of_digits) {
                return +((value + epsilon).toString().split(mod0[0])[0]);
            }
        }
        if (n0 && n0[0].length >= number_of_digits) {
            let mod = this._extractDecimalPart(value - epsilon), mod9 = mod.match(/9+$/g);
            if (mod9 && mod9[0].length >= number_of_digits) {
                return +(value.toString().split(n0[0])[0]);
            }
        }
        return value;
    }
    _addToStack(stack, value) {
        stack.push(this._numberCorrection(value));
    }
    evaluate(values) {
        let stack = [];
        for (const element of this._rpn) {
            if (element.tokenType === shutingyard_1.ShutingyardType.COEFFICIENT) {
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token);
                }
                else {
                    this._addToStack(stack, new coefficients_1.Fraction(element.token).value);
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.VARIABLE) {
                if (values[element.token] !== undefined) {
                    this._addToStack(stack, +values[element.token]);
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.CONSTANT) {
                this._addToStack(stack, shutingyard_1.tokenConstant[element.token]);
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.OPERATION) {
                if (element.token === '*') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a * b);
                }
                else if (element.token === '/') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a / b);
                }
                else if (element.token === '+') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, a + b);
                }
                else if (element.token === '-') {
                    const b = +stack.pop(), a = +stack.pop() || 0;
                    this._addToStack(stack, a - b);
                }
                else if (element.token === '^') {
                    const b = +stack.pop(), a = +stack.pop();
                    this._addToStack(stack, Math.pow(a, b));
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.FUNCTION) {
                const a = +stack.pop();
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a));
                }
                else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a));
                }
                else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a));
                }
                else if (element.token === 'sqrt') {
                    this._addToStack(stack, Math.sqrt(a));
                }
            }
        }
        if (stack.length === 1) {
            return stack[0];
        }
        else {
            console.error('There was a problem parsing', this._expression, '. The RPN array is', this._rpn);
            return 0;
        }
    }
}
exports.NumExp = NumExp;
//# sourceMappingURL=numexp.js.map