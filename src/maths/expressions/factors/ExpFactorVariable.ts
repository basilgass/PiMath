import {ExpressionFactor} from "../expressionFactor";
import {Expression} from "../expression";


export class ExpFactorVariable extends ExpressionFactor {
    constructor(variable: string, power?: number, root?: number) {
        if (typeof variable !== "string") {
            throw `The variable ${variable} is not a valid value.`
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