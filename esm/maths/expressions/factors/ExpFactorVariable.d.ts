import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare class ExpFactorVariable extends ExpressionFactor {
    private _variable;
    constructor(value: string, power?: number, root?: number);
    get variable(): string;
    set variable(value: string);
    makeTeX(): string;
    makeDisplay(numberOfFactors?: number, position?: number): string;
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    hasVariable(variable?: string): boolean;
}
