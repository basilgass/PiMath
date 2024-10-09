import { IAlgebra, IExpression, InputAlgebra, InputValue, IPiMathObject, ISolution, literalType, POLYFACTOR_TABLE_OF_SIGNS } from '../pimath.interface';
import { Fraction } from '../coefficients';
import { Factor } from './factor';
import { Polynom } from './polynom';
export declare class PolyFactor implements IPiMathObject<PolyFactor>, IExpression<PolyFactor>, IAlgebra<PolyFactor> {
    #private;
    constructor(...values: (Factor | PolyFactor)[]);
    parse(...values: (Factor | PolyFactor)[]): this;
    clone(): PolyFactor;
    get tex(): string;
    get display(): string;
    static gcd(...values: PolyFactor[]): PolyFactor;
    static lcm(...values: PolyFactor[]): PolyFactor;
    add(...values: PolyFactor[]): this;
    get asPower(): this;
    get asRoot(): this;
    degree(letter?: string): Fraction;
    get denominator(): PolyFactor;
    derivative(): this;
    develop(): PolyFactor;
    divide(value: PolyFactor): this;
    evaluate(values: InputValue<Fraction> | literalType<number | Fraction>, asNumeric?: boolean): number | Fraction;
    factorize(letter?: string): PolyFactor;
    get factors(): Factor[];
    set factors(value: Factor[]);
    fromPolynom(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>): this;
    getZeroes(): ISolution[];
    hasVariable(letter: string): boolean;
    inverse(): this;
    isEqual(value: PolyFactor): boolean;
    isOne(): boolean;
    isZero(): boolean;
    multiply(...values: PolyFactor[]): this;
    get numerator(): PolyFactor;
    one(): this;
    opposite(): this;
    pow(value: number | Fraction): this;
    primitive(): PolyFactor;
    reduce(): this;
    root(value: number): this;
    /**
     * Reoarder the factors using :
     * 1. number of monoms
     * 2. degree of polynom
     * 3. power of polyfactor
     */
    sort(letter?: string): this;
    sqrt(): this;
    subtract(...values: PolyFactor[]): this;
    tableOfSigns(): POLYFACTOR_TABLE_OF_SIGNS;
    get variables(): string[];
    zero(): this;
}
