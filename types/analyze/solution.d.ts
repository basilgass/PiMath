import type { InputValue, IPiMathObject } from "../pimath.interface";
import { Fraction } from "../coefficients";
import { Root } from "../coefficients/root";
import type { PolynomRoot } from "../algebra/polynomRoots";
export declare class Solution implements IPiMathObject<Solution> {
    #private;
    constructor();
    get tex(): string;
    set tex(value: string | null);
    get display(): string;
    set display(value: string | null);
    static fromFraction(value: InputValue<Fraction>): Solution;
    static fromRoot(value: InputValue<Root>): Solution;
    static fromPolynomRoot(root: PolynomRoot): Solution;
    static fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[];
    static parse(value: Fraction | Root | PolynomRoot | Solution): Solution;
    copy(value: Solution): this;
    clone(): Solution;
    get count(): number;
    get exact(): boolean;
    get fraction(): Fraction;
    isZero(): boolean;
    reduce(): this;
    get root(): Root;
    setExact(value?: boolean): this;
    get value(): number;
    get variable(): string;
    set variable(value: string | undefined);
}
//# sourceMappingURL=solution.d.ts.map