import { ExpressionFactor, ExpressionMember } from "./internals";
export declare type ExpressionMemberType = {
    member: ExpressionMember;
    sign: number;
};
export declare class Expression {
    private _members;
    constructor(...values: (ExpressionMember | ExpressionFactor | ExpressionMemberType)[]);
    get tex(): string;
    get members(): ExpressionMemberType[];
    set members(value: ExpressionMemberType[]);
    addMembers(...values: (ExpressionMemberType | ExpressionMember | ExpressionFactor)[]): Expression;
    add(value: Expression | ExpressionMember | ExpressionFactor): this;
    subtract(value: Expression | ExpressionMember | ExpressionFactor): this;
    hasVariable(variable?: string): boolean;
    isZero(): boolean;
    isNumeric(): boolean;
    isSingle(): Boolean;
    isFactor(): Boolean;
    structure(depth?: number): string;
}
