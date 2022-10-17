import {ExpFactorVariable} from "../../src/maths/expressions/factors/ExpFactorVariable";
import {expect} from "chai";
import {ExpFactorNumber} from "../../src/maths/expressions/factors/ExpFactorNumber";
import {Expression} from "../../src/maths/expressions/expression";
import {ExpFactorTrigo} from "../../src/maths/expressions/factors/ExpFactorTrigo";
import {ExpFactor} from "../../src/maths/expressions/factors/ExpFactor";
import {ExpressionMember} from "../../src/maths/expressions/expressionMember";
import {ExpressionParser} from "../../src/maths/expressions/expressionParser";
import {expressionOperators} from "../../src/maths/expressions/expressionOperators";

describe('Expressions tests', () => { // the tests container
    it('should make some test', () => {

        // let a = new ExpressionParser('3x').expression
        // let a = new ExpressionParser('3x+5').expression
        // let a = new ExpressionParser('3x^2+5').expression
        // let a = new ExpressionParser('3x^(2/3)+5').expression
        // let a = new ExpressionParser('3x(x+4)').expression
        // let a = new ExpressionParser('sin(cos(3picos(3pi)-5))+sqrt(e-sin(3pi/2))').expression
        // let a = new ExpressionParser('3-nthrt(x-3,5)').expression
        // console.log(a.isPolynom())
        // let b = new ExpressionParser('3/2x^2-5x+7').expression
        // console.log(b.tex, b.isPolynom())
        // console.log(b.members[0].member.coefficient().tex)
        // console.log(b.members[0].member.litteral().tex)
        // console.log(b.structure())
        //

        // let c = new ExpressionParser('3/2x^2+5/3x-7').expression
        // console.log(c.tex)
        // console.log(c.display)

        // let d = new ExpressionParser('sqrt(16)*sqrt(15^4)+9/15').expression
        let d = new ExpressionParser('nthrt(16,4)').expression
        console.log(d.tex)
        console.log(d.members[0].member.reduce().tex)
        console.log(d.structure())
        // console.log(d.display)

        // console.log(d.structure())
        // console.log(c.display)
        // console.log(c.members[0].member.literal().factors.length)
        // console.log(c.members[0].member.reduce().tex);
        // console.log(c.members[1].member.reduce().tex);
    })

    it('should make some operations', ()=>{
        let a = new ExpressionParser('3x').expression,
            b = new ExpressionParser('5x^2').expression,
            c = new ExpressionParser('9x-2').expression

        console.log(a.tex)
        console.log(b.tex)
        console.log(c.tex)

        let sum = expressionOperators.add(a, b, c)
        console.log(sum.tex)

        let diff = expressionOperators.subtract(a, b)
        console.log(diff.tex)

        let mult = expressionOperators.multiply(a, b, c)
        console.log(mult.tex)

        let div = expressionOperators.divide(a, c)
        console.log(div.tex)
    })
    it('should work :)', () => {

        const expVar = new ExpFactorVariable('y', 3, 5)
        expect(expVar.tex).to.be.equal('\\sqrt[5]{ y }^{ 3 }')

        const expNum = new ExpFactorNumber(17, 3, 5)
        expect(expNum.tex).to.be.equal('\\sqrt[5]{ 17 }^{ 3 }')

        const expProduct1 = new ExpressionMember(expNum, expVar)
        const expProduct2 = new ExpressionMember(
            new ExpFactorNumber(4),
            new ExpFactorVariable('t', 7, 2)
        )
        expect(expProduct2.tex).to.be.equal("4\\sqrt{ t }^{ 7 }")

        const expr = new Expression(
            expProduct1,
            expProduct2
        )

        const ExpSin = new ExpFactorTrigo(
            'sin',
            expr,
            3, 7
        )

        const expNum1 = new Expression(
            new ExpressionMember(
                new ExpFactorNumber(3, 2, 7),
                new ExpFactorNumber(4, -3, 2)
            ),
            new ExpressionMember(
                new ExpFactorNumber(5),
                new ExpFactor(
                    new Expression(
                        new ExpressionMember(
                            new ExpFactorNumber(3, 2),
                            new ExpFactorNumber(2, 1, 3)
                        ),
                        new ExpressionMember(
                            new ExpFactorNumber(-4, 3),
                            new ExpFactorNumber(7, 2, 6)
                        ),
                        new ExpressionMember(
                            new ExpFactorNumber(-3),
                            ExpSin
                        )
                    ), 2, 3
                )
            )
        )

        expect(expNum1.hasVariable()).to.be.false;
        const expNumSin = new Expression(
            new ExpressionMember(
                new ExpFactorTrigo('sin', expNum1)
            )
        )

        expect(expNumSin.isNumeric()).to.be.true;

    })

    it('should parse an expression', () => {

        // let E = new Expression().parse('3x')
        // console.log(E.tex)
        //
        // const SY5: Shutingyard = new Shutingyard().parse('3/2*x^(-3)-5*x*y-12');
        //
        // console.log(SY5.rpn.map(x=>x.token))
        // console.log(SY5.rpn)
        //
        // const expr = new Expression()
        // expr.parse('3/2*x^(-3)-5*x*y-12')
    })

});
