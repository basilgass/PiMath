declare type tokenType = {
    [key: string]: {
        precedence: number;
        associative: string;
    };
};
export default class Shutingyard {
    private _rpn;
    readonly _mode: 'polynom' | 'set';
    private _tokenConfig;
    private _uniformize;
    constructor(mode?: 'polynom' | 'set');
    isOperation(token: string): boolean;
    tokenConfigInitialization(): tokenType;
    NextToken2(expr: string, start: number): [string, number, string];
    NextToken(expr: string, start: number): [string, number, string];
    Uniformizer(expr: string): string;
    parse(expr: string, operators?: string[]): Shutingyard;
    get rpn(): {
        token: string;
        tokenType: string;
    }[];
}
export {};
