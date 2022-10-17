import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export class ExpFactorExponential extends ExpressionFactor {

    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    makeTeX(): string {
        let tex: string = `\\text{e}^{ ${ this.argument.tex } }`

        return this.texPowerAndRoot(tex)
    }

    makeDisplay(numberOfFactors?: number, position?: number): string {
        let display: string = `e^( ${ this.argument.tex } )`

        return this.displayPowerAndRoot(display)
    }

}
