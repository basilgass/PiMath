/**
 * Polynom module contains everything necessary to handle polynoms.*
 */
import { literalType, Monom } from './monom';
import { Token } from '../shutingyard';
import { Fraction } from "../coefficients/fraction";
export declare type PolynomParsingType = string | Polynom | number | Fraction | Monom;
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export declare class Polynom {
    private _rawString;
    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     * @param values
     */
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
    static addToken: (stack: Polynom[], element: Token) => void;
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values: as string, numbers or fractions
     */
    parse: (inputStr: PolynomParsingType, ...values: unknown[]) => Polynom;
    /**
     * Clone the polynom
     */
    clone: () => Polynom;
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    zero: () => Polynom;
    one: () => Polynom;
    empty: () => Polynom;
    opposed: () => Polynom;
    add: (...values: unknown[]) => Polynom;
    subtract: (...values: unknown[]) => Polynom;
    multiply: (value: unknown) => Polynom;
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    euclidian: (P: Polynom) => {
        quotient: Polynom;
        reminder: Polynom;
    };
    divide: (value: unknown) => Polynom;
    pow: (nb: number) => Polynom;
    /**
     * Compare the current coefficient with another coefficient
     * @param P
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
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
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    replaceBy: (letter: string, P: Polynom) => Polynom;
    evaluate: (values: literalType | Fraction | number) => Fraction;
    derivative: (letter?: string) => Polynom;
    primitive: (letter?: string) => Polynom;
    integrate: (a: Fraction | number, b: Fraction | number, letter?: string) => Fraction;
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
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
    limitToInfinity: (letter?: string) => Fraction;
    limitToNegativeInfinity: (letter?: string) => Fraction;
    private _parseString;
    private genDisplay;
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
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
