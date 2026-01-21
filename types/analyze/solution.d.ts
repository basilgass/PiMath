import { InputValue } from '../pimath.interface';
import { Fraction } from '../coefficients';
export declare class Solution {
    #private;
    constructor();
    get tex(): string;
    set tex(value: string);
    get display(): string;
    set display(value: string);
    static fromFraction(value: InputValue<Fraction>): Solution;
    static fromQuadratic(values: [InputValue<Fraction>, InputValue<Fraction>, InputValue<Fraction>]): Solution[];
    get exact(): boolean;
    set exact(value: boolean);
    isAZero(value?: boolean): this;
    isExact(value?: boolean): this;
    get isZero(): boolean;
    set isZero(value: boolean);
    get value(): number;
    get variable(): string;
    set variable(value: string | undefined);
}
