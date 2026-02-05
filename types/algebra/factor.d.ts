import { IAlgebra, IExpression, InputAlgebra, InputValue, IPiMathObject, literalType, TABLE_OF_SIGNS } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Polynom } from './polynom';
export declare class Factor implements IPiMathObject<Factor>, IExpression<Factor>, IAlgebra<Factor> {
    #private;
    constructor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>);
    parse(): Factor;
    clone(): Factor;
    get tex(): string;
    get display(): string;
    add(): Factor;
    get asSingle(): this;
    degree(letter?: string): Fraction;
    derivative(): Factor[];
    develop(): Polynom;
    divide(value: InputAlgebra<Factor | Polynom>): this;
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    fromPolynom(polynom: InputValue<Polynom>): this;
    hasVariable(letter: string): boolean;
    inverse(): this;
    isEqual(value: Factor): boolean;
    isOne(): boolean;
    isSameAs(value: InputAlgebra<Factor | Polynom>): boolean;
    isZero(): boolean;
    multiply(value: InputAlgebra<Factor | Polynom>): this;
    one(): this;
    opposite(): Factor;
    get polynom(): Polynom;
    set polynom(value: Polynom);
    pow(value: number | Fraction): this;
    get power(): Fraction;
    set power(value: InputValue<Fraction>);
    primitive(): Factor;
    reduce(): Factor;
    root(value: number): this;
    sqrt(): this;
    subtract(): Factor;
    tableOfSigns(): TABLE_OF_SIGNS;
    get variables(): string[];
    get withPower(): this;
    get withRoot(): this;
    zero(): this;
}
export declare enum FACTOR_DISPLAY {
    ROOT = 0,
    POWER = 1
}
