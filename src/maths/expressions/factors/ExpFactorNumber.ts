import {ExpressionFactor} from "../ExpressionFactor";
import {Expression} from "../expression";


export class ExpFactorNumber extends ExpressionFactor {
    constructor(variable: number, power?: number, root?: number) {
        if (typeof variable !== "number") {
            throw `The number ${variable} is not a valid value.`
        }

        super(variable, power, root);
    }

    derivative(variable: string): Expression {
        return undefined;
    }

    integrate(variable: string): Expression {
        return undefined;
    }

    template(): string {
        // the argument is a string !
        return this.texPower(this.texRoot(`${this.argument}`))
    }
}