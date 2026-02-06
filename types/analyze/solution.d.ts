import { InputValue } from '../pimath.interface';
import { Fraction } from '../coefficients';
import { Root } from '../coefficients/root';
export declare class Solution {
    #private;
    constructor();
    get tex(): string;
    set tex(value: string | null);
    get display(): string | null;
    set display(value: string | null);
    static fromFraction(value: InputValue<Fraction>): Solution;
    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[];
    get count(): number;
    set count(value: number);
    get exact(): boolean;
    set exact(value: boolean);
    get fraction(): Fraction;
    set fraction(value: Fraction);
    isZero(): boolean;
    reduce(): this;
    get root(): Root;
    set root(value: Root);
    setExact(value?: boolean): this;
    get value(): number;
    get variable(): string;
    set variable(value: string | undefined);
}
