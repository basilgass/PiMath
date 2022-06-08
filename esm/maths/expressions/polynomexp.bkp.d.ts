import { Polynom } from "../algebra/polynom";
import { Fraction } from "../coefficients/fraction";
declare type Factor = {
    polynom: Polynom;
    degree: Fraction;
};
export declare function isFactor(value: any): value is Factor;
export declare class PolynomExpFactor {
    constructor(...values: unknown[]);
    private _factors;
    get factors(): Factor[];
    private _powerAsInteger;
    get powerAsInteger(): boolean;
    set powerAsInteger(value: boolean);
    get tex(): string;
    addFactor: (value: Factor) => PolynomExpFactor;
    multiply: (value: PolynomExpFactor) => PolynomExpFactor;
    divide: (value: PolynomExpFactor) => PolynomExpFactor;
    derivative: (letter: string) => PolynomExp;
    private _factorDerivative;
    private _factorAsTex;
}
export declare class PolynomExp {
    private _factors;
    constructor(...values: PolynomExpFactor[]);
    private _powerAsInteger;
    get powerAsInteger(): boolean;
    set powerAsInteger(value: boolean);
    get tex(): string;
    add: (value: PolynomExpFactor) => PolynomExp;
    subtract: (value: PolynomExpFactor) => PolynomExp;
}
export {};
