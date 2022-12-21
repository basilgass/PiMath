import { ExpressionFactor, ExpressionMember } from "./internals";
export type ExpressionMemberType = {
    member: ExpressionMember;
    sign: number;
};
export declare class Expression {
    private _members;
    constructor(...values: (ExpressionMember | ExpressionFactor | ExpressionMemberType)[]);
    get tex(): string;
    get display(): string;
    get members(): ExpressionMemberType[];
    set members(value: ExpressionMemberType[]);
    addMembers(...values: (ExpressionMemberType | ExpressionMember | ExpressionFactor)[]): Expression;
    add(value: Expression | ExpressionMember | ExpressionFactor): this;
    subtract(value: Expression | ExpressionMember | ExpressionFactor): this;
    variables(): string[];
    isPolynom(): Boolean;
    getAllFactors(): ExpressionFactor[];
    hasVariable(variable?: string): boolean;
    isZero(): boolean;
    isNumeric(): boolean;
    isNumber(): boolean;
    isSingle(): Boolean;
    isFactor(): Boolean;
    structure(depth?: number): string;
    reduce(): Expression;
}
