export declare class Fraction {
    private _numerator;
    private _denominator;
    constructor(fractionStr?: any);
    /**
     * Simple function to determine if it's a fraction
     */
    isFraction(): boolean;
    /**
     * Set the fraction to zero
     */
    zero: () => Fraction;
    /**
     * Make a clone of the current fraction
     */
    clone: () => Fraction;
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number to parse to get the fraction
     * @param periodic (optional|number) : length of the periodic part: 2.333333 => 1
     */
    parse: (value: any, periodic?: number) => Fraction;
    parseByInteger: (num: number, den?: number) => Fraction;
    /**
     * Reduce the fraction and make the denominator positve
     */
    reduce: () => Fraction;
    invalid: () => Fraction;
    infinite: () => Fraction;
    opposed: () => Fraction;
    multiply: (F: Fraction) => Fraction;
    multiplyByInt: (n: number) => Fraction;
    amplify: (k: number) => Fraction;
    divide: (F: Fraction) => Fraction;
    add: (F: Fraction) => Fraction;
    substract: (F: Fraction) => Fraction;
    /**
     * Get the power of a fraction.
     * @param p (integer) The integer power value (positive or negative)
     */
    pow: (p: number) => Fraction;
    /**
     * Returns the exact square root fraction as numerator \sqrt{s} / denominator
     */
    sqrt: () => Fraction;
    /**
     * Returns the absolute value of the fraction
     */
    abs: () => Fraction;
    /**
     * Get the sign of the fraction: 1 if positive, -1 if negative
     */
    sign: () => number;
    /**
     * Determine if two fractions are equals
     * @param F
     */
    isEqual: (F: Fraction) => boolean;
    /**
     * Determine if the fractions are equals.
     * @param F
     */
    areEquals: (...F: Fraction[]) => boolean;
    /**
     * Compare the current fraction with another fraction
     * @param F (Fraction) The fraction to compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    compare: (F: Fraction, sign?: string) => boolean;
    lesser: (than: Fraction) => Boolean;
    leq: (than: Fraction) => Boolean;
    greater: (than: Fraction) => Boolean;
    geq: (than: Fraction) => Boolean;
    isInfinity: () => boolean;
    isFinite: () => boolean;
    set numerator(value: number);
    set denominator(value: number);
    get numerator(): number;
    get denominator(): number;
    get value(): number;
    get display(): string;
    get frac(): string;
    get dfrac(): string;
}
