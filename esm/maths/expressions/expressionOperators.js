"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressionOperators = void 0;
const expression_1 = require("./expression");
const ExpFactor_1 = require("./factors/ExpFactor");
const expressionMember_1 = require("./expressionMember");
class expressionOperators {
    static reduce(expr) {
        let output = new expression_1.Expression();
        return null;
    }
    static add(...values) {
        let output = new expression_1.Expression();
        for (let expr of values) {
            output.addMembers(...expr.members);
        }
        return output;
    }
    static subtract(a, b) {
        let output = new expression_1.Expression();
        output.add(a);
        output.subtract(b);
        return output;
    }
    static multiply(...values) {
        let output = new expression_1.Expression(), member = new expressionMember_1.ExpressionMember();
        for (let expr of values) {
            member.add(new ExpFactor_1.ExpFactor(expr));
        }
        return output.add(member);
    }
    static divide(a, b) {
        let output = new expression_1.Expression(), member = new expressionMember_1.ExpressionMember();
        // Add the first element as factor
        member.add(new ExpFactor_1.ExpFactor(a));
        // Divide by the second element.
        member.add(new ExpFactor_1.ExpFactor(b, -1));
        return output.add(member);
    }
}
exports.expressionOperators = expressionOperators;
//# sourceMappingURL=expressionOperators.js.map