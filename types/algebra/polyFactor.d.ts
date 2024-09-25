import { IAlgebra, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType, POLYFACTOR_TABLE_OF_SIGNS } from '../pimath.interface';
import { Fraction } from '../coefficients/fraction';
import { Factor, FACTOR_DISPLAY } from './factor';
import { Polynom } from './polynom';
export declare class PolyFactor implements IPiMathObject<PolyFactor>, IExpression<PolyFactor>, IAlgebra<PolyFactor> {
    #private;
    _displayMode: FACTOR_DISPLAY;
    _factors: Factor[];
    constructor(...values: (Factor | InputAlgebra<Polynom> | PolyFactor)[]);
    parse(...values: (Factor | InputAlgebra<Polynom> | PolyFactor)[]): this;
    clone(): PolyFactor;
    static gcd(...values: PolyFactor[]): PolyFactor;
    add(...values: PolyFactor[]): this;
    get asPower(): this;
    get asRoot(): this;
    degree(letter?: string): Fraction;
    get denominator(): Factor[];
    derivative(): this;
    develop(): Polynom;
    get display(): string;
    divide(value: PolyFactor): this;
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    getFactors(): Factor[];
    get factors(): Factor[];
    set factors(value: Factor[]);
    fromPolynom(polynom: InputAlgebra<Polynom>, letter?: string): this;
    getZeroes(): ISolution[];
    hasVariable(letter: string): boolean;
    inverse(): this;
    isEqual(value: PolyFactor): boolean;
    isOne(): boolean;
    isZero(): boolean;
    multiply(...values: PolyFactor[]): this;
    get numerator(): Factor[];
    one(): this;
    opposite(): this;
    pow(value: number | Fraction): this;
    primitive(): PolyFactor;
    reduce(): this;
    root(value: number): this;
    sort(): this;
    sqrt(): this;
    subtract(...values: PolyFactor[]): this;
    tableOfSigns(): POLYFACTOR_TABLE_OF_SIGNS;
    get tex(): string;
    get variables(): string[];
    zero(): this;
}
