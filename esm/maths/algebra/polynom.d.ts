import { literalType, Monom } from './monom';
import { Token } from '../shutingyard';
import { Fraction } from "../coefficients";
export declare type PolynomParsingType = string | Polynom | number | Fraction | Monom;
export declare class Polynom {
    private _rawString;
    constructor(polynomString?: PolynomParsingType, ...values: unknown[]);
    private _monoms;
    get monoms(): Monom[];
    set monoms(M: Monom[]);
    private _factors;
    get factors(): Polynom[];
    set factors(value: Polynom[]);
    private _texString;
    get texString(): string;
    get texFactors(): string;
    get length(): number;
    get display(): string;
    get raw(): string;
    get tex(): string;
    get isMultiVariable(): boolean;
    get variables(): string[];
    get numberOfVars(): number;
    parse: (inputStr: PolynomParsingType, ...values: unknown[]) => Polynom;
    private _parseString;
    clone: () => Polynom;
    zero: () => Polynom;
    one: () => Polynom;
    empty: () => Polynom;
    opposed: () => Polynom;
    add: (...values: unknown[]) => Polynom;
    subtract: (...values: unknown[]) => Polynom;
    multiply: (value: unknown) => Polynom;
    euclidian: (P: Polynom) => {
        quotient: Polynom;
        reminder: Polynom;
    };
    divide: (value: unknown) => Polynom;
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
    private genDisplay;
    static addToken: (stack: Polynom[], element: Token) => void;
    private shutingYardToReducedPolynom;
    private multiplyByPolynom;
    private multiplyByFraction;
    private multiplyByInteger;
    private multiplyByMonom;
    private divideByInteger;
    private divideByFraction;
    private _factorize2ndDegree;
    private _factorizeByGroups;
}
