import {Shutingyard, ShutingyardMode, ShutingyardType, tokenConstant} from "./shutingyard";
import {Fraction} from "./coefficients";

export class NumExp {
    private _rpn: { token: string, tokenType: string }[]
    private _expression: string

    constructor(value: string) {
        this._expression = value
        this._rpn = new Shutingyard(ShutingyardMode.NUMERIC).parse(value).rpn
    }

    get rpn(): { token: string; tokenType: string }[] {
        return this._rpn;
    }

    get expression(): string {
        return this._expression;
    }

    private _extractDecimalPart(value: number): string {
        let decimal = value.toString()

        if (!decimal.includes('.')) {
            return ''
        }

        decimal = decimal.split('.')[1]

        return decimal.substring(0, decimal.length - 2)
    }

    private _numberCorrection(value: number): number {
        // Must modify the number if it's like:
        // a: 3.0000000000000003
        // b: 3.9999999999999994
        // remove the last character
        // check if around n last characters are either 0 or 9
        // if it is, 'round' the number.

        const epsilon = 0.00000000000001,
            number_of_digits = 6

        let decimal = this._extractDecimalPart(value)
        if(decimal===''){return value}

        const n9 = decimal.match(/9+$/g)
        const n0 = decimal.match(/0+$/g)

        if (n9 && n9[0].length >= number_of_digits) {
            // New tested values.
            let mod = this._extractDecimalPart(value + epsilon),
                mod0 = mod.match(/0+$/g)

            if(mod0 && mod0[0].length>= number_of_digits){
                // The value can be changed. Remove all zeros!
                return +((value+epsilon).toString().split(mod0[0])[0])
            }
        }

        if (n0 && n0[0].length >= number_of_digits) {
            // New tested values.
            let mod = this._extractDecimalPart(value - epsilon),
                mod9 = mod.match(/9+$/g)

            if(mod9 && mod9[0].length>= number_of_digits){
                // The value can be changed. Remove all nines!
                return +(value.toString().split(n0[0])[0])
            }
        }

        return value
    }

    private _addToStack(stack:number[], value: number): void {
        stack.push(this._numberCorrection(value))
    }

    evaluate(values: { [Key: string]: number }): number {
        let stack: number[] = []
        for (const element of this._rpn) {
            if (element.tokenType === ShutingyardType.COEFFICIENT) {
                // May be a numeric value or a Fraction.
                if (!isNaN(+element.token)) {
                    this._addToStack(stack, +element.token)
                } else {
                    this._addToStack(stack, new Fraction(element.token).value)
                }
            } else if (element.tokenType === ShutingyardType.VARIABLE) {
                if (values[element.token] !== undefined) {
                    this._addToStack(stack, +values[element.token])
                }
            } else if (element.tokenType === ShutingyardType.CONSTANT) {
                this._addToStack(stack, tokenConstant[element.token])
            } else if (element.tokenType === ShutingyardType.OPERATION) {
                if (element.token === '*') {
                    const b = +stack.pop(),
                        a = +stack.pop()
                    this._addToStack(stack, a * b)
                } else if (element.token === '/') {
                    const b = +stack.pop(),
                        a = +stack.pop()
                    this._addToStack(stack, a / b)
                } else if (element.token === '+') {
                    const b = +stack.pop(),
                        a = +stack.pop()
                    this._addToStack(stack, a + b)
                } else if (element.token === '-') {
                    const b = +stack.pop(),
                        a = +stack.pop()
                    this._addToStack(stack, a - b)
                } else if (element.token === '^') {
                    const b = +stack.pop(),
                        a = +stack.pop()
                    this._addToStack(stack, Math.pow(a, b))
                }
            } else if (element.tokenType === ShutingyardType.FUNCTION) {
                const a = +stack.pop()
                if (element.token === 'sin') {
                    this._addToStack(stack, Math.sin(a))
                } else if (element.token === 'cos') {
                    this._addToStack(stack, Math.cos(a))
                } else if (element.token === 'tan') {
                    this._addToStack(stack, Math.tan(a))
                } else if(element.token === 'sqrt') {
                    this._addToStack(stack, Math.sqrt(a))
                }
            }
        }

        if (stack.length === 1) {
            return stack[0]
        } else {
            console.error('There was a problem parsing', this._expression, '. The RPN array is', this._rpn)
            return 0
        }
    }
}
