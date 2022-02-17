import {describe} from "mocha";
import {PolynomExpFactor, PolynomExpProduct} from "../src/maths/expressions/polynomexp";

describe('PolynomExpression concepts', () => {
    it('should display tex', function () {
        const F1 = new PolynomExpFactor('2x-5', 2.5),
            F2 = new PolynomExpFactor('2-x', 0.5),
            PP = new PolynomExpProduct(F1, F2)

        const D = F1.derivative()

        console.log(D.tex)
        console.log(D.reduce().tex)
    });
})