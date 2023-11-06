import {describe} from "mocha";
import {expect} from "chai";
import {Radian} from "../../src/maths/geometry/radian";
describe('Random tests', () => {
    it('should create a radian value', () => {
        let r = new Radian('3/2')

        expect(r.tex).to.be.equal('\\frac{ 3\\pi }{ 2 }')
        expect(r.display).to.be.equal('3pi/2')

        let rp = new Radian('3/2', '1/2')

        expect(rp.tex).to.be.equal('\\frac{ 3\\pi }{ 2 }+k\\frac{ \\pi }{ 2 }')
        expect(rp.display).to.be.equal('3pi/2+kpi/2')
    })
})