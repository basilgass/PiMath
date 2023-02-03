export type tokenType = {
    [key: string]: {
        precedence: number;
        associative: string;
        type: string;
    };
};
export declare const tokenConstant: {
    [Key: string]: number;
};
export declare enum ShutingyardType {
    VARIABLE = "variable",
    COEFFICIENT = "coefficient",
    OPERATION = "operation",
    CONSTANT = "constant",
    FUNCTION = "function",
    MONOM = "monom"
}
export declare enum ShutingyardMode {
    EXPRESSION = "expression",
    POLYNOM = "polynom",
    SET = "set",
    NUMERIC = "numeric"
}
export type Token = {
    token: string;
    tokenType: string;
};
export declare class Shutingyard {
    readonly _mode: ShutingyardMode;
    private _rpn;
    private _tokenConfig;
    private _tokenConstant;
    private _tokenKeys;
    private _uniformize;
    constructor(mode?: ShutingyardMode);
    get rpn(): Token[];
    get rpnToken(): string[];
    /**
     * Determin if the token is a defined operation
     * Defined operations: + - * / ^ sin cos tan
     * @param token
     */
    tokenConfigInitialization(): tokenType;
    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr: string, start: number): [string, number, string];
    normalize(expr: string): string;
    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     * @param uniformize
     */
    parse(expr: string, uniformize?: boolean): Shutingyard;
}
