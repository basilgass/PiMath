import { Polynom, PolynomParsingType } from "../algebra/polynom";
import { Fraction, FractionParsingType } from "../coefficients/fraction";
type PolynomExpMathFunctionType = {
    name: string;
    fn: Function;
    tex: string;
};
export declare class PolynomExpFactor {
    constructor(polynom: PolynomParsingType, degree?: FractionParsingType, mathFunction?: PolynomExpMathFunctionType);
    private _forceParenthesis;
    get forceParenthesis(): boolean;
    set forceParenthesis(value: boolean);
    private _fn;
    get fn(): PolynomExpMathFunctionType;
    set fn(value: PolynomExpMathFunctionType);
    private _powerAsInteger;
    get powerAsInteger(): boolean;
    set powerAsInteger(value: boolean);
    private _polynom;
    get polynom(): Polynom;
    set polynom(value: Polynom);
    private _degree;
    get degree(): Fraction;
    set degree(value: Fraction);
    get tex(): string;
    get isCoefficient(): boolean;
    get firstCoefficient(): Fraction;
    private get _texDegree();
    setForceParenthesis(value?: boolean): PolynomExpFactor;
    derivative(letter?: string): PolynomExpProduct;
}
export declare class PolynomExpProduct {
    constructor(...values: PolynomExpFactor[]);
    private _fn;
    get fn(): PolynomExpMathFunctionType;
    set fn(value: PolynomExpMathFunctionType);
    private _factors;
    get factors(): PolynomExpFactor[];
    set factors(value: PolynomExpFactor[]);
    private _positive;
    get positive(): boolean;
    set positive(value: boolean);
    private _asPositiveDegree;
    get asPositiveDegree(): boolean;
    set asPositiveDegree(value: boolean);
    get tex(): string;
    reduce(): PolynomExpProduct;
    integrate(letter?: string): PolynomExpProduct;
    applyMathFunction(mathFn: PolynomExpMathFunctionType): PolynomExpProduct;
    private _integrateWithInternalDerivative;
}
export {};
