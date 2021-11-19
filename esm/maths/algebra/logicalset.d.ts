export declare class Logicalset {
    private _rawString;
    private _rpn;
    constructor(value: string);
    get isLogicalset(): boolean;
    private parse;
    evaluate(tokenSets: {
        [key: string]: any[];
    }, reference?: any[]): any[];
    vennAB(): any[];
    vennABC(): any[];
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get tex(): string;
}
