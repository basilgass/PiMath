import { ExpressionFactor } from "./internals";
export declare class ExpressionMember {
    private _factors;
    constructor(...values: ExpressionFactor[]);
    get factors(): ExpressionFactor[];
    set factors(value: ExpressionFactor[]);
    get numerator(): ExpressionFactor[];
    get denominator(): ExpressionFactor[];
    get tex(): string;
    opposed(): ExpressionMember;
    add(value: ExpressionFactor): ExpressionMember;
    addFactors(...values: ExpressionFactor[]): ExpressionMember;
    isZero(): Boolean;
    hasVariable(variable?: string): boolean;
    isNumeric(): boolean;
}
