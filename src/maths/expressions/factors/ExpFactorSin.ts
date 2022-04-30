import {ExpressionFactor} from "../ExpressionFactor";
import {Expression} from "../expression";

export class ExpFactorSin extends ExpressionFactor {

    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    template(): string {
        let tex: string = `\\sin`

        // The power is different from one
        if (this.power !== 1 && this.power !== -1) {
            tex += `^{${this.power}}`
        }

        // The root value is two or greater
        tex = this.texRoot(tex)

        return tex
    }
}
