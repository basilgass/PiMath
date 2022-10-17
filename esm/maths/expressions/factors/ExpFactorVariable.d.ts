import {ExpressionFactor} from "../expressionFactor";
import {Expression} from "../expression";

export declare class ExpFactorVariable extends ExpressionFactor {
    constructor(variable: string, power?: number, root?: number);

    derivative(variable: string): Expression;

    integrate(variable: string): Expression;

    template(): string;
}
