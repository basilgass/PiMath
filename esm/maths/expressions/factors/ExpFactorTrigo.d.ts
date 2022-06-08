import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare enum TRIGONOMETRIC {
    sin = "sin",
    cos = "cos",
    tan = "tan",
    cot = "cot",
    asin = "asin",
    atan = "atan",
    acos = "acos",
    acot = "acot"
}
export declare class ExpFactorTrigo extends ExpressionFactor {
    private _trigo;
    constructor(trigo: string, argument: Expression, power?: number, root?: number);
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(): string;
    makeDisplay(numberOfFactors?: number, position?: number): string;
}
