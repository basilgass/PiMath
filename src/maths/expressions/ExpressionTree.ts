import {Shutingyard, ShutingyardMode, ShutingyardType, Token} from "../shutingyard";

export class ExpressionTree {
    private _root: ExpressionNode
    private _rpn: Token[]

    constructor(value: string) {
        this._root = this._parse(value)
    }

    get tex(): string {
        return this._root.tex
    }

    print(): string {
        return this._root.print(0, []).join('\n')
    }

    private _parse(value: string) {
        let SY = new Shutingyard(ShutingyardMode.EXPRESSION).parse(value)

        // Store the rpn
        this._rpn = SY.rpn

        // Build the tree with nodes.
        let stack: ExpressionNode[] = []

        for (let item of this._rpn) {
            switch (item.tokenType) {
                case ShutingyardType.COEFFICIENT:
                    stack.push(new ExpressionNode(item.tokenType, item.token))
                    break
                case ShutingyardType.CONSTANT:
                    stack.push(new ExpressionNode(item.tokenType, item.token))
                    break
                case ShutingyardType.VARIABLE:
                    stack.push(new ExpressionNode(item.tokenType, item.token))
                    break
                case ShutingyardType.OPERATION:
                    if (stack.length >= 2) {
                        let b = stack.pop(),
                            a = stack.pop()

                        stack.push(new ExpressionNode(item.token, a, b))
                    }
                    break
                case ShutingyardType.FUNCTION:
                    let a = stack.pop()

                    switch (item.token) {
                        case 'nthrt':
                            stack.push(new ExpressionNode(item.token, a, stack.pop()))
                            break
                        default:
                            stack.push(new ExpressionNode(item.token, a))
                    }

                    break
                default:
                    throw(`Something went wrong while parsing ${value} at ${item.token}`)
            }
        }

        return stack[0]
    }
}

const operationFunction: string[] = ['nthrt']
const softwrap: string[] = ['*', '^', 'sqrt', 'nthrt']
function TeXit(value: ExpressionNode | string, parentheses?:boolean, soft?:boolean): string {
    if (value === undefined) {
        return ''
    }
    if (value === null) {
        return ''
    }

    let addParentheses = parentheses===true
    if(addParentheses){
        if(soft===true){
            if(value instanceof ExpressionNode){
                if(value.isSingle()){
                    addParentheses = false
                }
                // The current element might not need to be wrapped.
                if(softwrap.includes(value.op)){
                    addParentheses = false
                }
            }else{
                addParentheses = false
            }
        }
    }

    if (value instanceof ExpressionNode) {
        return addParentheses===true?`\\left( ${ value.tex } \\right) `:value.tex
    } else {
        return value
    }
}

export class ExpressionNode {
    private _children: (ExpressionNode | string)[]
    private _op: string

    constructor(op: string, ...children: (ExpressionNode | string)[]) {
        this._op = op
        this._children = children
    }

    get op(): string {
        return this._op;
    }

    get tex(): string {
        let a = this._children[0],
            b = this._children[1]

        switch (this._op) {
            case ShutingyardType.COEFFICIENT:
            case ShutingyardType.CONSTANT:
            case ShutingyardType.VARIABLE:
                if (typeof a === "string") {
                    return a
                } else {
                    return ''
                }
            case '+':
                return `${TeXit(a)} ${this._op} ${TeXit(b)}`
            case'-':
                return `${TeXit(a)} ${this._op} ${TeXit(b, true, true)}`
            case '*':
                return `${TeXit(a, true, true)} \\cdot ${TeXit(b, true, true)}`
            case '/':
                return `\\frac{ ${TeXit(a)} }{ ${TeXit(b)} }`
            case '^':
                return `${TeXit(a, true)}^{ ${TeXit(b)} }`
            case 'sqrt':
                return `\\sqrt{ ${TeXit(a)} }`
            default:
                throw(`Something went wrong with ${this._op}`)
        }
    }

    isSingle() {
        return this._op === ShutingyardType.COEFFICIENT ||
            this._op === ShutingyardType.VARIABLE ||
            this._op === ShutingyardType.CONSTANT
    }

    print(tab: number, stack: string[]): string[] {
        // Tabulation
        let tabChr = ''
        for (let i = 0; i < tab; i++) {
            tabChr += '\t'
        }

        // Walk through all nodes.
        let row: string[] = [`${tabChr}${this._op}`]

        for (let child of this._children) {
            if (child instanceof ExpressionNode) {
                row = [...child.print(tab + 1, row)]
            } else {
                row[row.length - 1] += ` -> ${child}`
            }

        }

        return [...stack, ...row]
    }
}