import type { IDisplayDigits, IAlgebra, IEvaluable, IExpression, InputAlgebra, InputValue, IPiMathObject, LiteralType } from "../pimath.interface";
import { Fraction } from "../coefficients/fraction";
import { Polynom } from "./polynom";
export declare class Factor implements IPiMathObject<Factor>, IDisplayDigits, IExpression<Factor>, IAlgebra, IEvaluable {
    #private;
    constructor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>);
    parse(value: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>): this;
    static fromString(value: string): Factor;
    copy(value: Factor): this;
    clone(): Factor;
    withDigits(digits: number | null): this;
    get tex(): string;
    get display(): string;
    add(): this;
    get asSingle(): this;
    degree(variable?: string): Fraction;
    derivative(): this;
    getDerivativeFactors(): Factor[];
    develop(): Polynom;
    divide(value: InputAlgebra<Factor | Polynom>): this;
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric: true): number;
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: false): Fraction;
    evaluate(values: InputValue<Fraction> | LiteralType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    static fromPolynom(polynom: InputAlgebra<Polynom>): Factor;
    hasVariable(variable: string): boolean;
    inverse(): this;
    isEqual(value: Factor): boolean;
    isOne(): boolean;
    isSameAs(value: InputAlgebra<Factor | Polynom>): boolean;
    isZero(): boolean;
    multiply(value: InputAlgebra<Factor | Polynom>): this;
    one(): this;
    opposite(): this;
    get polynom(): Polynom;
    set polynom(value: Polynom);
    pow(value: number | Fraction): this;
    get power(): Fraction;
    set power(value: InputValue<Fraction>);
    primitive(): Factor;
    reduce(): Factor;
    root(value: number): this;
    sqrt(): this;
    subtract(): this;
    get variables(): string[];
    get asPower(): this;
    get asRoot(): this;
    zero(): this;
    static checkParseAsFactors(str: string): boolean;
    static factorsFromString(value: string, isNumerator?: boolean): Factor[];
}
export declare enum FACTOR_DISPLAY {
    ROOT = 0,
    POWER = 1
}
//# sourceMappingURL=factor.d.ts.map