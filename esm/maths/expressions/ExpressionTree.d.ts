export declare class ExpressionTree {
    private _root;
    private _rpn;
    constructor(value: string);
    get tex(): string;
    print(): string;
    private _parse;
}
export declare class ExpressionNode {
    private _children;
    private _op;
    constructor(op: string, ...children: (ExpressionNode | string)[]);
    get op(): string;
    get tex(): string;
    isSingle(): boolean;
    print(tab: number, stack: string[]): string[];
}
