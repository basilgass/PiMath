import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorVariable extends ExpressionFactor {
    private _variable: string
    constructor(value: string, power?: number, root?: number) {
        super(null, power, root);

        if (typeof value !== "string") {
            throw `The variable ${value} is not a valid value.`
        }

        this._variable = value
    }


    get variable(): string {
        return this._variable;
    }

    set variable(value: string) {
        this._variable = value;
    }

    makeTeX(): string {
        return this.texPower(this.texRoot(this._variable))
    }

    makeDisplay(numberOfFactors?: number, position?: number): string {
        return this.displayPower(this.displayRoot(this._variable))
    }


    derivative(variable: string): Expression {
        return undefined;
    }

    integrate(variable: string): Expression {
        return undefined;
    }

    hasVariable(variable?: string): boolean {
        return this._variable === variable
    }
}