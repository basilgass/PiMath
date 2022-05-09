import { ExpressionFactor } from "../expressionFactor";
import { Expression } from "../expression";
export declare class ExpFactorSin extends ExpressionFactor {
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(): string;
}
