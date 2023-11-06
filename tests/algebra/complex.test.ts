import {Complex} from "../../src/maths/algebra/complex";
import {expect} from "chai";
import {describe} from "mocha";

describe('Complex debug', () => {
    it('should create a complex number', () => {
        let c = new Complex('3+2i')
        console.log(c.display)
    })
})

describe('Complex tests', () => {
    it('should create a complex number', () => {
        let c = new Complex('3+2i')
        expect(c.real.display).to.be.equal('3')
        expect(c.imaginary.display).to.be.equal('2')
        expect(c.display).to.be.equal('3+2i')


        let c2 = new Complex('3-2i')
        expect(c2.real.display).to.be.equal('3')
        expect(c2.imaginary.display).to.be.equal('-2')
        expect(c2.display).to.be.equal('3-2i')

        let c3 = new Complex('3')
        expect(c3.real.display).to.be.equal('3')
        expect(c3.imaginary.display).to.be.equal('0')
        expect(c3.display).to.be.equal('3')

        let c4 = new Complex('2i')
        expect(c4.real.display).to.be.equal('0')
        expect(c4.imaginary.display).to.be.equal('2')
        expect(c4.display).to.be.equal('2i')

        let c5 = new Complex('5i-3')
        expect(c5.real.display).to.be.equal('-3')
        expect(c5.imaginary.display).to.be.equal('5')
        expect(c5.display).to.be.equal('-3+5i')

        let cFraction = new Complex('3/2+2/3i')
        expect(cFraction.real.display).to.be.equal('3/2')
        expect(cFraction.imaginary.display).to.be.equal('2/3')
        expect(cFraction.display).to.be.equal('3/2+2/3i')
    })

    it('should get the conjugate of a complex number', () => {
        let c = new Complex('3+2i')
        expect(c.conjugate().display).to.be.equal('3-2i')
    })

    it('should add two complex numbers', () => {
        let c = new Complex('3+2i'),
            c2 = new Complex('2-3i')
        expect(c.add(c2).display).to.be.equal('5-i')
    })
    it('should subtract two complex numbers', () => {
        let c = new Complex('3+2i'),
            c2 = new Complex('2-3i')
        expect(c.subtract(c2).display).to.be.equal('1+5i')
    })
    it('should multiply two complex numbers', () => {
        let c = new Complex('3+2i'),
            c2 = new Complex('2-3i')
        expect(c.multiply(c2).display).to.be.equal('12-5i')
    })

    it('should divide two complex numbers', () => {
        let c = new Complex('4+3i'),
            c2 = new Complex('2-3i')
        expect(c.divide(c2).display).to.be.equal('-1/13+18/13i')

        let c3 = new Complex('2+3i'),
            c4 = new Complex('-4+2i')
        expect(c3.divide(c4).display).to.be.equal('-1/10-4/5i')
    });

    it("should give me some answer i need for my math exercises...", () => {
        let a = new Complex('1+2i'),
            b = new Complex('2-3i'),
            c = new Complex('-4+7i')

        // (az+b)(z+c) = az^2 + (ac+b)z + bc
        let A = a.clone()
        let B = a.clone().multiply(c).add(b)
        let C = b.clone().multiply(c)
        let Delta = B.clone().pow(2).subtract(A.clone().multiply(C).multiply(4))
        let s = Delta.clone().sqrt()

        expect(A.display).to.be.equal('1+2i')
        expect(B.display).to.be.equal('-16-4i')
        expect(C.display).to.be.equal('13+26i')
    })
})