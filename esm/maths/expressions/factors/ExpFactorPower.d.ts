import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare class ExpFactorPower extends ExpressionFactor {
    get powerArgument(): Expression;
    set powerArgument(value: Expression);
    private _powerArgument;
    constructor(radical: Expression, power: Expression, power2?: number, root?: number);
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(): string;
    getArguments(): Expression[];
    makeDisplay(numberOfFactors?: number, position?: number): string;
}
