import {Expression} from "./expression";

export declare abstract class ExpressionFactor {
    private _argument;
    private _power?;
    private _root?;

    constructor(_argument: Expression | string | number, _power?: number, _root?: number);

    get tex(): string;

    get texArgument(): string;

    get power(): number;
    set power(value: number);

    get root(): number;
    set root(value: number);

    get argument(): Expression | string | number;
    set argument(value: Expression | string | number);

    abstract template(): string;

    abstract derivative(variable: string): Expression;

    abstract integrate(variable: string): Expression;

    hasVariable(variable: string): boolean;

    texPower(tex: string): string;

    texRoot(tex: string): string;

    isZero(): Boolean;
}
