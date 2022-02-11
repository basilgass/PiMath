export declare type tokenType = {
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
    POLYNOM = "polynom",
    SET = "set",
    NUMERIC = "numeric"
}
export declare class Shutingyard {
    private _rpn;
    readonly _mode: ShutingyardMode;
    private _tokenConfig;
    private _tokenConstant;
    private _uniformize;
    private _tokenKeys;
    constructor(mode?: ShutingyardMode);
    tokenConfigInitialization(): tokenType;
    NextToken(expr: string, start: number): [string, number, string];
    Uniformizer(expr: string): string;
    parse(expr: string, operators?: string[]): Shutingyard;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
}
