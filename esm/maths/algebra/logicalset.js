"use strict";
/**
 * Polynom module contains everything necessary to handle polynoms.
 * @module Logicalset
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logicalset = void 0;
const shutingyard_1 = require("../shutingyard");
/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
class Logicalset {
    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
    constructor(value) {
        this.parse = (value) => {
            // TODO: Must format the value string to convert some items...
            // Parse the updated value to the shutingyard algorithm
            this._rpn = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.SET).parse(value).rpn;
            return this;
        };
        this._rawString = value;
        this.parse(value);
        return this;
    }
    get isLogicalset() {
        return true;
    }
    ;
    evaluate(tokenSets, reference) {
        let varStack = [];
        let referenceSet;
        if (reference === undefined) {
            referenceSet = new Set();
            for (let key in tokenSets) {
                referenceSet = new Set([...referenceSet, ...tokenSets[key]]);
            }
        }
        else {
            referenceSet = new Set(reference);
        }
        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                // The variable has no token - assume it's empty.
                if (tokenSets[token.token] === undefined) {
                    varStack.push(new Set());
                }
                else {
                    varStack.push(new Set(tokenSets[token.token]));
                }
            }
            else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first].filter(x => second.has(x))));
                        }
                        break;
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first, ...second]));
                        }
                        break;
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            varStack.push(new Set([...first].filter(x => !second.has(x))));
                        }
                        break;
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop();
                            varStack.push(new Set([...referenceSet].filter(x => !first.has(x))));
                        }
                        break;
                }
            }
        }
        return [...varStack[0]].sort();
    }
    vennAB() {
        return this.evaluate({
            A: ['A', 'AB'],
            B: ['B', 'AB']
        }, ['A', 'B', 'AB', 'E']);
    }
    vennABC() {
        return this.evaluate({
            A: ['A', 'AB', 'AC', 'ABC'],
            B: ['B', 'AB', 'BC', 'ABC'],
            C: ['C', 'AC', 'BC', 'ABC']
        }, ['A', 'B', 'C', 'AB', 'AC', 'BC', 'E']);
    }
    get rpn() {
        return this._rpn;
    }
    get tex() {
        let varStack = [];
        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                varStack.push(token);
            }
            else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\cap ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\cup ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(), first = varStack.pop();
                            if (first.tokenType === 'mix') {
                                first.token = `( ${first.token} )`;
                            }
                            if (second.tokenType === 'mix') {
                                second.token = `( ${second.token} )`;
                            }
                            varStack.push({ token: `${first.token} \\setminus ${second.token}`, tokenType: 'mix' });
                        }
                        break;
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop();
                            varStack.push({ token: `\\overline{ ${first.token} }`, tokenType: 'variable' });
                        }
                        break;
                }
            }
        }
        return varStack[0].token;
    }
}
exports.Logicalset = Logicalset;
//# sourceMappingURL=logicalset.js.map