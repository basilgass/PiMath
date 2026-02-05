import { InputValue } from '../pimath.interface';
import { Fraction } from '../coefficients';
import { Root } from '../coefficients/root';
export declare class Solution {
    #private;
    constructor();
    get tex(): string;
    set tex(value: string);
    get display(): string;
    set display(value: string);
    static fromFraction(value: InputValue<Fraction>): Solution;
    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[];
    get exact(): boolean;
    set exact(value: boolean);
    get fraction(): Fraction;
    set fraction(value: Fraction);
    isAZero(value?: boolean): this;
    get isZero(): boolean;
    set isZero(value: boolean);
    reduce(): this;
    get root(): Root;
    set root(value: Root);
    setExact(value?: boolean): this;
    get value(): number;
    get variable(): string;
    set variable(value: string | undefined);
}
