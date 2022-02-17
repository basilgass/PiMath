export declare class NumExp {
    private _rpn;
    private _expression;
    private _isValid;
    constructor(value: string);
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get isValid(): boolean;
    set isValid(value: boolean);
    get expression(): string;
    private _extractDecimalPart;
    private _numberCorrection;
    private _addToStack;
    evaluate(values: {
        [Key: string]: number;
    }): number;
}
