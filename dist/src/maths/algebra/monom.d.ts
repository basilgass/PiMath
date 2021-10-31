import { Fraction } from "../coefficients/fraction";
export declare class Monom {
    private _coefficient;
    private _literal;
    constructor(value?: string);
    get isMonom(): boolean;
    get coefficient(): Fraction;
    set coefficient(F: Fraction);
    get literal(): {
        [Key: string]: number;
    };
    get literalSqrt(): {
        [Key: string]: number;
    };
    set literal(L: {
        [Key: string]: number;
    });
    set literalStr(inputStr: string);
    get variables(): string[];
    get display(): string;
    get dividers(): Monom[];
    private _getLitteralDividers;
    get displayWithSign(): string;
    get tex(): string;
    parse: (inputStr: string) => Monom;
    clone: () => Monom;
    zero: () => Monom;
    one: () => Monom;
    clean: () => Monom;
    random: (letters?: string, degree?: number, withFraction?: boolean, allowZero?: boolean) => Monom;
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
    isLitteralSquare: () => boolean;
    hasLetter: (letter?: string) => boolean;
    setLetter: (letter: string, pow: number) => void;
    degree: (letter?: string) => number;
    evaluate: (values: number | Fraction | {
        [key: string]: number | Fraction;
    }) => Fraction;
    derivative: (letter?: string) => Monom;
    primitive: (letter?: string) => Monom;
    static lcm: (...monoms: Monom[]) => Monom;
    static xmultiply: (...monoms: Monom[]) => Monom;
    areSameAs: (...M: Monom[]) => boolean;
    areEquals: (...M: Monom[]) => boolean;
}
