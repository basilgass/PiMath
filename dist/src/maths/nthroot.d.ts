export declare class Nthroot {
    private _radical;
    private _nth;
    private _coefficient;
    private _isValid;
    constructor();
    parse: (radical: number, nthroot?: number, coefficient?: number) => Nthroot;
    reduce: () => Nthroot;
    hasRadical: () => boolean;
    multiply: (N: Nthroot) => Nthroot;
    get radical(): number;
    set radical(value: number);
    get nth(): number;
    set nth(value: number);
    get coefficient(): number;
    set coefficient(value: number);
    get tex(): string;
    get value(): number;
}
