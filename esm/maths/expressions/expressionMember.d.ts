import {ExpressionFactor} from "./expressionFactor";

export declare class ExpressionMember {
    private _factors;
    get factors(): ExpressionFactor[];
    set factors(value: ExpressionFactor[]);

    get numerator(): ExpressionFactor[];

    get denominator(): ExpressionFactor[];

    addFactors(...values: ExpressionFactor[]): ExpressionMember;

    isZero(): Boolean;

    hasVariable(variable: string): boolean;
}
