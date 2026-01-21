import { Fraction } from './fraction';
import { IExpression, InputValue, IPiMathObject } from '../pimath.interface';
export declare class Root implements IPiMathObject<Root>, IExpression<Root> {
    #private;
    constructor(value?: InputValue<Root | Fraction>);
    parse(value: InputValue<Root | Fraction>): this;
    clone(): Root;
    get tex(): string;
    get display(): string;
    add(value: InputValue<Root>): this;
    divide(value: InputValue<Root>): this;
    get factor(): Fraction;
    set factor(value: Fraction);
    from(index: number, radical: InputValue<Fraction>, factor?: InputValue<Fraction>): this;
    /**
     * convert to root(index)(radical), without factor
     */
    group(): this;
    get index(): number;
    set index(value: number);
    get indexAsPow(): Fraction;
    inverse(): this;
    isEqual(root: Root): boolean;
    isOne(): boolean;
    isZero(): boolean;
    multiply(value: InputValue<Root>): this;
    one(): this;
    opposite(): this;
    pow(value: number): this;
    get radical(): Fraction;
    set radical(value: Fraction);
    reduce(): this;
    root(value: number): this;
    sqrt(): this;
    subtract(value: InputValue<Root>): this;
    get value(): number;
    zero(): this;
}
