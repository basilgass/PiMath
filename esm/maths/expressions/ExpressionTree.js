"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionNode = exports.ExpressionTree = void 0;
const shutingyard_1 = require("../shutingyard");
class ExpressionTree {
    constructor(value) {
        this._root = this._parse(value);
    }
    get tex() {
        return this._root.tex;
    }
    print() {
        return this._root.print(0, []).join('\n');
    }
    _parse(value) {
        let SY = new shutingyard_1.Shutingyard(shutingyard_1.ShutingyardMode.EXPRESSION).parse(value);
        // Store the rpn
        this._rpn = SY.rpn;
        // Build the tree with nodes.
        let stack = [];
        for (let item of this._rpn) {
            switch (item.tokenType) {
                case shutingyard_1.ShutingyardType.COEFFICIENT:
                    stack.push(new ExpressionNode(item.tokenType, item.token));
                    break;
                case shutingyard_1.ShutingyardType.CONSTANT:
                    stack.push(new ExpressionNode(item.tokenType, item.token));
                    break;
                case shutingyard_1.ShutingyardType.VARIABLE:
                    stack.push(new ExpressionNode(item.tokenType, item.token));
                    break;
                case shutingyard_1.ShutingyardType.OPERATION:
                    if (stack.length >= 2) {
                        let b = stack.pop(), a = stack.pop();
                        stack.push(new ExpressionNode(item.token, a, b));
                    }
                    break;
                case shutingyard_1.ShutingyardType.FUNCTION:
                    let a = stack.pop();
                    switch (item.token) {
                        case 'nthrt':
                            stack.push(new ExpressionNode(item.token, a, stack.pop()));
                            break;
                        default:
                            stack.push(new ExpressionNode(item.token, a));
                    }
                    break;
                default:
                    throw (`Something went wrong while parsing ${value} at ${item.token}`);
            }
        }
        return stack[0];
    }
}
exports.ExpressionTree = ExpressionTree;
const operationFunction = ['nthrt'];
const softwrap = ['*', '^', 'sqrt', 'nthrt'];
function TeXit(value, parentheses, soft) {
    if (value === undefined) {
        return '';
    }
    if (value === null) {
        return '';
    }
    let addParentheses = parentheses === true;
    if (addParentheses) {
        if (soft === true) {
            if (value instanceof ExpressionNode) {
                if (value.isSingle()) {
                    addParentheses = false;
                }
                // The current element might not need to be wrapped.
                if (softwrap.includes(value.op)) {
                    addParentheses = false;
                }
            }
            else {
                addParentheses = false;
            }
        }
    }
    if (value instanceof ExpressionNode) {
        return addParentheses === true ? `\\left( ${value.tex} \\right) ` : value.tex;
    }
    else {
        return value;
    }
}
class ExpressionNode {
    constructor(op, ...children) {
        this._op = op;
        this._children = children;
    }
    get op() {
        return this._op;
    }
    get tex() {
        let a = this._children[0], b = this._children[1];
        switch (this._op) {
            case shutingyard_1.ShutingyardType.COEFFICIENT:
            case shutingyard_1.ShutingyardType.CONSTANT:
            case shutingyard_1.ShutingyardType.VARIABLE:
                if (typeof a === "string") {
                    return a;
                }
                else {
                    return '';
                }
            case '+':
                return `${TeXit(a)} ${this._op} ${TeXit(b)}`;
            case '-':
                return `${TeXit(a)} ${this._op} ${TeXit(b, true, true)}`;
            case '*':
                return `${TeXit(a, true, true)} \\cdot ${TeXit(b, true, true)}`;
            case '/':
                return `\\frac{ ${TeXit(a)} }{ ${TeXit(b)} }`;
            case '^':
                return `${TeXit(a, true)}^{ ${TeXit(b)} }`;
            case 'sqrt':
                return `\\sqrt{ ${TeXit(a)} }`;
            default:
                throw (`Something went wrong with ${this._op}`);
        }
    }
    isSingle() {
        return this._op === shutingyard_1.ShutingyardType.COEFFICIENT ||
            this._op === shutingyard_1.ShutingyardType.VARIABLE ||
            this._op === shutingyard_1.ShutingyardType.CONSTANT;
    }
    print(tab, stack) {
        // Tabulation
        let tabChr = '';
        for (let i = 0; i < tab; i++) {
            tabChr += '\t';
        }
        // Walk through all nodes.
        let row = [`${tabChr}${this._op}`];
        for (let child of this._children) {
            if (child instanceof ExpressionNode) {
                row = [...child.print(tab + 1, row)];
            }
            else {
                row[row.length - 1] += ` -> ${child}`;
            }
        }
        return [...stack, ...row];
    }
}
exports.ExpressionNode = ExpressionNode;
//# sourceMappingURL=ExpressionTree.js.map