import { IAlgebra, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType, TABLE_OF_SIGNS } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Polynom } from './polynom';
export declare class Factor implements IPiMathObject<Factor>, IExpression<Factor>, IAlgebra<Factor> {
    private _displayMode;
    private _singleMode;
    private _polynom;
    private _power;
    constructor(value: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>);
    parse(): Factor;
    clone(): Factor;
    add(): Factor;
    get withPower(): this;
    get withRoot(): this;
    get asSingle(): this;
    degree(letter?: string): Fraction;
    derivative(): Factor[];
    develop(): Polynom;
    get display(): string;
    divide(value: InputAlgebra<Factor | Polynom>): this;
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
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
    get tex(): string;
    get variables(): string[];
    zero(): this;
    tableOfSigns(roots?: ISolution[]): TABLE_OF_SIGNS;
}
export declare enum FACTOR_DISPLAY {
    ROOT = 0,
    POWER = 1
}
