import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Monom } from './monom';

export type PolynomParsingType = InputValue<Polynom> | Monom;
export interface IEuclidean {
    quotient: Polynom;
    reminder: Polynom;
}
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 * ```
 * let P = new Polynom('3x-4')
 * ```
 */
export declare class Polynom implements IPiMathObject<Polynom>, IExpression<Polynom>, IAnalyse<Polynom>, IAlgebra<Polynom> {
    #private;
    constructor(value: InputValue<Fraction>);
    constructor(value: string);
    constructor(value: Monom);
    constructor(value: Polynom);
    constructor(...values: InputValue<Fraction>[]);
    constructor(...values: InputAlgebra<Polynom>[]);
    /**
     * Parse a string to a polynom.
     * @param inputStr
     * @param values
     */
    parse: (inputStr: PolynomParsingType, ...values: InputAlgebra<Monom>[]) => this;
    /**
     * Clone the polynom
     */
    clone: () => Polynom;
    add: (...values: InputAlgebra<Polynom>[]) => Polynom;
    commonMonom: () => Monom;
    degree: (letter?: string) => Fraction;
    derivative: (letter?: string) => Polynom;
    divide: (value: InputAlgebra<Polynom>) => Polynom;
    empty: () => this;
    /**
     * Divide the current polynom by another polynom.
     * @param P
     * returns {quotient: Polynom, reminder: Polynom}
     */
    euclidean: (P: Polynom) => IEuclidean;
    evaluate: (values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean) => Fraction | number;
    /**
     * Factorize a polynom and store the best results in factors.
     * @param maxValue Defines the greatest value to search to (default is 20).
     */
    factorize: (letter?: string) => Polynom[];
    gcdDenominator: () => number;
    gcdNumerator: () => number;
    getDenominators: () => number[];
    getNumerators: () => number[];
    getZeroes: () => ISolution[];
    hasVariable(letter: string): boolean;
    integrate: (a: InputValue<Fraction>, b: InputValue<Fraction>, letter?: string) => Fraction;
    inverse(): Polynom | undefined;
    isDeveloped: (polynomString: string) => boolean;
    isDividableBy: (div: Polynom) => boolean;
    isEqual: (P: Polynom) => boolean;
    isOne(): boolean;
    isOppositeAt: (P: Polynom) => boolean;
    isReduced: (polynomString: string) => boolean;
    isSameAs: (P: Polynom) => boolean;
    isZero(): boolean;
    lcmDenominator: () => number;
    lcmNumerator: () => number;
    letters: () => string[];
    limitToInfinity: (letter?: string) => Fraction;
    limitToNegativeInfinity: (letter?: string) => Fraction;
    monomByDegree: (degree?: Fraction | number, letter?: string) => Monom;
    monomByLetter: (letter: string) => Monom;
    monomsByDegree: (degree?: number | Fraction, letter?: string) => Monom[];
    multiply: (value: unknown) => Polynom;
    one: () => this;
    opposite: () => this;
    pow: (nb: number) => Polynom;
    primitive: (letter?: string) => Polynom;
    reduce: () => Polynom;
    reorder: (letter?: string, revert?: boolean) => this;
    /**
     * Replace a variable (letter) by a polynom.
     * @param letter
     * @param P
     */
    replaceBy: (letter: string, P: Polynom) => this;
    root(): Polynom;
    sqrt(): Polynom;
    subtract: (...values: InputAlgebra<Polynom>[]) => Polynom;
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    zero: () => this;
    get display(): string;
    get isMultiVariable(): boolean;
    get length(): number;
    get monoms(): Monom[];
    set monoms(M: Monom[]);
    get numberOfVars(): number;
    get plotFunction(): string;
    get tex(): string;
    get variables(): string[];
    get zeroes(): ISolution[];
    private _compare;
    private _divideByFraction;
    private _divideByInteger;
    private _evaluateAsNumeric;
    private _factorize2ndDegree;
    private _factorizeByGroups;
    private _getAllPotentialFactors;
    private _multiplyByFraction;
    private _multiplyByInteger;
    private _multiplyByMonom;
    private _multiplyByPolynom;
    private _parseString;
    private _shutingYard_addToken;
    private genDisplay;
    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    private _shutingYardToReducedPolynom;
}
