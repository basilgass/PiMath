export declare class Nthroot {
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
    parse: (radical: number, nthroot?: number, coefficient?: number) => Nthroot;
    reduce: () => Nthroot;
    multiply: (N: Nthroot) => Nthroot;
    hasRadical: () => boolean;
}
