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
    get display(): string;
    get value(): number;
    parse: (radical: number, nthroot?: number, coefficient?: number) => this;
    reduce: () => this;
    multiply: (N: NthRoot) => this;
    hasRadical: () => boolean;
}
//# sourceMappingURL=nthRoot.d.ts.map