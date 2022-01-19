import { Polynom } from "./polynom";
import { Fraction } from "../coefficients";
export declare class Rational {
    private _rawString;
    private _numerator;
    private _denominator;
    constructor(numerator?: Polynom, denominator?: Polynom);
    clone: () => Rational;
    get tex(): string;
    get texFactors(): string;
    get numerator(): Polynom;
    get denominator(): Polynom;
    domain: () => string;
    amplify: (P: Polynom) => Rational;
    simplify: (P: Polynom) => Rational;
    reduce: () => Rational;
    opposed: () => Rational;
    add: (R: Rational) => Rational;
    subtract: (R: Rational) => Rational;
    limits: (value: Fraction | number, letter?: string) => Fraction | number;
}
