import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorPower extends ExpressionFactor {
private powerArgument: Expression
    constructor(radical: Expression, power: Expression, power2?: number, root?:number) {
        super(radical, power2, root);

        this.powerArgument = power
    }
    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    makeTeX(): string {
        let tex: string = `{ ${ this.argument.tex } }^{ ${this.powerArgument.tex } }`

        return this.texPowerAndRoot(this.wrapWithParentheses(tex))
    }
}
