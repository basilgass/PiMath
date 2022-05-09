import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare class ExpFactorExponential extends ExpressionFactor {
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(): string;
}
