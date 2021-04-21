export class Shutingyard {
    private _rpn: string[] = [];

    /**
     * Determin if the token is a defined operation
     * Defined operations: + - * / ^ sin cos tan
     * @param token
     */
    isOperation(token: string): boolean {
        if (token[0].match(/[+\-*/^]/g)) {
            return true;
        }
        if (token.match(/^sin|cos|tan/g)) {
            return true;
        }

        return false;
    }

    /**
     * Get the next token to analyse.
     * @param expr (string) Expression to analyse
     * @param start (number) CUrrent position in the expr string.
     */
    NextToken(expr: string, start: number): [string, number, string] {
        let tokenMatch: string[], token: string, tokenType: string;

        // Detect a fraction monoms or return empty array
        tokenMatch = (expr.substr(start).match(/^[0-9/a-z^]+/g)) || [];

        if (tokenMatch.length > 0) {
            token = tokenMatch[0];
            tokenType = 'monom';
        }
        // It's an operation !
        else if (expr[start].match(/[+\-*/^]/g)) {
            token = expr[start];
            tokenType = 'operation';
        }
        // It's an opening parenthese
        else if (expr[start] === '(') {
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
        }
        // It's a (basic) trigonometry function
        else if (expr.match(/^(sin|cos|tan)/g)) {
            token = ')';
            tokenType = ')';
        }
            // TODO: Add other functions !

        // It's a monom.
        else {
            // TODO: Actually, negative exposant aren't supported.
            // token = (expr.substr(start).match(/^[\da-z\^]+/g)[0])||'';
            token = tokenMatch[0];
            tokenType = 'monom';

            if (token === '') {
                token = expr[start];
                tokenType = 'monom';
                console.log('SHUTING YARD - NEXT TOKEN: error at ', start);
            }
        }


        // console.log(token, start + token.length, tokenType);
        return [token, start + token.length, tokenType];
    }

    /**
     * Sanitize an expression by adding missing common operation (multiplication between parentheseses)
     * @param expr
     * @constructor
     */
    Uniformizer(expr: string): string {
        let expr2;
        // Replace missing multiplication between two parenthese
        expr2 = expr.replace(/\)\(/g, ')*(');

        // Replace missing multiplication between number or setLetter and parenthese.
        expr2 = expr2.replace(/([\da-z])(\()/g, "$1*$2");
        expr2 = expr2.replace(/(\))([\da-z])/g, "$1*$2");

        // TODO: must handle trigonometric or any other function identifier
        return expr2;
    }

    /**
     * Parse an expression using the shutting yard tree algorithms
     * @param expr (string) Expression to analyse
     * Returns a RPN list of items.
     */
    parse(expr: string): Shutingyard {
        let outQueue: string[] = [],
            opStack: string[] = [],
            precedence: { [Key: string]: number } = {
                '^': 4,
                '*': 3,
                '/': 3,
                '+': 2,
                '-': 2
            },
            associative: { [Key: string]: string } = {
                '^': 'right',
                '*': 'left',
                '/': 'left',
                '+': 'left',
                '-': 'left'
            },
            token: string = '',
            tokenPos: number = 0,
            tokenType: string = '';

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
                    outQueue.push(token);
                    break;
                case 'operation':
                    //If the token is an operator, o1, then:

                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];

                        securityLoopLvl2 = +securityLoopLvl2_default;

                        //while there is an operator token o2, at the top of the operator stack and
                        while (opTop in associative && (
                                //either o1 is left-associative and its precedence is less than or equal to that of o2,
                                (associative[token] === 'left' && precedence[token] <= precedence[opTop])
                                ||
                                //or o1 is right associative, and has precedence less than that of o2,
                                (associative[token] === 'right' && precedence[token] < precedence[opTop])
                            )
                            ) {

                            /* Security exit ! */
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }

                            // Add the operation to the queue
                            outQueue.push((opStack.pop()) || '');

                            // Get the next operation on top of the Stack.
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    //at the end of iteration push o1 onto the operator stack
                    opStack.push(token);
                    break;
                case 'trigo':
                    opStack.push(token);
                    break;
                case 'function-argument':
                    // TODO: check if the opStack exist.
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1] !== '(' && opStack.length > 0) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT');
                            break;
                        }

                        outQueue.push((opStack.pop()) || '');
                    }
                    break;
                case '(':
                    opStack.push(token);
                    // Add an empty value if next element is negative.
                    // console.log(token, tokenPos, expr[tokenPos], expr[tokenPos+1]);
                    if(expr[tokenPos]==='-') {
                        outQueue.push('0');
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    //Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
                    while (opStack[opStack.length - 1] !== '(' && opStack.length > 1 /*Maybe zero !? */) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }

                        outQueue.push((opStack.pop()) || '');
                    }

                    //Pop the left parenthesis from the stack, but not onto the output queue.
                    opStack.pop();
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


    // Getter
    get rpn() {
        return this._rpn;
    }


}
