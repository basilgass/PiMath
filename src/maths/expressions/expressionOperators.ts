import {Expression} from "./expression";
import {ExpFactor} from "./factors/ExpFactor";
import {ExpressionMember} from "./expressionMember";

export class expressionOperators {
    static reduce(expr:Expression):Expression {
        let output = new Expression()

        return null
    }

    static add(...values: Expression[]): Expression {
        let output = new Expression()
        for(let expr of values){
            output.addMembers(...expr.members)
        }
        return output
    }

    static subtract(a: Expression, b: Expression): Expression{
        let output = new Expression()
        output.add(a)
        output.subtract(b)
        return output
    }

    static multiply(...values: Expression[]): Expression{
        let output = new Expression(),
            member = new ExpressionMember()

        for(let expr of values){
            member.add(new ExpFactor(expr))
        }

        return output.add(member)
    }

    static divide(a: Expression, b: Expression): Expression{
        let output = new Expression(),
            member = new ExpressionMember()

        // Add the first element as factor
        member.add(new ExpFactor(a))
        // Divide by the second element.
        member.add(new ExpFactor(b, -1))

        return output.add(member)
    }
}