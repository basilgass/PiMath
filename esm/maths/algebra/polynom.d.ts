import { literalType, Monom } from './monom';
import { Fraction } from "../coefficients";
export declare class Polynom {
    private _rawString;
    private _monoms;
    private _factors;
    private _texString;
    constructor(polynomString?: string, ...values: any[]);
    get isPolynom(): boolean;
    get monoms(): Monom[];
    set monoms(M: Monom[]);
    get factors(): Polynom[];
    set factors(value: Polynom[]);
    get texFactors(): string;
    get texString(): string;
    get length(): number;
    get display(): string;
    get raw(): string;
    get tex(): string;
    get isMultiVariable(): boolean;
    get variables(): string[];
    get numberOfVars(): number;
    private genDisplay;
    parse: (inputStr: string, ...values: any[]) => Polynom;
    private shutingYardToReducedPolynom;
    clone: () => Polynom;
    zero: () => Polynom;
    one: () => Polynom;
    empty: () => Polynom;
    opposed: () => Polynom;
    add: (...values: any[]) => Polynom;
    subtract: (...values: any[]) => Polynom;
    multiply: (value: any) => Polynom;
    private multiplyByPolynom;
    private multiplyByFraction;
    private multiplyByInteger;
    private multiplyByMonom;
    euclidian: (P: Polynom) => {
        quotient: Polynom;
        reminder: Polynom;
    };
    divide: (value: any) => Polynom;
    private divideByInteger;
    private divideByFraction;
    pow: (nb: number) => Polynom;
    compare: (P: Polynom, sign?: string) => boolean;
    isZero(): boolean;
    isOne(): boolean;
    isEqual: (P: Polynom) => boolean;
    isSameAs: (P: Polynom) => boolean;
    isOpposedAt: (P: Polynom) => boolean;
    isFactorized: (polynomString: string) => boolean;
    isDeveloped: (polynomString: string) => Boolean;
    reduce: () => Polynom;
    reorder: (letter?: string) => Polynom;
    degree: (letter?: string) => Fraction;
    letters: () => string[];
    replaceBy: (letter: string, P: Polynom) => Polynom;
    evaluate: (values: literalType | Fraction | number) => Fraction;
    derivative: (letter?: string) => Polynom;
    primitive: (letter?: string) => Polynom;
    integrate: (a: Fraction | number, b: Fraction | number, letter?: string) => Fraction;
    factorize: (letter?: string) => Polynom[];
    private _factorize2ndDegree;
    private _factorizeByGroups;
    getZeroes: () => (Fraction | boolean)[];
    monomByDegree: (degree?: Fraction | number, letter?: string) => Monom;
    monomsByDegree: (degree?: number | Fraction, letter?: string) => Monom[];
    monomByLetter: (letter: string) => Monom;
    getDenominators: () => number[];
    getNumerators: () => number[];
    lcmDenominator: () => number;
    gcdDenominator: () => number;
    lcmNumerator: () => number;
    gcdNumerator: () => number;
    commonMonom: () => Monom;
}
