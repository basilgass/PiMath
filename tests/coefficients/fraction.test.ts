import {expect} from "chai";
import {Fraction} from "../../src/maths/coefficients/fraction";
import {describe} from "mocha";

describe('Fraction tests', () => { // the tests container

    it('Tex display', () => { // the single test
        const options = new Fraction(2, 5); // this will be your class
        expect(options.frac).to.be.equal('\\frac{ 2 }{ 5 }');
    });

    it('Compare: equals', () => {
        let F = new Fraction(1, 3),
            Q = new Fraction(2, 6),
            P = new Fraction(2, 5);
        expect(F.isEqual(Q)).to.be.true;
        expect(F.isEqual(P)).to.be.false;
    })

    it('Operation: sum of two fraction', () => {
        let F = new Fraction(1, 3),
            Q = new Fraction(2, 7);

        F.add(Q);

        expect(F.numerator).to.be.equal(13);
        expect(F.denominator).to.be.equal(21);
    })

    it('Reduced', () => {
        let F = new Fraction(2, 5),
            Q = new Fraction(2, 6)

        expect(F.isReduced()).to.be.true
        expect(Q.isReduced()).to.be.false
    })


})

describe("Fraction static functions", ()=>{
    it('should sort fractions', function () {
        let list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('3.1'),
            new Fraction('3.54'),
            new Fraction('1.5')
        ]

        expect(Fraction.sort(list).map(x=>x.value)).to.eql([ -2.5, 1.5, 3.1, 3.5, 3.54 ])
    });

    it('should make a list of fractions unique', function () {
        let list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('7/2'),
            new Fraction('3.50'),
            new Fraction('1.5')
        ]

        expect(Fraction.unique(list, true).map(x=>x.value)).to.be.eql([ -2.5, 1.5, 3.5 ])

    });

    it('shoudl get the average of fractions', function() {
        let list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('7/2'),
            new Fraction('3.50'),
            new Fraction('1.5')
        ]

        expect(Fraction.average(...list).tex).to.be.equal('\\frac{ 19 }{ 10 }')
    })

    it('should multiply and notreduce', function () {
        let list = [
            new Fraction('1/2'),
            new Fraction('4/3'),
            2.5,
            3
        ]

        console.log(new Fraction().xMultiply(...list))
    });
})

describe("Evaluate fraction", () => {
    it('should evaluate and convert to decimal if not exact', function () {
        let F = new Fraction(Math.sqrt(2))

        expect(F.isApproximative()).to.be.true
        expect(F.isExact()).to.be.false

        console.log(F.tex, F.value)

        let G = new Fraction('1/7')
        expect(G.isApproximative()).to.be.false
        expect(G.isExact()).to.be.true

        console.log(G.tex, G.value)
    });
})