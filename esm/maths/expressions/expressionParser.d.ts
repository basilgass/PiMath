import { Expression } from "./internals";
export declare class ExpressionParser {
    private _expression;
    constructor(value: string);
    get expression(): Expression;
    private parse;
    private tokenOperationPlus;
    private tokenOperationMultiply;
    private tokenOperationDivide;
    private tokenOperationPower;
    private tokenOperationMinus;
    private tokenOperationSqrt;
    private tokenOperationRoot;
}
