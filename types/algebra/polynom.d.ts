import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType, TABLE_OF_SIGN_VALUES } from '../pimath.interface';
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
    get display(): string;
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
     * @param letter
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
    get isMultiVariable(): boolean;
    isOne(): boolean;
    isOppositeAt: (P: Polynom) => boolean;
    isReduced: (polynomString: string) => boolean;
    isSameAs: (P: Polynom) => boolean;
    isZero(): boolean;
    lcmDenominator: () => number;
    lcmNumerator: () => number;
    get length(): number;
    letters: () => string[];
    limitToInfinity: (letter?: string) => Fraction;
    limitToNegativeInfinity: (letter?: string) => Fraction;
    monomByDegree: (degree?: Fraction | number, letter?: string) => Monom;
    monomByLetter: (letter: string) => Monom;
    get monoms(): Monom[];
    set monoms(M: Monom[]);
    monomsByDegree: (degree?: number | Fraction, letter?: string) => Monom[];
    multiply: (value: unknown) => Polynom;
    get numberOfVars(): number;
    one: () => this;
    opposite: () => this;
    get plotFunction(): string;
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
    get roots(): ISolution[];
    set roots(value: ISolution[]);
    sqrt(): Polynom;
    subtract: (...values: InputAlgebra<Polynom>[]) => Polynom;
    tableOfSigns(rootsArray?: ISolution[]): {
        roots: ISolution[];
        signs: TABLE_OF_SIGN_VALUES[];
    };
    get tex(): string;
    get variables(): string[];
    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    zero: () => this;
    get zeroes(): ISolution[];
}
