import {ExpressionTree} from "../../src/maths/expressions/ExpressionTree";

describe('Expressions test', () => { // the tests container
    it('Parsing tree', () => {
        // let ET = new ExpressionTree('3(x-4)^2')
        let ET = new ExpressionTree('3(x-7)^2-5sqrt(5x-3)')

        console.log(ET.tex)
    })

});
