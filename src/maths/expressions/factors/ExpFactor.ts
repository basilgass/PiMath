import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";


export class ExpFactor extends ExpressionFactor {

    derivative(variable: string): Expression {
        return undefined;
    }

    integrate(variable: string): Expression {
        return undefined;
    }

    makeTeX(numberOfFactors?: number, position?: number): string {
        // If there is a root value, no need to make further checks
        // TODO: no need to wrap if it's single ?
        if(this.hasRoot() || this.hasPower()){
            return this.texPower(this.texRoot(
                this.wrapWithParentheses(this.argument.tex)
            ))
        }

        return this.argument.isFactor() ? this.argument.tex: this.wrapWithParentheses(this.argument.tex)
    }
}