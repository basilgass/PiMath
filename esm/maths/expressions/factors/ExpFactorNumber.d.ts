import {ExpressionFactor} from "../expressionFactor";
import {Expression} from "../expression";

export declare class ExpFactorNumber extends ExpressionFactor {
    constructor(variable: number, power?: number, root?: number);

    derivative(variable: string): Expression;

    integrate(variable: string): Expression;

    template(): string;
}
