export type tokenType = {
    [key: string]: {
        precedence: number,
        associative: string,
        type: string
    }
}

export const tokenConstant: { [Key: string]: number } = {
    pi: Math.PI,
    e: Math.exp(1)
}

export enum ShutingyardType {
    VARIABLE = 'variable',
    COEFFICIENT = 'coefficient',
    OPERATION = 'operation',
    CONSTANT = 'constant',
    FUNCTION = 'function',
    MONOM = 'monom'
}

export enum ShutingyardMode {
    POLYNOM = 'polynom',
    SET = 'set',
    NUMERIC = 'numeric'
}

export type Token = { token: string, tokenType: string }

export class Shutingyard {
    readonly _mode: ShutingyardMode;
    private _tokenConfig: tokenType;
    private _tokenConstant: { [Key: string]: number }
    private _tokenKeys: string[]
    private _uniformize: boolean;

    constructor(mode?: ShutingyardMode) {
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode;
        this.tokenConfigInitialization()
    }

    private _rpn: Token[] = [];

    // Getter
    get rpn() {
        // console.log(this._rpn)
        return this._rpn;
    }

    /**
     * Determin if the token is a defined operation
     * Defined operations: + - * / ^ sin cos tan
     * @param token
     */
    // isOperation(token: string): boolean {
    //     if (token[0].match(/[+\-*/^]/g)) {
    //         return true;
    //     }
    //     //
    //     // if (token.match(/^sin|cos|tan/g)) {
    //     //     return true;
    //     // }
    //
    //     return false;
    // }

    tokenConfigInitialization(): tokenType {
        if (this._mode === ShutingyardMode.SET) {
            this._tokenConfig = {
                '&': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '|': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '!': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION}
            }
            this._uniformize = false;
        } else if (this._mode === ShutingyardMode.NUMERIC) {
            this._tokenConfig = {
                '^': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '*': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '/': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '+': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '%': {precedence: 3, associative: 'right', type: ShutingyardType.OPERATION},
                'sin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'cos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'tan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                'sqrt': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
            }
            this._uniformize = false
        } else {
            this._tokenConfig = {
                '^': {precedence: 4, associative: 'right', type: ShutingyardType.OPERATION},
                '*': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '/': {precedence: 3, associative: 'left', type: ShutingyardType.OPERATION},
                '+': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                '-': {precedence: 2, associative: 'left', type: ShutingyardType.OPERATION},
                // '%': {precedence: 3, associative: 'right', type: ShutingyardType.OPERATION},
                // 'sin': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                // 'cos': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
                // 'tan': {precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION},
            }
            this._uniformize = true
        }

        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length)
        return this._tokenConfig
    }

    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr: string, start: number): [string, number, string] {
        let token: string, tokenType: string;
        token = '';
        tokenType = '';
        // Case of parenthesis or comma (generic items)
        if (expr[start] === '(') {
            token = '(';
            tokenType = '(';
        }
        // It's a closing parenthese
        else if (expr[start] === ')') {
            token = ')';
            tokenType = ')';
        }
        // It's an argument separator for a function
        else if (expr[start] === ',') {
            token = ',';
            tokenType = 'function-argument';
        } else {
            // Order token keys by token characters length (descending)
            // TODO: this is done each time ! SHould be done once !
            // const keys = Object.keys(this._tokenConfig).sort((a,b)=>b.length-a.length)

            // Extract operation and function tokens
            for (let key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = this._tokenConfig[key].type
                    break
                }
            }

            // Extract constant
            for (let key in tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = ShutingyardType.CONSTANT
                    break
                }
            }

            if (token === '') {
                // No function found ! Might be a coefficient !
                if (expr[start].match(/[0-9]/)) {
                    if (this._mode === ShutingyardMode.POLYNOM && false) {
                        token = expr.substring(start).match(/^([0-9.,/]+)/)[0]
                    } else {
                        token = expr.substring(start).match(/^([0-9.,]+)/)[0]
                    }
                    tokenType = ShutingyardType.COEFFICIENT
                } else if (expr[start].match(/[a-zA-Z]/)) {
                    token = expr.substring(start).match(/^([a-zA-Z])/)[0]
                    tokenType = ShutingyardType.VARIABLE
                } else {
                    console.log('Unidentified token', expr[start], expr, start)
                    token = expr[start]
                    tokenType = ShutingyardType.MONOM
                }

            }
        }

        return [token, start + token.length, tokenType];
    }

    /**
     * Sanitize an expression by adding missing common operation (multiplication between parentheseses)
     * @param expr
     * @constructor
     */
    Uniformizer(expr: string): string {
        // Determiner if need to be uniformized
        if (!this._uniformize) {
            return expr
        }

        let expr2;

        // Replace missing multiplication between two parenthese
        expr2 = expr.replace(/\)\(/g, ')*(');

        // Replace missing multiplication between number or setLetter and parenthese.

        // 3x(x-4) => 3x*(x-4)
        expr2 = expr2.replace(/([\da-zA-Z])(\()/g, "$1*$2");

        // (x-4)3x => (x-4)*3x
        expr2 = expr2.replace(/(\))([\da-zA-Z])/g, "$1*$2");

        // Add multiplication between number and letters.
        // 3x => 3*x
        expr2 = expr2.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([a-zA-Z])([0-9])/g, "$1*$2");

        // Add multiplication between letters ?
        // TODO: More robust solution to handle all letters ?
        expr2 = expr2.replace(/([abcxyz])([abcxyz])/g, "$1*$2");

        // Restore operation auto formating (prevent adding the mutliplcation star)
        // TODO: Accept list of functions
        let fnToken = ['sin', 'cos', 'tan']
        for (let token of fnToken) {
            expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
        }

        return expr2;
    }

    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     * @param operators
     */
    parse(expr: string, operators?: string[]): Shutingyard {
        let outQueue: { token: string, tokenType: string }[] = [],    // Output queue
            opStack: { token: string, tokenType: string }[] = [],     // Operation queue
            token: string = '',
            tokenPos: number = 0,
            tokenType: string = '',
            previousOpStatckLength = 0

        expr = this.Uniformizer(expr);

        let securityLoopLvl1 = 50,
            securityLoopLvl2_default = 50,
            securityLoopLvl2;

        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }

            // Get the next token and the corresponding new (ending) position
            [token, tokenPos, tokenType] = this.NextToken(expr, tokenPos);

            switch (tokenType) {
                case 'monom':
                case 'coefficient':
                case 'variable':
                case 'constant':
                    outQueue.push({
                        token,
                        tokenType
                    });
                    // if(previousOpStatckLength == opStack.length && outQueue.length>=2){
                    //     console.log('opStatckLength', outQueue, opStack.length)
                    //     outQueue.push('*')
                    // }
                    break;
                case 'operation':
                    previousOpStatckLength = opStack.length;
                    //If the token is an operator, o1, then:
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];


                        securityLoopLvl2 = +securityLoopLvl2_default;

                        //while there is an operator token o2, at the top of the operator stack and
                        while (opTop.token in this._tokenConfig && (
                                //either o1 is left-associative and its precedence is less than or equal to that of o2,
                                (this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                                ||
                                //or o1 is right associative, and has precedence less than that of o2,
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence)
                            )
                            ) {

                            /* Security exit ! */
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }

                            // Add the operation to the queue
                            outQueue.push((opStack.pop()) || {token: '', tokenType: 'operation'});

                            // Get the next operation on top of the Stack.
                            if (opStack.length === 0) {
                                break;
                            }
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    //at the end of iteration push o1 onto the operator stack
                    opStack.push({token, tokenType});
                    break;
                case 'function-argument':
                    // TODO: check if the opStack exist.
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 0) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT');
                            break;
                        }

                        outQueue.push((opStack.pop()) || {token, tokenType});
                    }
                    break;
                case '(':
                    opStack.push({token, tokenType});
                    // Add an empty value if next element is negative.
                    if (expr[tokenPos] === '-') {
                        outQueue.push({token: '0', tokenType: 'coefficient'});
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1 /*Maybe zero !? */) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }

                        outQueue.push((opStack.pop()) || {token, tokenType});
                    }

                    //Pop the left parenthesis from the stack, but not onto the output queue.
                    opStack.pop();
                    break;
                case 'function':
                    opStack.push({token, tokenType});
                    break;
                default:
                    // In theory, everything should be handled.
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `);
            }

            // Output
            // console.log(outQueue.concat(opStack.reverse()).join(" "));
        }

        // console.log(outQueue.concat(opStack.reverse()));
        this._rpn = outQueue.concat(opStack.reverse());

        return this;
    }


}
