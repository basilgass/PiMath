"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumExp = void 0;
const shutingyard_1 = require("../shutingyard");
const fraction_1 = require("../coefficients/fraction");
class NumExp {
    constructor(value, uniformize) {
        this._expression = value;
        this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.NUMERIC).parse(value, uniformize).rpn;
    }
    get rpn() {
        return this._rpn;
    }
    get isValid() {
        if (this._isValid === undefined) {
            this.evaluate({ x: 0 });
        }
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
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
        // Must modify the number if it's like:
        // a: 3.0000000000000003
        // b: 3.9999999999999994
        // remove the last character
        // check if around n last characters are either 0 or 9
        // if it is, 'round' the number.
        const epsilon = 0.00000000000001, number_of_digits = 6;
        const decimal = this._extractDecimalPart(value);
        if (decimal === '') {
            return value;
        }
        const n9 = decimal.match(/9+$/g);
        const n0 = decimal.match(/0+$/g);
        if (n9 && n9[0].length >= number_of_digits) {
            // New tested values.
            const mod = this._extractDecimalPart(value + epsilon), mod0 = mod.match(/0+$/g);
            if (mod0 && mod0[0].length >= number_of_digits) {
                // The value can be changed. Remove all zeros!
                return +((value + epsilon).toString().split(mod0[0])[0]);
            }
        }
        if (n0 && n0[0].length >= number_of_digits) {
            // New tested values.
            const mod = this._extractDecimalPart(value - epsilon), mod9 = mod.match(/9+$/g);
            if (mod9 && mod9[0].length >= number_of_digits) {
                // The value can be changed. Remove all nines!
                return +(value.toString().split(n0[0])[0]);
            }
        }
        return value;
    }
    _addToStack(stack, value) {
        stack.push(this._numberCorrection(value));
    }
    evaluate(values) {
        const stack = [];
        this.isValid = true;
        for (const element of this._rpn) {
            if (element.tokenType === shutingyard_1.ShutingyardType.COEFFICIENT) {
                // May be a numeric value or a Fraction.
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token);
                }
                else {
                    this._addToStack(stack, new fraction_1.Fraction(element.token).value);
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
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a * b);
                }
                else if (element.token === '/') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a / b);
                }
                else if (element.token === '+') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, (+a) + (+b));
                }
                else if (element.token === '-') {
                    const b = stack.pop(), a = stack.pop() || 0;
                    if (b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, a - b);
                }
                else if (element.token === '^') {
                    const b = stack.pop(), a = stack.pop();
                    if (a === undefined || b === undefined) {
                        this.isValid = false;
                    }
                    this._addToStack(stack, Math.pow(a, b));
                }
            }
            else if (element.tokenType === shutingyard_1.ShutingyardType.FUNCTION) {
                const a = stack.pop();
                if (a === undefined) {
                    this.isValid = false;
                }
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
                else if (element.token === 'nthrt') {
                    // TODO: support nthrt in num. exp.
                    let b = stack.pop();
                    if (a % 2 === 0 && b < 0) {
                        this._addToStack(stack, NaN);
                    }
                    else {
                        this._addToStack(stack, (b < 0 ? -1 : 1) * Math.pow(Math.abs(b), 1 / a));
                    }
                }
                else if (element.token === 'ln') {
                    this._addToStack(stack, Math.log(a));
                }
                else if (element.token === 'log') {
                    this._addToStack(stack, Math.log10(a));
                }
            }
        }
        if (stack.length === 1) {
            return stack[0];
        }
        else {
            throw `There was a problem parsing: ${this._expression}`;
        }
    }
}
exports.NumExp = NumExp;
//# sourceMappingURL=numexp.js.map