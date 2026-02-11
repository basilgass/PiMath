/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
export declare class LogicalSet {
    #private;
    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
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
