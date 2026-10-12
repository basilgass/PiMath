import { Fraction } from "../coefficients";
import type { IDisplayDigits, IPiMathObject } from "../pimath.interface";
export declare abstract class TupleN implements IPiMathObject<TupleN>, IDisplayDigits {
    #private;
    abstract clone(): TupleN;
    cloneCoordinates(): Fraction[];
    withDigits(digits: number | null): this;
    abstract get tex(): string;
    abstract get display(): string;
    get array(): Fraction[];
    set array(value: Fraction[]);
    get dimension(): number;
    protected static parseString(value: string): Fraction[];
    get onChange(): undefined | (() => void);
    set onChange(value: undefined | (() => void));
    setDimension(value?: number): this;
    get x(): Fraction;
    set x(value: Fraction | number | string);
    get y(): Fraction;
    set y(value: Fraction | number | string);
    get z(): Fraction;
    set z(value: Fraction | number | string);
    copy(value: TupleN): this;
    isZero(): boolean;
    get norm(): number;
    get normSquare(): Fraction;
    opposite(): this;
    zero(): this;
}
//# sourceMappingURL=TupleN.d.ts.map