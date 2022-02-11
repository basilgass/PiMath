import { Polynom } from "../algebra";
import { Fraction } from "../coefficients";
declare type Factor = {
    polynom: Polynom;
    degree: Fraction;
};
export declare class PolynomExpFactor {
    private _factors;
    private _powerAsInteger;
    constructor(...values: unknown[]);
    addFactor: (value: Factor) => PolynomExpFactor;
    multiply: (value: PolynomExpFactor) => PolynomExpFactor;
    divide: (value: PolynomExpFactor) => PolynomExpFactor;
    get factors(): {
        polynom: Polynom;
        degree: Fraction;
    }[];
    get tex(): string;
    get powerAsInteger(): boolean;
    set powerAsInteger(value: boolean);
    factorAsTex: (factor: Factor, withParenthesis?: Boolean) => string;
}
export declare class PolynomExp {
    private _factors;
    private _powerAsInteger;
    constructor(...values: unknown[]);
    addFactors: (value: PolynomExpFactor) => PolynomExp;
    get tex(): string;
    get powerAsInteger(): boolean;
    set powerAsInteger(value: boolean);
}
export {};
