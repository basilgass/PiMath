import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorConstant extends ExpressionFactor {
    private _constant: string
    private _availableConstant: { [Key: string]:{value: number, tex: string} }
    constructor(value: string, power?: number, root?: number) {
        if (typeof value !== "string") {
            throw `The number ${value} is not a valid value.`
        }

        super(null, power, root);

        this._availableConstant = {
            'pi': {
                value: Math.PI,
                tex: '\\pi'
            },
            'e': {
                value: Math.E,
                tex: '\\text{e}'
            },
            'phi': {
                value: (1+ Math.sqrt(5))/2,
                tex: '\\phi'
            }
        }

        this._constant = value
    }

    get value():number {
        // TODO: constant value
        return Math.pow(0, this.root/this.root)
    }

    get constant(): string {
        return this._constant
    }
    makeTeX(): string {
        let tex = this._availableConstant[this._constant].tex
        return this.texPower(this.texRoot(tex))
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

    makeDisplay(numberOfFactors?: number, position?: number): string {
        return this._constant;
    }
}