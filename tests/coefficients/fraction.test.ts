import {describe, expect, it, test} from "vitest"
import {Fraction} from "../../src/coefficients/fraction"
import {Random} from "../../src/randomization/random"

describe('Fraction creation', () => {
    test('create Fraction', () => {
        const F = new Fraction(2, 3)

        expect(F.numerator).toBe(2)
        expect(F.denominator).toBe(3)
    })

    test('clone Fraction', () => {
        const F = new Fraction(2, 3)
        const C = F.clone()

        expect(F.numerator).toBe(C.numerator)
        expect(F.denominator).toBe(C.denominator)

        C.numerator = 5
        expect(F.numerator).not.toBe(C.numerator)
        expect(F.denominator).toBe(C.denominator)
    })

    test('set to zero Fraction', () => {
        const F = new Fraction(2, 3)

        F.zero()

        expect(F.numerator).toBe(0)
        expect(F.denominator).toBe(1)
    })

    test('set to one Fraction', () => {
        const F = new Fraction(2, 3)

        F.one()

        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(1)
    })

    test('parse string', () => {
        const F = new Fraction('2/3')

        expect(F.numerator).toBe(2)
        expect(F.denominator).toBe(3)
    })

    test('parse string with decimal', () => {
        const F = new Fraction('2.5')

        expect(F.numerator).toBe(5)
        expect(F.denominator).toBe(2)
    })

    test('parse string with decimal (complex version)', () => {
        const F = new Fraction('0.570')

        expect(F.numerator).toBe(57)
        expect(F.denominator).toBe(100)
    })

    test('parse string with decimal (uncomplete)', () => {
        const F = new Fraction('2.')

        expect(F.numerator).toBe(2)
        expect(F.denominator).toBe(1)
    })

    test.todo('parse string with periodic decimal', () => {
        const F = new Fraction('3.(142857)')

        expect(F.numerator).toBe(22)
        expect(F.denominator).toBe(7)
    })
})

describe('Fraction output', () => {
    test('output as LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.tex).toBe('\\frac{ 2 }{ 3 }')
    })

    test('output as dfrac in LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.dfrac.tex).toBe('\\dfrac{ 2 }{ 3 }')
    })
    test('output as tfrac in LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.tfrac.tex).toBe('\\tfrac{ 2 }{ 3 }')
    })

    test('output as ASCII', () => {
        const F = new Fraction(2, 3)

        expect(F.display).toBe('2/3')
    })

    test('force the plus sign', ()=>{
        const F = new Fraction('2/3')

        expect(F.withSign.display).toBe('+2/3')
        expect(F.withSign.tex).toBe('+\\frac{ 2 }{ 3 }')

        const Fm = new Fraction('-2/3')

        expect(Fm.withSign.display).toBe('-2/3')
        expect(Fm.withSign.tex).toBe('-\\frac{ 2 }{ 3 }')
    })

    test('approximative value display', ()=>{
        const F = new Fraction(2)
        F.sqrt()

        expect(F.display).toBe('1.414')
        expect(F.tex).toBe('1.414')
        expect(F.digits(5).display).toBe('1.41421')
        expect(F.digits(5).tex).toBe('1.41421')
    })
})

describe('Fraction operations', () => {
    test('reduce Fraction', () => {
        const F = new Fraction(5, 10)

        expect(F.isReduced()).toBeFalsy()

        F.reduce()
        expect(F.isReduced()).toBeTruthy()
        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(2)
    })

    test('add two Fractions', () => {
        const F = new Fraction(2, 3)
        const G = new Fraction(4, 5)

        F.add(G)

        expect(F.numerator).toBe(22)
        expect(F.denominator).toBe(15)
    })

    test('subtract two Fractions', () => {
        const F = new Fraction(2, 3)
        const G = new Fraction(4, 5)

        F.subtract(G)

        expect(F.numerator).toBe(-2)
        expect(F.denominator).toBe(15)
    })

    test('multiply two Fractions', () => {
        const F = new Fraction(2, 3)
        const G = new Fraction(4, 5)

        F.multiply(G)

        expect(F.numerator).toBe(8)
        expect(F.denominator).toBe(15)
    })

    test('divide two Fractions', () => {
        const F = new Fraction(2, 3)
        const G = new Fraction(4, 5)

        F.divide(G)

        expect(F.numerator).toBe(5)
        expect(F.denominator).toBe(6)
    })

    test('raise Fraction by integer', () => {
        const F = new Fraction(2, 3)

        F.pow(4)

        expect(F.numerator).toBe(16)
        expect(F.denominator).toBe(81)
    })
})

describe('Fraction comparisons', () => {

    test('compare Fractions', () => {
        const F = new Fraction(2, 3) // 0.666
        const G = new Fraction(4, 5) // 0.8
        const H = new Fraction(4, 6) // 0.666

        expect(F.isEqual(G)).to.be.false
        expect(F.isGreater(G)).to.be.false
        expect(F.isLesser(G)).to.be.true

        expect(F.isGreater(H)).to.be.false
        expect(F.isLesser(H)).to.be.false
        expect(F.isEqual(H)).to.be.true
        expect(F.isGeq(H)).to.be.true
        expect(F.isLeq(H)).to.be.true
    })
})

describe("Fraction static functions", () => {
    it('should sort fractions', function () {
        const list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('3.1'),
            new Fraction('3.54'),
            new Fraction('1.5')
        ]

        expect(Fraction.sort(list).map(x => x.value)).to.eql([-2.5, 1.5, 3.1, 3.5, 3.54])
    })

    it('should make a list of fractions unique', function () {
        const list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('7/2'),
            new Fraction('3.50'),
            new Fraction('1.5')
        ]

        const U = Fraction.unique(list)
        expect(U.length).to.be.equal(3)
        expect(U.map(x => x.value)).to.have.all.members([-2.5, 1.5, 3.5])
    })

    it('should get the average of fractions', function () {
        const list = [
            new Fraction('3.5'),
            new Fraction('-2.5'),
            new Fraction('7/2'),
            new Fraction('3.50'),
            new Fraction('1.5')
        ]

        expect(Fraction.average(...list).tex).to.be.equal('\\frac{ 19 }{ 10 }')
    })

    it('should multiply and not reduce', function () {
        const list = [
            new Fraction('1/2'),
            new Fraction('4/3'),
            2.5,
            3
        ]

        expect(Fraction.xMultiply(...list).display).to.be.equal("60/12")
    })
})

describe("Fraction evaluation", () => {
    test('evaluate a Fraction', function () {
        const G = new Fraction('1/7') // 0.142857
        expect(G.exact).toBe(true)
    })

    test('approximate a Fraction', function () {
        const F = new Fraction(Math.sqrt(2))

        expect(F.exact).toBe(false)
    })
})

describe('Fraction generators', () => {
    test('generate a non natural fraction', function () {
        let F: Fraction = Random.fraction()

        for (let i = 0; i < 100; i++) {
            F = Random.fraction()
            if (!F.isRelative()) {
                break
            }
        }

        expect(F.isNatural()).to.be.false
    })
})