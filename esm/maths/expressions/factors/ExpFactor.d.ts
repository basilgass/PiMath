import { Expression, ExpressionFactor } from "../internals";
export declare class ExpFactor extends ExpressionFactor {
    derivative(variable: string): Expression;
    integrate(variable: string): Expression;
    makeTeX(numberOfFactors?: number, position?: number): string;
    makeDisplay(numberOfFactors?: number, position?: number): string;
}
