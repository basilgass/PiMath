import { compareSign, IExpression, InputValue, IPiMathObject } from '../pimath.interface';

/**
 * The fraction class make possible to handle
 * \\(\frac{a}{b}\\) or \\[\frac{a}{b}\\]  values.
 */
export declare class Fraction implements IPiMathObject<Fraction>, IExpression<Fraction> {
    #private;
    constructor();
    constructor(value: InputValue<Fraction>);
    constructor(numerator: number, denominator: number);
    constructor(decimal: number, periodLength: number);
    /**
     * Parse the value to get the numerator and denominator
     * @param value : number or string to parse to get the fraction
     * @param denominatorOrPeriodic (optional|number) : length of the periodic part: 2.333333 => 1 or denominator value
     */
    parse: (value: InputValue<Fraction>, denominatorOrPeriodic?: number) => Fraction;
    clone: () => Fraction;
    abs: () => this;
    add: (F: InputValue<Fraction>) => Fraction;
    amplify: (k: number) => this;
    /**
     * Simple function to determine if it's a fraction
     */
    areEquals: (...F: Fraction[]) => boolean;
    /**
     * Compare the current coefficient with another coefficient
     * @param F (Coefficient) The coefficient to _compare
     * @param sign (string| default is =): authorized values: =, <, <=, >, >= with some variations.
     */
    compare: (F: InputValue<Fraction>, sign?: compareSign) => boolean;
    divide: (F: Fraction | number) => Fraction;
    infinite: () => this;
    invalid: () => this;
    inverse: () => this;
    isApproximative: () => boolean;
    isEqual: (than: Fraction | number) => boolean;
    isEven: () => boolean;
    isExact: () => boolean;
    isFinite: () => boolean;
    isGeq: (than: Fraction | number) => boolean;
    isGreater: (than: Fraction | number) => boolean;
    isInfinity: () => boolean;
    isInverted: (p: Fraction) => boolean;
    isLeq: (than: Fraction | number) => boolean;
    isLesser: (than: Fraction | number) => boolean;
    isNaN: () => boolean;
    isNatural: () => boolean;
    isNegative: () => boolean;
    isNegativeOne: () => boolean;
    isNotEqual: (than: Fraction | number) => boolean;
    isNotZero: () => boolean;
    isOdd: () => boolean;
    isOne: () => boolean;
    isOpposite: (p: Fraction) => boolean;
    isPositive: () => boolean;
    isRational: () => boolean;
    isReduced: () => boolean;
    isRelative: () => boolean;
    isSquare: () => boolean;
    isStrictlyNegative: () => boolean;
    isStrictlyPositive: () => boolean;
    isZero: () => boolean;
    multiply: (F: Fraction | number) => this;
    one: () => this;
    opposite: () => this;
    pow: (p: number | Fraction) => Fraction;
    reduce: () => this;
    root: (p: number) => this;
    sign: () => number;
    sqrt: () => this;
    subtract: (F: Fraction | number) => Fraction;
    zero: () => this;
    static average: (...fractions: (InputValue<Fraction>)[]) => Fraction;
    static max: (...fractions: InputValue<Fraction>[]) => Fraction;
    static min: (...fractions: (InputValue<Fraction>)[]) => Fraction;
    static sort: (fractions: (InputValue<Fraction>)[], reverse?: boolean) => Fraction[];
    static unique: (fractions: (InputValue<Fraction>)[]) => Fraction[];
    static xMultiply: (...values: (InputValue<Fraction>)[]) => Fraction;
    get denominator(): number;
    set denominator(value: number);
    get display(): string;
    get numerator(): number;
    set numerator(value: number);
    get tfrac(): this;
    get dfrac(): this;
    get frac(): this;
    get tex(): string;
    get texWithSign(): string;
    get value(): number;
}
