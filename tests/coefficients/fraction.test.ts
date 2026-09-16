import {describe, expect, it, test} from "vitest"
import {Fraction, InvalidArgumentError, MathError, Random} from "../../src"

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

    test('parse string with periodic decimal', () => {
        const F = new Fraction('3.(142857)')

        expect(F.numerator).toBe(22)
        expect(F.denominator).toBe(7)
    })

    test('parse mixed periodic notation', () => {
        const F = new Fraction('2.31(25)')

        expect(F.numerator).toBe(11447)
        expect(F.denominator).toBe(4950)
    })

    test('parse pure periodic notation', () => {
        const F = new Fraction('0.(3)')

        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(3)
    })

    test('parse periodic notation without integer part', () => {
        const F = new Fraction('.31(25)')

        expect(F.numerator).toBe(1547)
        expect(F.denominator).toBe(4950)
    })

    test('parse short mixed periodic notation', () => {
        const F = new Fraction('0.1(6)')

        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(6)
    })

    test('parse negative periodic notation', () => {
        const F = new Fraction('-2.31(25)')

        expect(F.numerator).toBe(-11447)
        expect(F.denominator).toBe(4950)
        expect(F.sign()).toBe(-1)
    })

    test('malformed periodic notation is invalid', () => {
        const F = new Fraction('2.3(2')

        expect(F.isNaN()).toBe(true)
    })

    test('empty string parses to zero', () => {
        // parse delegates the empty string to zero().
        const F = new Fraction('')

        expect(F.numerator).toBe(0)
        expect(F.denominator).toBe(1)
    })
})

describe('Fraction fromPeriodic', () => {
    test('reduces the resulting fraction', () => {
        const F = new Fraction().fromPeriodic(2.3125, 2)

        expect(F.numerator).toBe(11447)
        expect(F.denominator).toBe(4950)
    })

    test('handles negative values', () => {
        const F = new Fraction().fromPeriodic(-2.3125, 2)

        expect(F.numerator).toBe(-11447)
        expect(F.denominator).toBe(4950)
        expect(F.sign()).toBe(-1)
    })

    test('reduces a pure periodic value', () => {
        const F = new Fraction().fromPeriodic(0.3, 1)

        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(3)
    })

    test('reduces a negative pure periodic value', () => {
        const F = new Fraction().fromPeriodic(-0.3, 1)

        expect(F.numerator).toBe(-1)
        expect(F.denominator).toBe(3)
    })

    test('is robust against floating point dust', () => {
        const F = new Fraction().fromPeriodic(0.16, 1)

        expect(F.numerator).toBe(1)
        expect(F.denominator).toBe(6)
    })
})

describe('Fraction periodic decimals', () => {
    test('isPeriodic detects terminating fractions', () => {
        expect(new Fraction(1, 4).isPeriodic()).toBe(false)
        expect(new Fraction(2, 1).isPeriodic()).toBe(false)
        expect(new Fraction(3, 8).isPeriodic()).toBe(false)
    })

    test('isPeriodic detects repeating fractions', () => {
        expect(new Fraction(1, 3).isPeriodic()).toBe(true)
        expect(new Fraction(1, 12).isPeriodic()).toBe(true)
        expect(new Fraction(1, 6).isPeriodic()).toBe(true)
        expect(new Fraction(1, 7).isPeriodic()).toBe(true)
    })

    test('toRepeatingDecimal on terminating fractions', () => {
        expect(new Fraction(1, 4).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '0', nonPeriodic: '25', periodic: '', periodLength: 0
        })
        expect(new Fraction(2, 1).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '2', nonPeriodic: '', periodic: '', periodLength: 0
        })
    })

    test('toRepeatingDecimal on pure periodic fractions', () => {
        expect(new Fraction(1, 3).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '0', nonPeriodic: '', periodic: '3', periodLength: 1
        })
        expect(new Fraction(1, 7).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '0', nonPeriodic: '', periodic: '142857', periodLength: 6
        })
    })

    test('toRepeatingDecimal on mixed periodic fractions', () => {
        expect(new Fraction(1, 12).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '0', nonPeriodic: '08', periodic: '3', periodLength: 1
        })
        expect(new Fraction(1, 6).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '0', nonPeriodic: '1', periodic: '6', periodLength: 1
        })
    })

    test('toRepeatingDecimal keeps the integer part and sign', () => {
        expect(new Fraction(7, 3).toRepeatingDecimal()).toEqual({
            sign: 1, integerPart: '2', nonPeriodic: '', periodic: '3', periodLength: 1
        })
        expect(new Fraction(-1, 3).toRepeatingDecimal()).toEqual({
            sign: -1, integerPart: '0', nonPeriodic: '', periodic: '3', periodLength: 1
        })
    })
})

describe('Fraction output', () => {
    test('output as LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.tex).toBe('\\frac{ 2 }{ 3 }')
    })

    test('output as dfrac in LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.asDfrac.tex).toBe('\\dfrac{ 2 }{ 3 }')
    })
    test('output as tfrac in LaTeX', () => {
        const F = new Fraction(2, 3)

        expect(F.asTfrac.tex).toBe('\\tfrac{ 2 }{ 3 }')
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

    test('divide by zero keeps the dividend sign', () => {
        const negative = new Fraction(-3).divide(0)
        expect(negative.sign()).toBe(-1)
        expect(negative.isFinite()).toBe(false)
        expect(negative.tex).toBe('-\\infty')

        const positive = new Fraction(3).divide(0)
        expect(positive.sign()).toBe(1)
        expect(positive.isFinite()).toBe(false)
        expect(positive.tex).toBe('+\\infty')
    })

    test('fromNumber rejects exponential notation', () => {
        expect(() => new Fraction().fromNumber(1e-7)).toThrow(InvalidArgumentError)
        expect(() => new Fraction().fromNumber(1e21)).toThrow(InvalidArgumentError)
    })

    test('zero denominator gives signed infinity or NaN', () => {
        expect(new Fraction(5, 0).isInfinity()).toBe(true)
        expect(new Fraction(5, 0).sign()).toBe(1)

        expect(new Fraction(-5, 0).isInfinity()).toBe(true)
        expect(new Fraction(-5, 0).sign()).toBe(-1)

        expect(new Fraction(0, 0).isNaN()).toBe(true)

        expect(new Fraction("5/0").isInfinity()).toBe(true)
    })

    test('amplify by zero throws', () => {
        expect(() => new Fraction(2, 3).amplify(0)).toThrow(InvalidArgumentError)
    })

    test('perfect roots stay exact', () => {
        const cubeRoot = new Fraction(27).root(3)
        expect(cubeRoot.numerator).toBe(3)
        expect(cubeRoot.denominator).toBe(1)
        expect(cubeRoot.exact).toBe(true)

        const sqrt = new Fraction(9, 4).sqrt()
        expect(sqrt.numerator).toBe(3)
        expect(sqrt.denominator).toBe(2)
        expect(sqrt.exact).toBe(true)

        const nonPerfect = new Fraction(2).sqrt()
        expect(nonPerfect.exact).toBe(false)
    })

    test('a rejected root leaves the receiver intact (atomicity)', () => {
        // Negative exponent: inverse() must NOT run before the rejection.
        const negExp = new Fraction(-4)
        expect(() => negExp.root(-2)).toThrow(MathError)
        expect(negExp.display).toBe('-4')
        expect(negExp.numerator).toBe(-4)
        expect(negExp.denominator).toBe(1)

        // Positive exponent: already rejected before any mutation.
        const posExp = new Fraction(-4)
        expect(() => posExp.root(2)).toThrow(MathError)
        expect(posExp.display).toBe('-4')
    })

    test('isSquare reduces and rejects negatives', () => {
        expect(new Fraction(8, 2).isSquare()).toBe(true)   // = 4
        expect(new Fraction(9, 4).isSquare()).toBe(true)
        expect(new Fraction(-4).isSquare()).toBe(false)
        expect(new Fraction(2).isSquare()).toBe(false)
    })

    test('pow rejects a non-integer exponent on a negative base (atomic)', () => {
        // no more silent NaN; align on root() which throws.
        const F = new Fraction(-4)
        expect(() => F.pow(0.5)).toThrow(MathError)
        // Atomicity: the rejected pow left the receiver intact.
        expect(F.display).toBe('-4')
    })

    test('pow handles negative and exact fractional exponents', () => {
        // negative exponent inverses; an exact fractional exponent stays exact.
        expect(new Fraction(2, 3).pow(-2).display).toBe('9/4')

        const exact = new Fraction(9, 4).pow(0.5)
        expect(exact.numerator).toBe(3)
        expect(exact.denominator).toBe(2)
        expect(exact.exact).toBe(true)
    })

    test('inverse swaps numerator and denominator, keeping the sign', () => {
        // inverse() had no direct coverage.
        expect(new Fraction(2, 3).inverse().display).toBe('3/2')

        const neg = new Fraction(-2, 3).inverse()
        expect(neg.display).toBe('-3/2')
        expect(neg.sign()).toBe(-1)
    })

    test('subtract and divide accept string inputs (InputValue)', () => {
        // signatures widened to honour the IExpression contract.
        expect(new Fraction(2, 3).subtract('1/3').display).toBe('1/3')
        expect(new Fraction(2, 3).divide('4/5').display).toBe('5/6')
    })

    test('setting denominator to zero yields signed infinity (mirrors divide)', () => {
        // normalize the corrupting state instead of leaving value=∞ / isInfinity()=false.
        const pos = new Fraction(3, 4)
        pos.denominator = 0
        expect(pos.isInfinity()).toBe(true)
        expect(pos.sign()).toBe(1)

        const neg = new Fraction(-3, 4)
        neg.denominator = 0
        expect(neg.isInfinity()).toBe(true)
        expect(neg.sign()).toBe(-1)

        const zero = new Fraction(0, 4)
        zero.denominator = 0
        expect(zero.isNaN()).toBe(true)
    })

    test('sign classifies NaN as positive, not negative', () => {
        // a NaN has no real sign; +1 avoids a false isNegative().
        const nan = new Fraction().invalid()
        expect(nan.isNaN()).toBe(true)
        expect(nan.sign()).toBe(1)
        expect(nan.isNegative()).toBe(false)
    })
})

describe('Fraction rational classification', () => {
    test('isRational includes integers (4 = 4/1)', () => {
        expect(new Fraction(4).isRational()).toBe(true)
        expect(new Fraction(6, 3).isRational()).toBe(true)   // = 2
        expect(new Fraction(3, 2).isRational()).toBe(true)
        expect(new Fraction(0).isRational()).toBe(true)
    })

    test('isRational excludes non-exact and non-finite values', () => {
        expect(new Fraction(2).sqrt().isRational()).toBe(false)   // approx √2
        expect(new Fraction().infinite().isRational()).toBe(false)
        expect(new Fraction().invalid().isRational()).toBe(false)
    })

    test('hasFractionalPart is true only for exact non-integers', () => {
        expect(new Fraction(3, 2).hasFractionalPart()).toBe(true)
        expect(new Fraction(4).hasFractionalPart()).toBe(false)
        expect(new Fraction(6, 3).hasFractionalPart()).toBe(false)   // = 2
        expect(new Fraction(0).hasFractionalPart()).toBe(false)
    })
})

describe('Fraction comparisons', () => {

    test('compare Fractions', () => {
        const F = new Fraction(2, 3) // 0.666
        const G = new Fraction(4, 5) // 0.8
        const H = new Fraction(4, 6) // 0.666

        expect(F.isEqual(G)).toBe(false)
        expect(F.isGreater(G)).toBe(false)
        expect(F.isLesser(G)).toBe(true)

        expect(F.isGreater(H)).toBe(false)
        expect(F.isLesser(H)).toBe(false)
        expect(F.isEqual(H)).toBe(true)
        expect(F.isGeq(H)).toBe(true)
        expect(F.isLeq(H)).toBe(true)
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

    it('should compute max, min and areEquals', function () {
        // previously uncovered statics.
        expect(Fraction.max('1/2', '3/4', '2/3').value).to.be.closeTo(0.75, 1e-9)
        expect(Fraction.min('1/2', '3/4', '2/3').value).to.be.closeTo(0.5, 1e-9)

        expect(Fraction.areEquals(new Fraction(1, 2), new Fraction(2, 4))).to.equal(true)
        expect(Fraction.areEquals(new Fraction(1, 2), new Fraction(1, 3))).to.equal(false)
    })

    it('should bring fractions to the same denominator', function () {
        // toSameDenominateur was uncovered.
        const same = Fraction.toSameDenominateur('1/2', '1/3')
        expect(same.map(f => f.denominator)).to.eql([6, 6])
        expect(same.map(f => f.numerator)).to.eql([3, 2])
    })

    it('should classify strings with isFraction', function () {
        // reject malformed strings, accept periodic notation.
        expect(Fraction.isFraction('2/3')).to.equal(true)
        expect(Fraction.isFraction('2.31(25)')).to.equal(true)
        expect(Fraction.isFraction('2/')).to.equal(false)
        expect(Fraction.isFraction('/3')).to.equal(false)
        expect(Fraction.isFraction('1/2/3')).to.equal(false)
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

        expect(F.isNatural()).toBe(false)
    })
})

describe('specific test', ()=>{
    test('divide by zero', ()=>{
        const F = new Fraction('2/0')

        console.log(F.isNaN())
        console.log(F.isInfinity())
    })
})

describe('Fraction compare', () => {
    const a = new Fraction(1, 2) // 0.5
    const b = new Fraction(3, 4) // 0.75

    test('canonical signs', () => {
        expect(a.compare(b, '<')).toBe(true)
        expect(a.compare(b, '<=')).toBe(true)
        expect(a.compare(b, '>')).toBe(false)
        expect(a.compare(b, '>=')).toBe(false)
        expect(a.compare(a.clone(), '=')).toBe(true)
    })

    test('alias spellings', () => {
        expect(a.compare(b, 'leq')).toBe(true)
        expect(a.compare(b, '=<')).toBe(true)
        expect(b.compare(a, 'geq')).toBe(true)
        expect(b.compare(a, '=>')).toBe(true)
    })

    test('(in)equality forms including neq and same', () => {
        expect(a.compare(b, '<>')).toBe(true) // 1/2 != 3/4
        expect(a.compare(b, 'neq')).toBe(true) // alias of <>
        expect(a.compare(a.clone(), 'neq')).toBe(false)
        expect(a.compare(a.clone(), 'same')).toBe(true) // alias of =
        expect(a.compare(b, 'same')).toBe(false)
    })
})