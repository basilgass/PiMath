import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorPower extends ExpressionFactor {
    get powerArgument(): Expression {
        return this._powerArgument;
    }

    set powerArgument(value: Expression) {
        this._powerArgument = value;
    }

    private _powerArgument: Expression
    constructor(radical: Expression, power: Expression, power2?: number, root?:number) {
        super(radical, power2, root);

        this._powerArgument = power
    }
    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    makeTeX(): string {
        let tex: string = `{ ${ this.argument.tex } }^{ ${this._powerArgument.tex } }`

        return this.texPowerAndRoot(this.wrapWithParentheses(tex))
    }

    getArguments(): Expression[] {
        return [this.argument, this.powerArgument]
    }

    makeDisplay(numberOfFactors?: number, position?: number): string {
        let display: string = `( ${ this.argument.display } )^( ${this._powerArgument.display } )`

        return this.displayPowerAndRoot(this.wrapWithParentheses(display, false))
    }
}
