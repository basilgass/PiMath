import {Expression, ExpressionFactor} from "../internals";


export class ExpFactor extends ExpressionFactor {

    derivative(variable: string): Expression {
        return undefined;
    }

    integrate(variable: string): Expression {
        return undefined;
    }

    makeTeX(numberOfFactors?: number, position?: number): string {
        // TODO: no need to wrap if it's single ?
        if (this.hasRoot() || this.hasPower()) {
            return this.texPower(this.texRoot(
                this.argument.tex
                // this.wrapWithParentheses(this.argument.tex)
            ))
        }

        if (numberOfFactors === 1) {
            return this.argument.tex
        } else {
            return this.argument.isFactor() ? this.argument.tex : this.wrapWithParentheses(this.argument.tex)
        }
    }

    makeDisplay(numberOfFactors?: number, position?: number): string {
        if (this.hasRoot() || this.hasPower()) {
            return this.displayPower(this.texRoot(
                this.wrapWithParentheses(this.argument.display, false)
            ))
        }

        return this.argument.isFactor() ? this.argument.display : this.wrapWithParentheses(this.argument.display)
    }
}