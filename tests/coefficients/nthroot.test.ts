import {expect} from "chai";
import {describe} from "mocha";
import {NthRoot} from "../../src/maths/coefficients/nthRoot";


describe('Nthroot tests', () => { // the tests container

    it('should output NthRoot as TeX', () => { // the single test
        let a = new NthRoot(3, 2, 5);

        expect(a.tex).to.be.equal('5 \\sqrt{ 3 }');

        let b = new NthRoot(7, 3);

        expect(b.tex).to.be.equal('\\sqrt[3]{ 7 }');

        let c = new NthRoot(3, 2, -5);

        expect(c.tex).to.be.equal('-5 \\sqrt{ 3 }');

        let d = new NthRoot(7, 3, "3/2");

        expect(d.tex).to.be.equal('\\frac{ 3 \\sqrt[3]{ 7 } }{ 2 }');
    })

    it('should display NthRoot as display (ASCII)', () => { // the single test
        let a = new NthRoot(3, 2, 5);

        expect(a.display).to.be.equal('5sqrt(3)');

        let b = new NthRoot(7, 3);

        expect(b.display).to.be.equal('root(3)(7)');

        let c = new NthRoot(3, 2, -5);

        expect(c.display).to.be.equal('-5sqrt(3)');

        let d = new NthRoot(7, 3, "3/2");

        expect(d.display).to.be.equal('3root(3)(7)/2');
    })

    it('should reduce NthRoot', () => {
        let a = new NthRoot(12, 2);

        expect(a.reduce().display).to.be.equal('2sqrt(3)');

        let b = new NthRoot(24, 3, 5);

        expect(b.reduce().display).to.be.equal('10root(3)(3)');
    })

    it("should multiply NthRoot", () => {
        let a = new NthRoot(5, 2)
        let b = new NthRoot(3, 2)

        expect(a.multiply(b).display).to.be.equal('sqrt(15)')
    });

    it("should divide NthRoot", () => {
        let a = new NthRoot(5, 2)
        let b = new NthRoot(3, 2)

        expect(a.divide(b).display).to.be.equal('sqrt(15)/3')

        let c = new NthRoot(6, 2, 2)
        let d = new NthRoot(3, 2, 15)

        expect(c.divide(d).display).to.be.equal('2sqrt(2)/15')
    });

})