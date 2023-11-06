import {RootFraction} from "../../src/maths/coefficients/rootFraction";
import {expect} from "chai";


describe("RootFraction tests", () => {
    it("should parse correctly", () => {
        const RF1 = new RootFraction('3/7', 2, 5)
        expect(RF1.display).to.be.equal('3root(5)(2)/7')

        const RF2 = new RootFraction('3/7', 5, 2)
        expect(RF2.display).to.be.equal('3sqrt(5)/7')

        const RF3 = new RootFraction(-9, 5, 2)
        expect(RF3.display).to.be.equal('-9sqrt(5)')
    })

    it("shoud clone a root fraction", () => {
        const RF1 = new RootFraction('3/7', 2, 5),
            RFclone = RF1.clone()

        expect(RFclone.display).to.be.equal(RF1.display)
    })

    it("should add multiple values", () => {
        const RF1 = new RootFraction('3/7', 2, 5),
            RF2 = new RootFraction('1/2', 2, 5),
            RF3 = new RootFraction('1/3', 2, 5)

        RF1.add(RF2, RF3)

        expect(RF1.display).to.be.equal('53root(5)(2)/42')
    })

    it("should subtract multiple values", () => {
        const RF1 = new RootFraction('3/7', 2, 5),
            RF2 = new RootFraction('1/2', 2, 5),
            RF3 = new RootFraction('1/3', 2, 5)

        RF1.multiply(RF2, RF3)

        expect(RF1.display).to.be.equal('3root(5)(8)/42')
    })

    it("should multiply multiple values", () => {
        const RF1 = new RootFraction('3/7', 5),
            RF2 = new RootFraction('1/2', 3),
            RF3 = new RootFraction('1/3', 5, 3)

        expect(RF1.clone().multiply(RF2).display).to.be.equal('3sqrt(15)/14')
        expect(RF1.clone().multiply(RF3).display).to.be.equal('3root(6)(3125)/21')
    })

    it("should invert a root fraction", () => {
        const RF1 = new RootFraction('3/7', 2),
            RF2 = new RootFraction('3/7', 5, 3)

        expect(RF1.invert().display).to.be.equal('7sqrt(2)/6')
        expect(RF2.invert().display).to.be.equal('7root(3)(25)/15')
    })

    it("should divide a root fraction", () => {
        const RF1 = new RootFraction('3/7', 2),
            RF2 = new RootFraction('2/9', 2)

        expect(RF1.clone().divide(RF1).reduce().display).to.be.equal('1')
        expect(RF1.clone().divide(RF2).reduce().display).to.be.equal('27/14')
    })
})