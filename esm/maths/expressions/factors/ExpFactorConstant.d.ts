import { Expression } from "../internals";
import { ExpressionFactor } from "../internals";
export declare class ExpFactorConstant extends ExpressionFactor {
    private _constant;
    private _availableConstant;
    constructor(value: string, power?: number, root?: number);
    get value(): number;
    get constant(): string;
    makeTeX(): string;
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    hasVariable(variable?: string): boolean;
    makeDisplay(numberOfFactors?: number, position?: number): string;
}
