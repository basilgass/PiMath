import { IAlgebra, IAnalyse, IExpression, InputAlgebra, InputValue, IPiMathObject, literalType } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Polynom } from './polynom';

/**
 * Rational class can handle rational polynoms
 */
export declare class Rational implements IPiMathObject<Rational>, IExpression<Rational>, IAnalyse<Rational>, IAlgebra<Rational> {
    #private;
    constructor();
    constructor(value: Rational);
    constructor(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>);
    get tex(): string;
    get display(): string;
    get numerator(): Polynom;
    get denominator(): Polynom;
    clone(): Rational;
    parse(): Rational;
    zero(): this;
    one(): this;
    add(value: InputValue<Rational>): Rational;
    subtract(value: InputValue<Rational>): Rational;
    opposite(): this;
    multiply(value: InputValue<Rational>): this;
    divide(value: InputValue<Rational>): this;
    reduce(): Rational;
    isEqual(value: InputValue<Rational>): boolean;
    isZero(): boolean;
    isOne(): boolean;
    inverse(): this;
    pow(value: number): Rational;
    sqrt(): Rational | undefined;
    root(): Rational | undefined;
    derivative(): Rational | Rational[];
    primitive(): Rational;
    integrate(a: InputValue<Fraction>, b: InputValue<Rational>, letter?: string): Fraction;
    get variables(): string[];
    hasVariable(letter: string): boolean;
    degree(): Fraction;
    evaluate(values: literalType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number | boolean;
}
