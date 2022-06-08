/**
 * NthRoot is something like "a+b\sqrt{3}
 */
export declare class NthRoot {
    private _radical;
    private _nth;
    private _coefficient;
    private _isValid;
    constructor(...values: number[]);
    get radical(): number;
    set radical(value: number);
    get nth(): number;
    set nth(value: number);
    get coefficient(): number;
    set coefficient(value: number);
    get tex(): string;
    get value(): number;
    parse: (radical: number, nthroot?: number, coefficient?: number) => NthRoot;
    reduce: () => NthRoot;
    multiply: (N: NthRoot) => NthRoot;
    hasRadical: () => boolean;
}
