export declare class LogicalSet {
    private _rawString;
    private _rpn;
    constructor(value: string);
    get isLogicalset(): boolean;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get tex(): string;
    evaluate(tokenSets: Record<string, unknown[]>, reference?: unknown[]): unknown[];
    vennAB(): any[];
    vennABC(): any[];
    private parse;
}
//# sourceMappingURL=logicalset.d.ts.map