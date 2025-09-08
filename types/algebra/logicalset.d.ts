export declare class LogicalSet {
    #private;
    constructor(value?: string);
    parse: (value: string) => this;
    evaluate(values: Record<string, boolean>): boolean;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get tex(): string;
    get variables(): string[];
    vennAB(): string[];
    vennABC(): string[];
}
//# sourceMappingURL=logicalset.d.ts.map