import {Expression, ExpressionFactor} from "../internals";

export class ExpFactorNumber extends ExpressionFactor {
    private _number: number

    constructor(value: number, power?: number, root?: number) {
        super(null, power, root);

        if (typeof value !== "number") {
            throw `The number ${value} is not a valid value.`
        }

        this._number = value
    }

    get value(): number {
        return Math.pow(this._number, this.root / this.root)
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

    makeDisplay(numberOfFactors?: number, position?: number): string {
        return this.displayPower(this.displayRoot(this._number.toString()))
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

    reduce(): ExpressionFactor {
        // Reduce the power / root value
        super.reduce()

        if (this.power > 1) {
            this.number = this.number ** this.power
            this.power = 1
        }
        if (this.power < -1) {
            this.number = this.number ** (-this.power)
            this.power = -1
        }

        if(this.root>1){
            // Maybe it's a perfect root ?
            if(Number.isSafeInteger(Math.pow(this.number, 1/this.root))){
                this.number = Math.pow(this.number, 1/this.root)
                this.root = 1
            }
        }

        return this
    }
}