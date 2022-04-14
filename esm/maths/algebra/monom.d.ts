import { Token } from "../shutingyard";
import { Fraction } from "../coefficients/fraction";
export declare type literalType = {
    [Key: string]: Fraction;
};
export declare class Monom {
    private _coefficient;
    private _literal;
    /**
     * Create a Monom
     * Defined as \\(k \\cdot x^{n}\\), where \\( k,n \in \\mathbb{Q}\\).
     * Examples: \\(3x^2\\) or \\(3/5x^2\\)
     * @param value (optional) string The value that should be parse. Can be a Monom, a Fraction, a string or a number. If nothing is provided, it will return the trivial monom (0).
     */
    constructor(value?: unknown);
    /**
     * Get the coefficient \\(k\\) of the Monom \\(k\\cdot x^{n}\\)
     * @returns {Fraction}
     */
    get coefficient(): Fraction;
    /**
     * Set the coefficient \\(k\\) value of the monom
     * @param {Fraction | number | string} F
     */
    set coefficient(F: Fraction | number | string);
    /**
     * Get the literal part of \\(x^{n_1}y^{n_2}\\) as dictionary \\[\\begin{array}{ll}x&=n_1\\\\y&=n_2\\end{array}\\]
     * @returns {literalType}
     */
    get literal(): literalType;
    /**
     * Get the literal square roots of the Monom.
     * TODO: remove this getter ? Is it used and is it correct ?
     * @returns {literalType}
     */
    get literalSqrt(): literalType;
    /**
     * Set the literal part of the monom. Must be a dictionary {x: Fraction, y: Fraction, ...}
     * @param {literalType} L
     */
    set literal(L: literalType);
    /**
     * Set the literal part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string);
    /**
     * Get the variables letters
     */
    get variables(): string[];
    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string;
    get dividers(): Monom[];
    private _getLiteralDividers;
    /**
     * Display the monom, forcing the '+' sign to appear
     */
    get displayWithSign(): string;
    get texWithSign(): string;
    get plotFunction(): string;
    /**
     * Get the tex output of the monom
     */
    get tex(): string;
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    parse: (inputStr: unknown) => Monom;
    addToken: (stack: Monom[], element: Token) => void;
    private _shutingYardToReducedMonom;
    /**
     * Clone the current Monom.
     */
    clone: () => Monom;
    copyLiterals: (literal: literalType) => literalType;
    makeSame: (M: Monom) => Monom;
    /**
     * Create a zero value monom
     */
    zero: () => Monom;
    /**
     * Create a one value monom
     */
    one: () => Monom;
    /**
     * Clean the monom by removing each letters with a power of zero.
     */
    clean: () => Monom;
    reduce: () => Monom;
    /**
     * Get the opposed
     * Returns a monom.
     */
    opposed: () => Monom;
    /**
     * Add all similar monoms. If they aren't similar, they are simply skipped.
     * @param M (Monom[]) The monoms to add.
     */
    add: (...M: Monom[]) => Monom;
    /**
     * Subtract multiple monoms
     * @param M (Monom[]) The monoms to subtract
     */
    subtract: (...M: Monom[]) => Monom;
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    multiply: (...M: Monom[]) => Monom;
    multiplyByNumber: (F: Fraction | number) => Monom;
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    divide: (...M: Monom[]) => Monom;
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    pow: (nb: number | Fraction) => Monom;
    /**
     * Get the nth-root of the monom
     * @param p
     */
    root: (p: number) => Monom;
    /**
     * Return the square root of a monom
     */
    sqrt: () => Monom;
    compare: (M: Monom, sign?: string) => boolean;
    /**
     * Determine if the monom is null
     */
    isZero(): boolean;
    /**
     * Determine if the monom is one
     */
    isOne(): boolean;
    /**
     * Determine if two monoms are equals
     * @param M
     */
    isEqual: (M: Monom) => boolean;
    /**
     * Determine if two monoms are similar
     * @param M
     */
    isSameAs: (M: Monom) => boolean;
    isSquare: () => boolean;
    isLiteralSquare: () => boolean;
    hasFractionCoefficient: () => boolean;
    /**
     * Determine if a monom contains a setLetter in it's literal part
     * @param letter
     */
    hasLetter: (letter?: string) => boolean;
    /**
     * Set the power of a particular setLetter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the setLetter (must be positive integer.
     */
    setLetter: (letter: string, pow: Fraction | number) => void;
    /**
     * Get the degree of a monom. If no setLetter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree: (letter?: string) => Fraction;
    /**
     * Evaluate a monom. Each setLetter must be assigned to a Fraction.
     * @param values    Dictionary of <setLetter: Fraction>
     */
    evaluate: (values: literalType | Fraction | number) => Fraction;
    /**
     * Derivative the monom
     * @param letter
     */
    derivative: (letter?: string) => Monom;
    primitive: (letter?: string) => Monom;
    /**
     * Get the least common multiple of monoms
     * @param monoms    Array of monoms
     */
    static lcm: (...monoms: Monom[]) => Monom;
    /**
     * Multiply two monoms and return a NEW monom.
     * @param monoms
     */
    static xmultiply: (...monoms: Monom[]) => Monom;
    /**
     * Determine if multiple monoms are similar
     * @param M
     */
    areSameAs: (...M: Monom[]) => boolean;
    /**
     * Determine if multiple monoms are equals
     * @param M
     */
    areEquals: (...M: Monom[]) => boolean;
    isDivisible: (div: Monom) => boolean;
}
