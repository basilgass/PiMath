import { Expression } from "./expression";
export declare class expressionOperators {
    static reduce(expr: Expression): Expression;
    static add(...values: Expression[]): Expression;
    static subtract(a: Expression, b: Expression): Expression;
    static multiply(...values: Expression[]): Expression;
    static divide(a: Expression, b: Expression): Expression;
}
