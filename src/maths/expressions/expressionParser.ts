import {
    ExpFactor,
    ExpFactorConstant,
    ExpFactorNumber,
    ExpFactorPower,
    ExpFactorTrigo,
    ExpFactorVariable,
    Expression,
    ExpressionFactor,
    ExpressionMember,
    Shutingyard,
    ShutingyardMode,
    ShutingyardType,
    TRIGONOMETRIC
} from "./internals";

function dlog(...values: unknown[]): void {
    if (false) {
        console.log(...values)
    }
}

export class ExpressionParser {
    private _expression: Expression

    constructor(value: string) {
        this._expression = this.parse(value)

    }

    get expression(): Expression {
        return this._expression
    }


    private parse(value: string): Expression {
        let expr: Expression[],
            SY = new Shutingyard(ShutingyardMode.EXPRESSION).parse(value),
            rpn = SY.rpn,
            stack: (Expression | ExpressionMember | ExpressionFactor)[] = []

        dlog(SY.rpn)
        dlog(SY.normalize(value))
        for (let item of rpn) {
            dlog('BEFORE', item.token, stack.map(s => s.tex))
            switch (item.tokenType) {
                case ShutingyardType.COEFFICIENT:
                    stack.push(new ExpFactorNumber(+item.token))
                    break

                case ShutingyardType.CONSTANT:
                    stack.push(new ExpFactorConstant(item.token))
                    break

                case ShutingyardType.VARIABLE:
                    stack.push(new ExpFactorVariable(item.token))
                    break

                case ShutingyardType.OPERATION:
                    // for an operation, the stack length should be two
                    if (stack.length >= 2) {
                        let b = stack.pop(),
                            a = stack.pop()
                        // dlog('OPERATION A - B', stack.map(s=>s.tex))
                        switch (item.token) {
                            case "+":
                                stack.push(this.tokenOperationPlus(a, b))
                                break
                            case "-":
                                stack.push(this.tokenOperationMinus(a, b))
                                break

                            case "*":
                                stack.push(this.tokenOperationMultiply(a, b))
                                break;

                            case "/":
                                stack.push(this.tokenOperationDivide(a, b))
                                break;

                            case "^":
                                stack.push(this.tokenOperationPower(a, b))
                                break;
                        }

                    } else {
                        // TODO: handle stack size of one when applying an operation
                    }

                    break

                case ShutingyardType.FUNCTION:
                    let a = stack.pop()

                    if (item.token === 'sqrt') {
                        stack.push(this.tokenOperationSqrt(a))
                    } else if (item.token === 'nthrt') {
                        stack.push(this.tokenOperationRoot(a, stack.pop()))
                    } else if (item.token in TRIGONOMETRIC) {
                        if (!(a instanceof Expression)) {
                            a = new Expression(a)
                        }
                        stack.push(new ExpFactorTrigo(item.token, a))
                    }
                    break

                default:
                    throw('Something went wrong while parsing ' + value + ' at ' + item.token)
            }

            dlog('AFTER', item.token, stack.map(s => s.tex))
            dlog('----------')
        }


        // Build the output expression.
        let output = new Expression()
        for (let item of stack) {
            if (item instanceof Expression) {
                output.addMembers(...item.members)
            } else if (item instanceof ExpressionMember) {
                output.addMembers(item)
            } else if (item instanceof ExpressionFactor) {
                output.addMembers(item)
            }
        }

        return output
        // TODO: in the stack, there might be an Expression, ExpressionMember or an ExpressionFactor.
        // @ts-ignore
        // return new Expression(...stack.map(
        //     item=>{
        //         return item instanceof ExpressionFactor ? new ExpressionMember(item) : item;
        //     }
        // ))
    }


    private tokenOperationPlus(a: Expression | ExpressionMember | ExpressionFactor, b: Expression | ExpressionMember | ExpressionFactor): Expression {

        if (a instanceof ExpressionMember || a instanceof ExpressionFactor) {
            a = new Expression(a)
        }

        return a.add(b)
    }

    private tokenOperationMultiply(a: Expression | ExpressionMember | ExpressionFactor, b: Expression | ExpressionMember | ExpressionFactor): ExpressionMember {
        let EM = new ExpressionMember()
        if (a instanceof Expression) {
            EM.addFactors(new ExpFactor(a))
            // a = new ExpFactor(a)
        } else if (a instanceof ExpressionMember) {
            // a.add()
            EM.addFactors(...a.factors)
            // a = new ExpFactor(new Expression(a))
        } else if (a instanceof ExpressionFactor) {
            // Do nothing
            EM.addFactors(a)
        }

        if (b instanceof Expression) {
            // b = new ExpFactor(b)
            EM.addFactors(new ExpFactor(b))
        } else if (b instanceof ExpressionMember) {
            // b = new ExpFactor(new Expression(b))
            EM.addFactors(...b.factors)
        } else if (b instanceof ExpressionFactor) {
            // Do nothing
            EM.addFactors(b)
        }

        return EM
    }

    private tokenOperationDivide(a: Expression | ExpressionMember | ExpressionFactor, b: Expression | ExpressionMember | ExpressionFactor): ExpressionMember {
        let EM = new ExpressionMember()

        if (a instanceof Expression) {
            EM.addFactors(new ExpFactor(a))
        } else if (a instanceof ExpressionMember) {
            EM.addFactors(...a.factors)
        } else if (a instanceof ExpressionFactor) {
            // Do nothing
            EM.addFactors(a)
        }

        if (b instanceof Expression) {
            EM.addFactors(new ExpFactor(b, -1))
        } else if (b instanceof ExpressionMember) {
            EM.addFactors(new ExpFactor(new Expression(b), -1))
        } else if (b instanceof ExpressionFactor) {
            // Do nothing
            b.power = -b.power
            EM.addFactors(b)
        }

        return EM
    }

    private tokenOperationPower(a: Expression | ExpressionMember | ExpressionFactor, b: Expression | ExpressionMember | ExpressionFactor): ExpressionFactor {
        if (a instanceof Expression) {
            // Do nothing
        } else if (a instanceof ExpressionMember) {
            a = new Expression(a)
        } else if (a instanceof ExpressionFactor) {
            // Make a new factor of itself
            console.log(a)
            if (a.power === 1 && b instanceof ExpFactorNumber) {
                a.power = b.value
                return a
            } else {
                a = new Expression(new ExpressionMember(a))
            }
        }

        // b can be :
        // number       3
        // any other expression
        //
        if (b instanceof Expression) {
            // Do nothing
        } else if (b instanceof ExpressionMember) {
            b = new Expression(b)
        } else if (b instanceof ExpFactorNumber) {
            return new ExpFactor(a, b.value)
        } else if (b instanceof ExpressionFactor) {
            b = new Expression(new ExpressionMember(b))
        }

        return new ExpFactorPower(a, b)
    }

    private tokenOperationMinus(a: Expression | ExpressionMember | ExpressionFactor, b: Expression | ExpressionMember | ExpressionFactor): Expression {
        if (a instanceof ExpressionMember) {
            a = new Expression(a)
        } else if (a instanceof ExpressionFactor) {
            a = new Expression(new ExpressionMember(a))
        }

        if (b instanceof ExpressionMember) {
            b = new Expression(b)
        } else if (b instanceof ExpressionFactor) {
            b = new Expression(new ExpressionMember(b))
        }

        return a.subtract(b)

    }

    private tokenOperationSqrt(a: Expression | ExpressionMember | ExpressionFactor): Expression | ExpressionFactor {

            // Transform the argument to expression
            if (a instanceof Expression) {
                return new ExpFactor(a, 1, 2)
            } else if (a instanceof ExpressionMember) {
                if (a.factors.length === 1 && !a.factors[0].hasPower()) {
                    a.factors[0].root = 2
                    return a.factors[0]
                } else {
                    return new ExpFactor(new Expression(a), 1, 2)
                }
            } else if (a instanceof ExpressionFactor) {
                if (!a.hasPower()) {
                    a.root = 2
                    return a
                } else {
                    return new ExpFactor(new Expression(a), 1, 2)
                }
            }
        // Fallback
        return a
    }

    private tokenOperationRoot(a:Expression | ExpressionMember | ExpressionFactor, b:Expression | ExpressionMember | ExpressionFactor): ExpFactor {
        // a is the power
        // b is the argument



        // Transform the argument to expression
        if (!(b instanceof Expression)) {
            b = new Expression(b)
        }
        // the "a" value is the nth root. It must be a number
        let n = 2
        if (a instanceof ExpFactorNumber) {
            n = a.number
        } else {
            throw "The nth root value must be a number, not " + a.tex
        }

        return new ExpFactor(b, 1, n)
    }
}