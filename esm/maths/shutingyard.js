export default class Shutingyard {
    _rpn = [];
    _mode;
    _tokenConfig;
    _uniformize;
    constructor(mode) {
        this._mode = typeof mode === 'undefined' ? 'polynom' : mode;
        this.tokenConfigInitialization();
    }
    isOperation(token) {
        if (token[0].match(/[+\-*/^]/g)) {
            return true;
        }
        return false;
    }
    tokenConfigInitialization() {
        if (this._mode === 'set') {
            this._tokenConfig = {
                '&': { precedence: 3, associative: 'left' },
                '|': { precedence: 3, associative: 'left' },
                '!': { precedence: 4, associative: 'right' },
                '-': { precedence: 2, associative: 'left' }
            };
            this._uniformize = false;
        }
        else {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right' },
                '*': { precedence: 3, associative: 'left' },
                '/': { precedence: 3, associative: 'left' },
                '+': { precedence: 2, associative: 'left' },
                '-': { precedence: 2, associative: 'left' },
                '%': { precedence: 3, associative: 'right' },
                'sin': { precedence: 4, associative: 'right' },
                'cos': { precedence: 4, associative: 'right' },
                'tab': { precedence: 4, associative: 'right' },
            };
            this._uniformize = true;
        }
        return this._tokenConfig;
    }
    NextToken2(expr, start) {
        let token, tokenType;
        token = '';
        tokenType = '';
        if (expr[start] === '(') {
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
        else {
            const keys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length);
            for (let key of keys) {
                if (expr.substr(start, key.length) === key) {
                    token += key;
                    tokenType = 'operation';
                    break;
                }
            }
            if (token === '') {
                if (expr[start].match(/[0-9]/)) {
                    token = expr.substr(start).match(/^([0-9.,/]+)/)[0];
                    tokenType = 'coefficient';
                }
                else if (expr[start].match(/[a-zA-Z]/)) {
                    token = expr.substr(start).match(/^([a-zA-Z])/)[0];
                    tokenType = 'variable';
                }
                else {
                    console.log('Unidentified token', expr[start], expr, start);
                    token = expr[start];
                    tokenType = 'monom';
                }
            }
        }
        return [token, start + token.length, tokenType];
    }
    NextToken(expr, start) {
        let tokenMatch, token, tokenType;
        this.NextToken2(expr, start);
        tokenMatch = (expr.substr(start).match(/^[0-9/a-zA-Z^]+/g)) || [];
        if (expr.substr(start, start + 3).match(/^(sin|cos|tan)/g)) {
            token = expr.substr(start, 3);
            tokenType = 'function';
        }
        else if (tokenMatch.length > 0) {
            token = tokenMatch[0];
            tokenType = 'monom';
        }
        else if (expr[start].match(/[+\-*/^]/g)) {
            token = expr[start];
            tokenType = 'operation';
        }
        else if (expr[start].match(/[&|!]/g)) {
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
        if (!this._uniformize) {
            return expr;
        }
        let expr2;
        expr2 = expr.replace(/\)\(/g, ')*(');
        expr2 = expr2.replace(/([\da-zA-Z])(\()/g, "$1*$2");
        expr2 = expr2.replace(/(\))([\da-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([0-9])([a-zA-Z])/g, "$1*$2");
        expr2 = expr2.replace(/([a-zA-Z])([0-9])/g, "$1*$2");
        expr2 = expr2.replace(/([abcxyz])([abcxyz])/g, "$1*$2");
        let fnToken = ['sin', 'cos', 'tan'];
        for (let token of fnToken) {
            expr2 = expr2.replace(new RegExp(token + '\\*', 'g'), token);
        }
        return expr2;
    }
    parse(expr, operators) {
        let outQueue = [], opStack = [], token = '', tokenPos = 0, tokenType = '', previousOpStatckLength = 0;
        expr = this.Uniformizer(expr);
        let securityLoopLvl1 = 50, securityLoopLvl2_default = 50, securityLoopLvl2;
        while (tokenPos < expr.length) {
            securityLoopLvl1--;
            if (securityLoopLvl1 === 0) {
                console.log('SECURITY LEVEL 1 EXIT');
                break;
            }
            [token, tokenPos, tokenType] = this.NextToken2(expr, tokenPos);
            switch (tokenType) {
                case 'monom':
                case 'coefficient':
                case 'variable':
                    outQueue.push({
                        token,
                        tokenType
                    });
                    break;
                case 'operation':
                    previousOpStatckLength = opStack.length;
                    if (opStack.length > 0) {
                        let opTop = opStack[opStack.length - 1];
                        securityLoopLvl2 = +securityLoopLvl2_default;
                        while (opTop.token in this._tokenConfig && ((this._tokenConfig[token].associative === 'left' && this._tokenConfig[token].precedence <= this._tokenConfig[opTop.token].precedence)
                            ||
                                (this._tokenConfig[token].associative === 'right' && this._tokenConfig[token].precedence < this._tokenConfig[opTop.token].precedence))) {
                            securityLoopLvl2--;
                            if (securityLoopLvl2 === 0) {
                                console.log('SECURITY LEVEL 2 OPERATION EXIT');
                                break;
                            }
                            outQueue.push((opStack.pop()) || { token: '', tokenType: 'operation' });
                            if (opStack.length === 0) {
                                break;
                            }
                            opTop = opStack[opStack.length - 1];
                        }
                    }
                    opStack.push({ token, tokenType });
                    break;
                case 'function-argument':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 0) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 FUNCTION ARGUMENT EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    break;
                case '(':
                    opStack.push({ token, tokenType });
                    if (expr[tokenPos] === '-') {
                        outQueue.push({ token: '0', tokenType: 'coefficient' });
                    }
                    break;
                case ')':
                    securityLoopLvl2 = +securityLoopLvl2_default;
                    while (opStack[opStack.length - 1].token !== '(' && opStack.length > 1) {
                        securityLoopLvl2--;
                        if (securityLoopLvl2 === 0) {
                            console.log('SECURITY LEVEL 2 CLOSING PARENTHESE EXIT');
                            break;
                        }
                        outQueue.push((opStack.pop()) || { token, tokenType });
                    }
                    opStack.pop();
                    break;
                case 'function':
                    opStack.push({ token, tokenType });
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
//# sourceMappingURL=shutingyard.js.map