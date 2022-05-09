import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare class ExpFactorPower extends ExpressionFactor {
    private powerArgument;
    constructor(radical: Expression, power: Expression, power2?: number, root?: number);
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(): string;
}
