import {ExpressionFactor} from "../expressionFactor";
import {Expression} from "../expression";

export declare class ExpFactorExponential extends ExpressionFactor {
    derivative(variable: string): Expression;

    integrate(variable: string): Expression;

    template(): string;
}
