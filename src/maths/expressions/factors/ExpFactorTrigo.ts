import {Expression} from "../internals";
import {ExpressionFactor} from "../internals";

export enum TRIGONOMETRIC {
    sin='sin',
    cos='cos',
    tan='tan',
    cot='cot',
    asin='asin',
    atan='atan',
    acos='acos',
    acot='acot'
}
export class ExpFactorTrigo extends ExpressionFactor {
    private _trigo: string
    constructor(trigo: string, argument: Expression, power?: number, root?: number) {

        super(argument, power, root);

        if(! (trigo in TRIGONOMETRIC)){
            throw `The ${ trigo } is not a valid trigonometric function.`
        }

        this._trigo = trigo
    }
    derivative(variable: string): Expression {
        return undefined
    }

    integrate(variable: string): Expression {
        return undefined
    }

    makeTeX(): string {
        let tex = `\\${this._trigo}`
        if(this.root>1){
            tex += `^{ ${this.root} }`
        }

        tex+= `\\left( ${this.argument.tex} \\right)`
        return this.texRoot(tex);
    }

    makeDisplay(numberOfFactors?: number, position?: number): string {
        let display = `${this._trigo}`
        if(this.root>1){
            display += `^( ${this.root} )`
        }

        display+= `( ${this.argument.display} )`
        return this.displayRoot(display);
    }
}
