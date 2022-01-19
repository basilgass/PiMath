"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutingyard = exports.ShutingyardMode = exports.ShutingyardType = exports.tokenConstant = void 0;
exports.tokenConstant = {
    pi: Math.PI,
    e: Math.exp(1)
};
var ShutingyardType;
(function (ShutingyardType) {
    ShutingyardType["VARIABLE"] = "variable";
    ShutingyardType["COEFFICIENT"] = "coefficient";
    ShutingyardType["OPERATION"] = "operation";
    ShutingyardType["CONSTANT"] = "constant";
    ShutingyardType["FUNCTION"] = "function";
    ShutingyardType["MONOM"] = "monom";
})(ShutingyardType = exports.ShutingyardType || (exports.ShutingyardType = {}));
var ShutingyardMode;
(function (ShutingyardMode) {
    ShutingyardMode["POLYNOM"] = "polynom";
    ShutingyardMode["SET"] = "set";
    ShutingyardMode["NUMERIC"] = "numeric";
})(ShutingyardMode = exports.ShutingyardMode || (exports.ShutingyardMode = {}));
class Shutingyard {
    _rpn = [];
    _mode;
    _tokenConfig;
    _tokenConstant;
    _uniformize;
    _tokenKeys;
    constructor(mode) {
        this._mode = typeof mode === 'undefined' ? ShutingyardMode.POLYNOM : mode;
        this.tokenConfigInitialization();
    }
    tokenConfigInitialization() {
        if (this._mode === ShutingyardMode.SET) {
            this._tokenConfig = {
                '&': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '|': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '!': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION }
            };
            this._uniformize = false;
        }
        else if (this._mode === ShutingyardMode.NUMERIC) {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
        }
        else {
            this._tokenConfig = {
                '^': { precedence: 4, associative: 'right', type: ShutingyardType.OPERATION },
                '*': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '/': { precedence: 3, associative: 'left', type: ShutingyardType.OPERATION },
                '+': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '-': { precedence: 2, associative: 'left', type: ShutingyardType.OPERATION },
                '%': { precedence: 3, associative: 'right', type: ShutingyardType.OPERATION },
                'sin': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'cos': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
                'tan': { precedence: 4, associative: 'right', type: ShutingyardType.FUNCTION },
            };
            this._uniformize = true;
        }
        this._tokenKeys = Object.keys(this._tokenConfig).sort((a, b) => b.length - a.length);
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
            for (let key of this._tokenKeys) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = this._tokenConfig[key].type;
                    break;
                }
            }
            for (let key in exports.tokenConstant) {
                if (expr.substring(start, start + key.length) === key) {
                    token += key;
                    tokenType = ShutingyardType.CONSTANT;
                    break;
                }
            }
            if (token === '') {
                if (expr[start].match(/[0-9]/)) {
                    if (this._mode === ShutingyardMode.POLYNOM) {
                        token = expr.substring(start).match(/^([0-9.,/]+)/)[0];
                    }
                    else {
                        token = expr.substring(start).match(/^([0-9.,]+)/)[0];
                    }
                    tokenType = ShutingyardType.COEFFICIENT;
                }
                else if (expr[start].match(/[a-zA-Z]/)) {
                    token = expr.substring(start).match(/^([a-zA-Z])/)[0];
                    tokenType = ShutingyardType.VARIABLE;
                }
                else {
                    console.log('Unidentified token', expr[start], expr, start);
                    token = expr[start];
                    tokenType = ShutingyardType.MONOM;
                }
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
                case 'constant':
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
exports.Shutingyard = Shutingyard;
//# sourceMappingURL=shutingyard.js.map