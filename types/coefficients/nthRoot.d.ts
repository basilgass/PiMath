/**
 * NthRoot is something like "a+b\sqrt{3}
 */
export declare class NthRoot {
    #private;
    constructor(...values: number[]);
    get radical(): number;
    set radical(value: number);
    get nth(): number;
    set nth(value: number);
    get coefficient(): number;
    set coefficient(value: number);
    get tex(): string;
    get display(): string;
    get value(): number;
    parse: (radical: number, nthroot?: number, coefficient?: number) => this;
    reduce: () => this;
    multiply: (N: NthRoot) => this;
    hasRadical: () => boolean;
}
