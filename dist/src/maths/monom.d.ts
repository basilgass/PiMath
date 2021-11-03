import { Fraction } from "./fraction";
export declare class Monom {
    constructor();
    private _coefficient;
    /**
     * Get the coefficient as fraction
     */
    get coefficient(): Fraction;
    /**
     * Set the coefficient value of the monom
     * @param F     Fraction
     */
    set coefficient(F: Fraction);
    private _literal;
    /**
     * Get the litteral part, as dictionnary
     */
    get literal(): {
        [Key: string]: number;
    };
    /**
     * Set the litteral part of the monom
     * @param L     Literal part as dictionnary: <letter: exposant>
     */
    set literal(L: {
        [Key: string]: number;
    });
    /**
     * Set the litteral part of the monom from a string
     * @param inputStr  String like x^2y^3
     */
    set literalStr(inputStr: string);
    /**
     * Determine if the monom is null
     */
    get isZero(): boolean;
    /**
     * Determine if the monom is neutral
     */
    get isNeutral(): boolean;
    /**
     * Determine if the monom has more than one letter
     */
    get isMultiVariable(): boolean;
    /**
     * Get the variables letters
     */
    get variables(): string[];
    /**
     * Get the number of variables
     */
    get numberOfVar(): number;
    /**
     * This display getter is to be used in the polynom display getter
     */
    get display(): string;
    /**
     * Display the monom, forcing the '+' sign to appear
     */
    get displayWithSign(): string;
    /**
     * Get the tex output of the monom
     */
    get tex(): string;
    /**
     * Get the least common multiple of monomes
     * @param monoms    Arrqy of monoms
     */
    static lcm: (...monoms: Monom[]) => Monom;
    /**
     * Multiply two monoms and return a NEW monom.
     * @param M1
     * @param M2
     */
    static xmultiply: (M1: Monom, M2: Monom) => Monom;
    /**
     * Determine if object is a monom.
     */
    isMonom(): boolean;
    /**
     * Parse a string to a monom. The string may include fraction.
     * @param inputStr
     */
    parse: (inputStr: string) => Monom;
    /**
     * Clean the monom by removing each letters.
     */
    clean: () => Monom;
    /**
     * Create a zero value monom
     */
    zero: () => Monom;
    /**
     * Create a zero value monom
     */
    neutral: () => Monom;
    /**
     * Clone the current Monom.
     */
    clone: () => Monom;
    /**
     * Randomize a monom
     * @param letters       Letters to use, as a string
     * @param degree        Max degree (default 1)
     * @param withFraction  Allows fraction as coefficient (default false)
     * @param allowZero     Allows null monom (default false)
     */
    random: (letters?: string, degree?: number, withFraction?: boolean, allowZero?: boolean) => Monom;
    /**
     * Set the power of a particular letter
     * @param letter (string) Letter to change
     * @param pow (number) Power of the letter (must be positive integer.
     */
    letter: (letter: string, pow: number) => void;
    /**
     * Determine if two monoms are similar
     * @param M
     */
    isSameAs: (M: Monom) => boolean;
    /**
     * Determine if multiple monoms are similar
     * @param M
     */
    areSameAs: (...M: Monom[]) => boolean;
    /**
     * Determine if two monoms are equals
     * @param M
     */
    isEqual: (M: Monom) => boolean;
    /**
     * Determine if mutliple monoms are equals
     * @param M
     */
    areEquals: (...M: Monom[]) => boolean;
    /**
     * Get the degree of a monom. If no letter is given, the result will be the global degree.
     * @param letter (string) Letter to get to degree (power)
     */
    degree: (letter?: string) => number;
    /**
     * Determine if a monom contains a letter in it's litteral part
     * @param letter
     */
    hasLetter: (letter?: string) => boolean;
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
     * Substract multiple monoms
     * @param M (Monom[]) The monoms to substract
     */
    substract: (...M: Monom[]) => Monom;
    /**
     * Multiple multiple monoms to the current monom
     * @param M (Monom[]) The monoms to multiply to.
     */
    multiply: (...M: Monom[]) => Monom;
    /**
     * Divide the current monoms by multiple monoms
     * @param M (Monom[])
     */
    divide: (...M: Monom[]) => Monom;
    /**
     * Get the pow of a monom.
     * @param nb (number) : Mathematical pow
     */
    pow: (nb: number) => Monom;
    /**
     * Evaluate a monom. Each letter must be assigned to a Fraction.
     * @param values    Dictionnary of <letter: Fraction>
     */
    evaluate: (values: {
        [key: string]: Fraction;
    }) => Fraction;
    derivative: (Letter?: string) => Monom;
}
