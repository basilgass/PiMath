import {ExpressionMember} from "./expressionMember";

export declare class Expression {
    private _members;

    constructor();

    get tex(): string;

    get members(): ExpressionMember[];
    set members(value: ExpressionMember[]);

    addMembers(...values: ExpressionMember[]): Expression;

    hasVariable(variable: string): boolean;

    isZero(): boolean;
}
