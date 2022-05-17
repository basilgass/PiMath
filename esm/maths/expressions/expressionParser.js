"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParser = void 0;
const internals_1 = require("./internals");
function dlog(...values) {
    if (false) {
        console.log(...values);
    }
}
class ExpressionParser {
    constructor(value) {
        this._expression = this.parse(value);
    }
    get expression() {
        return this._expression;
    }
    parse(value) {
        let expr, SY = new internals_1.Shutingyard(internals_1.ShutingyardMode.EXPRESSION).parse(value), rpn = SY.rpn, stack = [];
        dlog(SY.rpn);
        dlog(SY.normalize(value));
        for (let item of rpn) {
            dlog('BEFORE', item.token, stack.map(s => s.tex));
            switch (item.tokenType) {
                case internals_1.ShutingyardType.COEFFICIENT:
                    stack.push(new internals_1.ExpFactorNumber(+item.token));
                    break;
                case internals_1.ShutingyardType.CONSTANT:
                    stack.push(new internals_1.ExpFactorConstant(item.token));
                    break;
                case internals_1.ShutingyardType.VARIABLE:
                    stack.push(new internals_1.ExpFactorVariable(item.token));
                    break;
                case internals_1.ShutingyardType.OPERATION:
                    // for an operation, the stack length should be two
                    if (stack.length >= 2) {
                        let b = stack.pop(), a = stack.pop();
                        // dlog('OPERATION A - B', stack.map(s=>s.tex))
                        switch (item.token) {
                            case "+":
                                stack.push(this.tokenOperationPlus(a, b));
                                break;
                            case "-":
                                stack.push(this.tokenOperationMinus(a, b));
                                break;
                            case "*":
                                stack.push(this.tokenOperationMultiply(a, b));
                                break;
                            case "/":
                                stack.push(this.tokenOperationDivide(a, b));
                                break;
                            case "^":
                                stack.push(this.tokenOperationPower(a, b));
                                break;
                        }
                    }
                    else {
                        // TODO: handle stack size of one when applying an operation
                    }
                    break;
                case internals_1.ShutingyardType.FUNCTION:
                    let a = stack.pop();
                    if (item.token === 'sqrt') {
                        stack.push(this.tokenOperationSqrt(a));
                    }
                    else if (item.token === 'nthrt') {
                        stack.push(this.tokenOperationRoot(a, stack.pop()));
                    }
                    else if (item.token in internals_1.TRIGONOMETRIC) {
                        if (!(a instanceof internals_1.Expression)) {
                            a = new internals_1.Expression(a);
                        }
                        stack.push(new internals_1.ExpFactorTrigo(item.token, a));
                    }
                    break;
                default:
                    throw ('Something went wrong while parsing ' + value + ' at ' + item.token);
            }
            dlog('AFTER', item.token, stack.map(s => s.tex));
            dlog('----------');
        }
        // Build the output expression.
        let output = new internals_1.Expression();
        for (let item of stack) {
            if (item instanceof internals_1.Expression) {
                output.addMembers(...item.members);
            }
            else if (item instanceof internals_1.ExpressionMember) {
                output.addMembers(item);
            }
            else if (item instanceof internals_1.ExpressionFactor) {
                output.addMembers(item);
            }
        }
        return output;
        // TODO: in the stack, there might be an Expression, ExpressionMember or an ExpressionFactor.
        // @ts-ignore
        // return new Expression(...stack.map(
        //     item=>{
        //         return item instanceof ExpressionFactor ? new ExpressionMember(item) : item;
        //     }
        // ))
    }
    tokenOperationPlus(a, b) {
        if (a instanceof internals_1.ExpressionMember || a instanceof internals_1.ExpressionFactor) {
            a = new internals_1.Expression(a);
        }
        return a.add(b);
    }
    tokenOperationMultiply(a, b) {
        let EM = new internals_1.ExpressionMember();
        if (a instanceof internals_1.Expression) {
            EM.addFactors(new internals_1.ExpFactor(a));
            // a = new ExpFactor(a)
        }
        else if (a instanceof internals_1.ExpressionMember) {
            // a.add()
            EM.addFactors(...a.factors);
            // a = new ExpFactor(new Expression(a))
        }
        else if (a instanceof internals_1.ExpressionFactor) {
            // Do nothing
            EM.addFactors(a);
        }
        if (b instanceof internals_1.Expression) {
            // b = new ExpFactor(b)
            EM.addFactors(new internals_1.ExpFactor(b));
        }
        else if (b instanceof internals_1.ExpressionMember) {
            // b = new ExpFactor(new Expression(b))
            EM.addFactors(...b.factors);
        }
        else if (b instanceof internals_1.ExpressionFactor) {
            // Do nothing
            EM.addFactors(b);
        }
        return EM;
    }
    tokenOperationDivide(a, b) {
        let EM = new internals_1.ExpressionMember();
        if (a instanceof internals_1.Expression) {
            EM.addFactors(new internals_1.ExpFactor(a));
        }
        else if (a instanceof internals_1.ExpressionMember) {
            EM.addFactors(...a.factors);
        }
        else if (a instanceof internals_1.ExpressionFactor) {
            // Do nothing
            EM.addFactors(a);
        }
        if (b instanceof internals_1.Expression) {
            EM.addFactors(new internals_1.ExpFactor(b, -1));
        }
        else if (b instanceof internals_1.ExpressionMember) {
            EM.addFactors(new internals_1.ExpFactor(new internals_1.Expression(b), -1));
        }
        else if (b instanceof internals_1.ExpressionFactor) {
            // Do nothing
            b.power = -b.power;
            EM.addFactors(b);
        }
        return EM;
    }
    tokenOperationPower(a, b) {
        if (a instanceof internals_1.Expression) {
            // Do nothing
        }
        else if (a instanceof internals_1.ExpressionMember) {
            a = new internals_1.Expression(a);
        }
        else if (a instanceof internals_1.ExpressionFactor) {
            // Make a new factor of itself
            console.log(a);
            if (a.power === 1 && b instanceof internals_1.ExpFactorNumber) {
                a.power = b.value;
                return a;
            }
            else {
                a = new internals_1.Expression(new internals_1.ExpressionMember(a));
            }
        }
        // b can be :
        // number       3
        // any other expression
        //
        if (b instanceof internals_1.Expression) {
            // Do nothing
        }
        else if (b instanceof internals_1.ExpressionMember) {
            b = new internals_1.Expression(b);
        }
        else if (b instanceof internals_1.ExpFactorNumber) {
            return new internals_1.ExpFactor(a, b.value);
        }
        else if (b instanceof internals_1.ExpressionFactor) {
            b = new internals_1.Expression(new internals_1.ExpressionMember(b));
        }
        return new internals_1.ExpFactorPower(a, b);
    }
    tokenOperationMinus(a, b) {
        if (a instanceof internals_1.ExpressionMember) {
            a = new internals_1.Expression(a);
        }
        else if (a instanceof internals_1.ExpressionFactor) {
            a = new internals_1.Expression(new internals_1.ExpressionMember(a));
        }
        if (b instanceof internals_1.ExpressionMember) {
            b = new internals_1.Expression(b);
        }
        else if (b instanceof internals_1.ExpressionFactor) {
            b = new internals_1.Expression(new internals_1.ExpressionMember(b));
        }
        return a.subtract(b);
    }
    tokenOperationSqrt(a) {
        // Transform the argument to expression
        if (a instanceof internals_1.Expression) {
            return new internals_1.ExpFactor(a, 1, 2);
        }
        else if (a instanceof internals_1.ExpressionMember) {
            if (a.factors.length === 1 && !a.factors[0].hasPower()) {
                a.factors[0].root = 2;
                return a.factors[0];
            }
            else {
                return new internals_1.ExpFactor(new internals_1.Expression(a), 1, 2);
            }
        }
        else if (a instanceof internals_1.ExpressionFactor) {
            if (!a.hasPower()) {
                a.root = 2;
                return a;
            }
            else {
                return new internals_1.ExpFactor(new internals_1.Expression(a), 1, 2);
            }
        }
        // Fallback
        return a;
    }
    tokenOperationRoot(a, b) {
        // a is the power
        // b is the argument
        // Transform the argument to expression
        if (!(b instanceof internals_1.Expression)) {
            b = new internals_1.Expression(b);
        }
        // the "a" value is the nth root. It must be a number
        let n = 2;
        if (a instanceof internals_1.ExpFactorNumber) {
            n = a.number;
        }
        else {
            throw "The nth root value must be a number, not " + a.tex;
        }
        return new internals_1.ExpFactor(b, 1, n);
    }
}
exports.ExpressionParser = ExpressionParser;
//# sourceMappingURL=expressionParser.js.map