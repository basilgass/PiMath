import { ExpressionFactor } from "./internals";
export declare class ExpressionMember {
    private _factors;
    constructor(...values: ExpressionFactor[]);
    get factors(): ExpressionFactor[];
    set factors(value: ExpressionFactor[]);
    get numerator(): ExpressionFactor[];
    get denominator(): ExpressionFactor[];
    get tex(): string;
    get display(): string;
    toString(asTex: boolean): string;
    add(value: ExpressionFactor): ExpressionMember;
    addFactors(...values: ExpressionFactor[]): ExpressionMember;
    isZero(): Boolean;
    hasVariable(variable?: string): boolean;
    isNumeric(): boolean;
    /**
     * Returns the "coefficient", ie a member with only numeric values factors.
     */
    coefficient(): ExpressionMember;
    /**
     * Returns a member with all factors containing a literal part.
     */
    literal(): ExpressionMember;
    similarTo(member: ExpressionMember): boolean;
    reduce(): ExpressionMember;
}
