"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutingyard = void 0;
class Shutingyard {
    constructor() {
        this._rpn = [];
    }
    isOperation(token) {
        if (token[0].match(/[+\-*/^]/g)) {
            return true;
        }
        if (token.match(/^sin|cos|tan/g)) {
            return true;
        }
        return false;
    }
    NextToken(expr, start) {
        let tokenMatch, token, tokenType;
        tokenMatch = (expr.substr(start).match(/^[0-9/a-z^]+/g)) || [];
        if (tokenMatch.length > 0) {
            token = tokenMatch[0];
            tokenType = 'monom';
        }
        else if (expr[start].match(/[+\-*/^]/g)) {
            token = expr[start];
            tokenType = 'operation';
        }
        else if (expr[start] === '(') {
            token = '(';
            tokenType = '(';
        }
        else if (expr[start] === ')') {
            token = ')';
            tokenType = ')';
        }
        else if (expr[start] === ',') {
            token = ',';
            tokenType = 'function-argument';
        }
        else if (expr.match(/^(sin|cos|tan)/g)) {
            token = ')';
            tokenType = ')';
        }
        else {
            token = tokenMatch[0];
            tokenType = 'monom';
            if (token === '') {
                token = expr[start];
                tokenType = 'monom';
                console.log('SHUTING YARD - NEXT TOKEN: error at ', start);
            }
        }
        return [token, start + token.length, tokenType];
    }
    Uniformizer(expr) {
        let expr2;
        expr2 = expr.replace(/\)\(/g, ')*(');
        expr2 = expr2.replace(/([\da-z])(\()/g, "$1*$2");
        expr2 = expr2.replace(/(\))([\da-z])/g, "$1*$2");
        return expr2;
    }
    parse(expr) {
        let outQueue = [], opStack = [], precedence = {
            '^': 4,
            '*': 3,
            '/': 3,
            '+': 2,
            '-': 2
        }, associative = {
            '^': 'right',
            '*': 'left',
            '/': 'left',
            '+': 'left',
            '-': 'left'
        }, token = '', tokenPos = 0, tokenType = '';
        expr = this.Uniformizer(expr);
        let securityLoopLvl1 = 50, securityLoopLvl2_default = 50, securityLoopLvl2;
        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }
            [token, tokenPos, tokenType] = this.NextToken(expr, tokenPos);
            switch (tokenType) {
                case 'monom':
                    outQueue.push(token);
                    break;
                case 'operation':
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];
                        securityLoopLvl2 = +securityLoopLvl2_default;
                        while (opTop in associative && ((associative[token] === 'left' && precedence[token] <= precedence[opTop])
                            ||
                                (associative[token] === 'right' && precedence[token] < precedence[opTop]))) {
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }
                            outQueue.push((opStack.pop()) || '');
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    opStack.push(token);
                    break;
                case 'trigo':
                    opStack.push(token);
                    break;
                case 'function-argument':
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
                    if (expr[tokenPos] === '-') {
                        outQueue.push('0');
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1] !== '(' && opStack.length > 1) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || '');
                    }
                    opStack.pop();
                    break;
                default:
                    console.log(`SHUTING YARD: ${tokenType} : ${token} `);
            }
        }
        this._rpn = outQueue.concat(opStack.reverse());
        return this;
    }
    get rpn() {
        return this._rpn;
    }
}
exports.Shutingyard = Shutingyard;
//# sourceMappingURL=shutingyard.js.map