export type FractionParsingType = number | string | Fraction;
/**
 * The fraction class make possible to handle
 * TODO: Write the documentation correctly.
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */
export declare class Fraction {
    private _denominator;
    private _numerator;
    constructor(value?: unknown, denominatorOrPeriodic?: number);
    get numerator(): number;
    set numerator(value: number);
    get denominator(): number;
    set denominator(value: number);
    get value(): number;
    get tex(): string;
    get texWithSign(): string;
    get display(): string;
    get frac(): string;
    get dfrac(): string;
    get tfrac(): string;
    static max: (...fractions: (Fraction | number)[]) => Fraction;
    static min: (...fractions: (Fraction | number)[]) => Fraction;
    static average: (...fractions: (Fraction | number)[]) => Fraction;
    static unique: (fractions: Fraction[], sorted?: boolean) => Fraction[];
    static sort: (fractions: Fraction[], reverse?: boolean) => Fraction[];
    isApproximative: () => boolean;
    isExact: () => boolean;
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    parse: (value: unknown, denominatorOrPeriodic?: number) => Fraction;
    clone: () => Fraction;
    zero: () => Fraction;
    one: () => Fraction;
    infinite: () => Fraction;
    invalid: () => Fraction;
    opposed: () => Fraction;
    add: (F: Fraction | number) => Fraction;
    subtract: (F: Fraction | number) => Fraction;
    multiply: (F: Fraction | number) => Fraction;
    xMultiply: (...values: (Fraction | number)[]) => Fraction;
    divide: (F: Fraction | number) => Fraction;
    invert: () => Fraction;
    pow: (p: number | Fraction) => Fraction;
    root: (p: number) => Fraction;
    sqrt: () => Fraction;
    abs: () => Fraction;
    reduce: () => Fraction;
    amplify: (k: number) => Fraction;
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    compare: (F: unknown, sign?: string) => boolean;
    lesser: (than: Fraction | number) => Boolean;
    leq: (than: Fraction | number) => Boolean;
    greater: (than: Fraction | number) => Boolean;
    geq: (than: Fraction | number) => Boolean;
    isEqual: (than: Fraction | number) => boolean;
    isNotEqual: (than: Fraction | number) => boolean;
    isOpposed: (p: Fraction) => boolean;
    isInverted: (p: Fraction) => boolean;
    isZero: () => boolean;
    isNotZero: () => boolean;
    isOne: () => boolean;
    isNegativeOne: () => boolean;
    isPositive: () => boolean;
    isNegative: () => boolean;
    isStrictlyPositive: () => boolean;
    isStrictlyNegative: () => Boolean;
    isNaN: () => boolean;
    isInfinity: () => boolean;
    isFinite: () => boolean;
    isSquare: () => boolean;
    isReduced: () => boolean;
    isNatural: () => boolean;
    isRelative: () => boolean;
    isRational: () => boolean;
    isEven: () => boolean;
    isOdd: () => boolean;
    sign: () => number;
    /**
     * Simple function to determine if it's a fraction
     */
    areEquals: (...F: Fraction[]) => boolean;
}
