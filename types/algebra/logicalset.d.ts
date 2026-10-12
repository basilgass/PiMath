import type { IPiMathObject } from "../pimath.interface";
interface RpnToken {
    token: string;
    tokenType: string;
}
export declare class LogicalSet implements IPiMathObject<LogicalSet> {
    #private;
    constructor(value?: string);
    static fromString(value: string): LogicalSet;
    parse(value: string): this;
    clone(): LogicalSet;
    copy(value: LogicalSet): this;
    withUniverse(name: string): this;
    get tex(): string;
    get display(): string;
    evaluate(values: Record<string, boolean>): boolean;
    get rpn(): RpnToken[];
    get variables(): string[];
    venn(...variables: string[]): string[];
    vennAB(): string[];
    vennABC(): string[];
}
export {};
//# sourceMappingURL=logicalset.d.ts.map