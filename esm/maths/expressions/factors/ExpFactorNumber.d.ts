import { Expression, ExpressionFactor } from "../internals";
export declare class ExpFactorNumber extends ExpressionFactor {
    private _number;
    constructor(value: number, power?: number, root?: number);
    get value(): number;
    get number(): number;
    set number(value: number);
    makeTeX(): string;
    makeDisplay(numberOfFactors?: number, position?: number): string;
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    hasVariable(variable?: string): boolean;
    reduce(): ExpressionFactor;
}
