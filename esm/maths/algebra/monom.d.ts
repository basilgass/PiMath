import { Fraction } from "../coefficients";
export declare type literalType = {
    [Key: string]: Fraction;
};
export declare class Monom {
    private _coefficient;
    private _literal;
    constructor(value?: unknown);
    get coefficient(): Fraction;
    set coefficient(F: Fraction);
    get literal(): literalType;
    get literalSqrt(): literalType;
    set literal(L: literalType);
    set literalStr(inputStr: string);
    get variables(): string[];
    get display(): string;
    get dividers(): Monom[];
    private _getLiteralDividers;
    get displayWithSign(): string;
    get tex(): string;
    parse: (inputStr: unknown) => Monom;
    private _shutingYardToReducedMonom;
    clone: () => Monom;
    copyLiterals: (literal: literalType) => literalType;
    makeSame: (M: Monom) => Monom;
    zero: () => Monom;
    one: () => Monom;
    clean: () => Monom;
    opposed: () => Monom;
    add: (...M: Monom[]) => Monom;
    subtract: (...M: Monom[]) => Monom;
    multiply: (...M: Monom[]) => Monom;
    multiplyByNumber: (F: Fraction | number) => Monom;
    divide: (...M: Monom[]) => Monom;
    pow: (nb: number) => Monom;
    root: (p: number) => Monom;
    sqrt: () => Monom;
    compare: (M: Monom, sign?: string) => boolean;
    isZero(): boolean;
    isOne(): boolean;
    isEqual: (M: Monom) => boolean;
    isSameAs: (M: Monom) => boolean;
    isSquare: () => boolean;
    isLiteralSquare: () => boolean;
    hasFractionCoefficient: () => boolean;
    hasLetter: (letter?: string) => boolean;
    setLetter: (letter: string, pow: Fraction | number) => void;
    degree: (letter?: string) => Fraction;
    evaluate: (values: literalType | Fraction | number) => Fraction;
    derivative: (letter?: string) => Monom;
    primitive: (letter?: string) => Monom;
    static lcm: (...monoms: Monom[]) => Monom;
    static xmultiply: (...monoms: Monom[]) => Monom;
    areSameAs: (...M: Monom[]) => boolean;
    areEquals: (...M: Monom[]) => boolean;
}
