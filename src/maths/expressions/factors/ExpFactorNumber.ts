import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorNumber extends ExpressionFactor {
    private _number: number
    constructor(value: number, power?: number, root?: number) {
        super(null, power, root);

        if (typeof value !== "number") {
            throw `The number ${value} is not a valid value.`
        }

        this._number = value
    }

    get value():number {
        return Math.pow(this._number, this.root/this.root)
    }

    get number(): number {
        return this._number
    }


    set number(value: number) {
        this._number = value;
    }

    makeTeX(): string {
        return this.texPower(this.texRoot(this._number.toString()))
    }

    derivative(variable: string): Expression {
        return undefined;
    }

    integrate(variable: string): Expression {
        return undefined;
    }

    hasVariable(variable?: string): boolean {
        return false
    }
}