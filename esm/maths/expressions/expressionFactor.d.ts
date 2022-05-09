import { Expression } from "./internals";
export declare abstract class ExpressionFactor {
    private _argument;
    private _power?;
    private _root?;
    private _inline?;
    constructor(_argument: Expression, _power?: number, _root?: number, _inline?: boolean);
    get inline(): boolean;
    set inline(value: boolean);
    get tex(): string;
    get power(): number;
    set power(value: number);
    get root(): number;
    set root(value: number);
    get argument(): Expression;
    set argument(value: Expression);
    abstract makeTeX(numberOfFactors?: number, position?: number): string;
    abstract derivative(variable: string): Expression;
    abstract integrate(variable: string): Expression;
    hasVariable(variable?: string): boolean;
    isNumeric(): boolean;
    hasRoot(): boolean;
    hasPower(inline?: boolean): boolean;
    texPowerAndRoot(tex: string): string;
    texPower(tex: string): string;
    wrapWithParentheses(tex: string): string;
    texRoot(tex: string): string;
    isZero(): Boolean;
}
