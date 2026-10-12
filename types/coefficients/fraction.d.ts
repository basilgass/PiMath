import type { CompareSign, IDisplayDigits, IExpression, InputValue, IPiMathObject } from "../pimath.interface";
export declare enum FracType {
    frac = "frac",
    dfrac = "dfrac",
    tfrac = "tfrac"
}
export declare class Fraction implements IPiMathObject<Fraction>, IExpression<Fraction>, IDisplayDigits {
    #private;
    constructor();
    constructor(value: InputValue<Fraction>);
    constructor(numerator: number, denominator: number);
    parse(value: InputValue<Fraction>, denominator?: number): this;
    clone(): Fraction;
    copy(value: Fraction): this;
    get tex(): string;
    get display(): string;
    static areEquals(...F: Fraction[]): boolean;
    static average(...fractions: (InputValue<Fraction>)[]): Fraction;
    static isFraction(value: InputValue<Fraction>): boolean;
    static max(...fractions: InputValue<Fraction>[]): Fraction;
    static min(...fractions: (InputValue<Fraction>)[]): Fraction;
    static sort(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[];
    static toSameDenominateur(...fractions: InputValue<Fraction>[]): Fraction[];
    static unique(fractions: (InputValue<Fraction>)[]): Fraction[];
    static xMultiply(...values: (InputValue<Fraction>)[]): Fraction;
    abs(): this;
    add(F: InputValue<Fraction>): this;
    amplify(k: number): this;
    compare(F: InputValue<Fraction>, sign?: CompareSign): boolean;
    get denominator(): number;
    set denominator(value: number);
    get asDfrac(): this;
    withDigits(digits: number | null): this;
    divide(F: InputValue<Fraction>): this;
    get exact(): boolean;
    set exact(value: boolean);
    get asFrac(): this;
    static fromNumber(value: number): Fraction;
    static fromNumbers(numerator: number, denominator: number): Fraction;
    static fromPeriodic(value: string | number, length: number): Fraction;
    static fromString(value: string): Fraction;
    infinite(): this;
    invalid(): this;
    inverse(): this;
    isEqual(than: Fraction | number): boolean;
    isEven(): boolean;
    isFinite(): boolean;
    isGeq(than: Fraction | number): boolean;
    isGreater(than: Fraction | number): boolean;
    isInfinity(): boolean;
    isLeq(than: Fraction | number): boolean;
    isLesser(than: Fraction | number): boolean;
    isNaN(): boolean;
    isNatural(): boolean;
    isNegative(): boolean;
    isNotEqual(than: Fraction | number): boolean;
    isNotZero(): boolean;
    isOdd(): boolean;
    isOne(): boolean;
    isPeriodic(): boolean;
    isPositive(): boolean;
    isRational(): boolean;
    hasFractionalPart(): boolean;
    isReduced(): boolean;
    isRelative(): boolean;
    isSquare(): boolean;
    isStrictlyNegative(): boolean;
    isStrictlyPositive(): boolean;
    isUnit(): boolean;
    isZero(): boolean;
    multiply(F: InputValue<Fraction>, reduce?: boolean): this;
    get numerator(): number;
    set numerator(value: number);
    one(): this;
    opposite(): this;
    pow(p: number | Fraction): this;
    reduce(): this;
    root(p: number): this;
    sign(): 1 | -1;
    sqrt(): this;
    subtract(F: InputValue<Fraction>): this;
    get asTfrac(): this;
    toRepeatingDecimal(): {
        sign: 1 | -1;
        integerPart: string;
        nonPeriodic: string;
        periodic: string;
        periodLength: number;
    };
    get value(): number;
    get withSign(): this;
    get withoutSign(): this;
    zero(): this;
}
//# sourceMappingURL=fraction.d.ts.map