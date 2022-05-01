import {ExpressionFactor} from "../expressionFactor";
import {Expression} from "../expression";

export class ExpFactorExponential extends ExpressionFactor {

    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    template(): string {
        let tex: string = `\\text{e}^{@}`

        // The power is different from one
        if (this.power !== 1 && this.power !== -1) {
            tex += `^{${this.power}}`
        }

        // The root value is two or greater
        tex = this.texRoot(tex)

        return tex
    }
}
