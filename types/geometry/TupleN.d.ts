import { Fraction } from '../coefficients';
import { InputValue } from '../pimath.interface';
export declare abstract class TupleN {
    #private;
    constructor(...values: InputValue<Fraction>[]);
    abstract clone(): void;
    copy(): Fraction[];
    abstract get tex(): string;
    abstract get display(): string;
    get array(): Fraction[];
    set array(value: Fraction[]);
    get dimension(): number;
    fromString(value: string): this;
    setDimension(value?: number): this;
    get x(): Fraction;
    set x(value: Fraction | number | string);
    get y(): Fraction;
    set y(value: Fraction | number | string);
    get z(): Fraction;
    set z(value: Fraction | number | string);
    zero: () => this;
}
