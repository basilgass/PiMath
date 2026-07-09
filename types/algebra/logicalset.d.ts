export declare class LogicalSet {
    #private;
    constructor(value?: string);
    parse: (value: string) => this;
    get tex(): string;
    evaluate(values: Record<string, boolean>): boolean;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
    get variables(): string[];
    vennAB(): string[];
    vennABC(): string[];
}
//# sourceMappingURL=logicalset.d.ts.map