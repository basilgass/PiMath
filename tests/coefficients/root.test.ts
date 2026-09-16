import {describe, expect, test} from "vitest"
import {Fraction, MathError, ParseError, Root} from "../../src"

describe("root creation", () => {
    test('create root', () => {
        const R = new Root()

        expect(R.index).toBe(2)
        expect(R.factor.value).toBe(0)
        expect(R.radical.value).toBe(0)
    })

    test('falsy but valid inputs are parsed (0, "")', () => {
        const zero = new Root(0)
        expect(zero.factor.value).toBe(0)
        expect(zero.isZero()).toBe(true)
        expect(zero.display).toBe('0')

        expect(new Root("").isZero()).toBe(true)
    })

    test('a NaN input is rejected, not swallowed into a zero root', () => {
        expect(() => new Root(NaN)).toThrow(ParseError)
    })

    test('create from defined values', ()=>{
        const R = new Root()
            .from(2, 7)

        expect(R.index).toBe(2)
        expect(R.radical.value).toBe(7)
        expect(R.factor.value).toBe(1)
    })

    test('create "sqrt(15)"', () => {
        const values = ['sqrt15', 'sqrt(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(2)
            expect(R.factor.value).toBe(1)
            expect(R.radical.value).toBe(15)
        })

    })

    test('create "7sqrt(15)"', () => {
        const values = ['7sqrt15', '7sqrt(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(2)
            expect(R.factor.value).toBe(7)
            expect(R.radical.value).toBe(15)
        })
    })

    test('create "root(3)(15)"', () => {
        const values = ['root(3)15', 'root(3)(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(3)
            expect(R.factor.value).toBe(1)
            expect(R.radical.value).toBe(15)
        })

    })

    test('create "7root(3)(15)"', () => {
        const values = ['7root(3)15', '7root(3)(15)']

        values.forEach(value => {
            const R = new Root(value)

            expect(R.index).toBe(3)
            expect(R.factor.value).toBe(7)
            expect(R.radical.value).toBe(15)
        })
    })

    test('reduce root', ()=>{
        const R = new Root().from(2, 18).reduce()
        expect(R.display).toBe('3sqrt(2)')
    })

    test('clone root', ()=>{
        const R = new Root().from(2,3,5)
        const cloned = R.clone()

        cloned.radical = new Fraction(7)

        expect(cloned.display).toBe('5sqrt(7)')
        expect(R.display).toBe('5sqrt(3)')
    })

    test('parse rejects a malformed string with a coherent ParseError', ()=>{
        // strictness is enforced at Root's boundary, not by Fraction's NaN.
        expect(() => new Root('abc')).toThrowError('Cannot parse "abc" as a root or fraction')
        // A bare numeric / fractional string is still accepted (factor, radical 1).
        expect(new Root('5').display).toBe('5')
        expect(new Root('3/4').display).toBe('3/4')
    })
})

describe('sqrt parsing (operator precedence)', ()=>{
    test('parses factor and radical forms', ()=>{
        // sqrt binds the immediately following integer.
        const s1 = new Root('sqrt2')
        expect(s1.factor.value).toBe(1)
        expect(s1.radical.value).toBe(2)

        // A fractional radical must be parenthesised.
        const s2 = new Root('sqrt(2/7)')
        expect(s2.radical.isEqual(new Fraction(2, 7))).toBe(true)
        expect(s2.factor.value).toBe(1)

        // A bare /D is a division, not the radical.
        const s3 = new Root('sqrt2/7')
        expect(s3.radical.value).toBe(2)
        expect(s3.factor.isEqual(new Fraction(1, 7))).toBe(true)
    })

    test('treats leading N/D and trailing /D as factor arithmetic', ()=>{
        // All these equal (12/7)*sqrt(2).
        const reference = new Root().from(2, 2, new Fraction(12, 7))

        for (const s of ['12sqrt2/7', '12sqrt(2)/7', '12/7sqrt2', '12/7sqrt(2)', '(12sqrt(2))/7']) {
            expect(new Root(s).isEqual(reference)).toBe(true)
        }
    })

    test('parses signs', ()=>{
        expect(new Root('-sqrt2').factor.value).toBe(-1)
        expect(new Root('-7sqrt(2)').factor.value).toBe(-7)
    })

    test('still parses the historical forms', ()=>{
        expect(new Root('sqrt15').radical.value).toBe(15)
        expect(new Root('sqrt(15)').radical.value).toBe(15)
        expect(new Root('7sqrt15').factor.value).toBe(7)
        expect(new Root('7sqrt(15)').factor.value).toBe(7)
        expect(new Root('7sqrt(12/5)').radical.isEqual(new Fraction(12, 5))).toBe(true)
    })

    test('throws on malformed input', ()=>{
        for (const bad of ['sqrt', 'sqrt2sqrt3', '7sqrt', 'sqrtabc']) {
            expect(()=>new Root(bad)).toThrowError(`Invalid sqrt format: "${bad}"`)
        }
    })
})

describe('root string output', ()=>{
    const R1 = new Root().from(2, 3)
    const R2 = new Root().from(2, 3, 5)
    const R3 = new Root().from(3, 5)
    const R4 = new Root().from(3, 5, 7)

    test('output as asciiMath', ()=>{
        expect(R1.display).toBe('sqrt(3)')
        expect(R2.display).toBe('5sqrt(3)')
        expect(R3.display).toBe('root(3)(5)')
        expect(R4.display).toBe('7root(3)(5)')
    })

    test('output as TeX', ()=>{
        expect(R1.tex).toBe('\\sqrt{ 3 }')
        expect(R2.tex).toBe('5 \\sqrt{ 3 }')
        expect(R3.tex).toBe('\\sqrt[ 3 ]{ 5 }')
        expect(R4.tex).toBe('7 \\sqrt[ 3 ]{ 5 }')
    })

    test('output as asciiMath with fraction', ()=>{
        const R1 = new Root().from(2, 3, '2/5')
        expect(R1.display).toBe('(2sqrt(3))/5')

        const R2 = new Root().from(2, '3/7', '2/5')
        expect(R2.display).toBe('(2sqrt(3))/(5sqrt(7))')

        const R3 = new Root().from(4, 3, '2/5')
        expect(R3.display).toBe('(2root(4)(3))/5')

        const R4 = new Root().from(4, '3/7', '2/5')
        expect(R4.display).toBe('(2root(4)(3))/(5root(4)(7))')

        const R5 = new Root().from(4, '1/7', '1/5')
        expect(R5.display).toBe('1/(5root(4)(7))')

        const R6 = new Root().from(4, '2/7', '1/5')
        expect(R6.display).toBe('root(4)(2)/(5root(4)(7))')

        const R7 = new Root().from(4, '1/7', '2/5')
        expect(R7.display).toBe('2/(5root(4)(7))')

        const R01 = new Root().from(4, '0/7', '2/5')
        expect(R01.display).toBe('0')

        const R02 = new Root().from(4, '2/7', '0/5')
        expect(R02.display).toBe('0')
    })

    test('output as TeX with fraction', ()=>{
        const R1 = new Root().from(2, 3, '2/5')
        expect(R1.tex).toBe('\\frac{ 2 \\sqrt{ 3 } }{ 5 }')

        const R2 = new Root().from(2, '3/7', '2/5')
        expect(R2.tex).toBe('\\frac{ 2 \\sqrt{ 3 } }{ 5 \\sqrt{ 7 } }')

        const R3 = new Root().from(4, 3, '2/5')
        expect(R3.tex).toBe('\\frac{ 2 \\sqrt[ 4 ]{ 3 } }{ 5 }')

        const R4 = new Root().from(4, '3/7', '2/5')
        expect(R4.tex).toBe('\\frac{ 2 \\sqrt[ 4 ]{ 3 } }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R5 = new Root().from(4, '1/7', '1/5')
        expect(R5.tex).toBe('\\frac{ 1 }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R6 = new Root().from(4, '2/7', '1/5')
        expect(R6.tex).toBe('\\frac{ \\sqrt[ 4 ]{ 2 } }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R7 = new Root().from(4, '1/7', '2/5')
        expect(R7.tex).toBe('\\frac{ 2 }{ 5 \\sqrt[ 4 ]{ 7 } }')

        const R01 = new Root().from(4, '0/7', '2/5')
        expect(R01.tex).toBe('0')

        const R02 = new Root().from(4, '2/7', '0/5')
        expect(R02.tex).toBe('0')
    })
})

describe('negative radical', ()=>{
    test('preserves the representation in display / tex', ()=>{
        const r = new Root('root(3)(-8)')
        expect(r.display).toBe('root(3)(-8)')
        expect(r.tex).toBe('\\sqrt[ 3 ]{ -8 }')

        const s = new Root('sqrt(-4)')
        expect(s.display).toBe('sqrt(-4)')
        expect(s.tex).toBe('\\sqrt{ -4 }')
    })

    test('value: odd index is real, even index is NaN', ()=>{
        expect(new Root('root(3)(-8)').value).toBe(-2)
        expect(new Root().from(3, -8, -1).value).toBe(2)
        expect(Number.isNaN(new Root('sqrt(-4)').value)).toBe(true)
    })

    test('isEqual stays exact with a signed radical', ()=>{
        expect(new Root('root(3)(-8)').isEqual(new Root(new Fraction(-2)))).toBe(true)
        expect(new Root('root(3)(-8)').isEqual(new Root(new Fraction(2)))).toBe(false)
        // A non-real root compares to nothing, not even itself.
        expect(new Root('sqrt(-4)').isEqual(new Root('sqrt(-4)'))).toBe(false)
    })

    test('reduce carries the sign out of an odd-index radical', ()=>{
        // L1: after reduce the radical is >= 0; the sign lives on the factor.
        // Full extraction -> integer.
        expect(new Root().from(3, -8).reduce().display).toBe('-2')
        // No extraction -> -root(3)(2).
        expect(new Root().from(3, -2).reduce().display).toBe('-root(3)(2)')
        // Mixed: -40 = (-8) * 5 -> -2root(3)(5).
        expect(new Root().from(3, -40).reduce().display).toBe('-2root(3)(5)')
        // Fractional radical: root(3)(-1/8) = -1/2.
        expect(new Root().from(3, '-1/8').reduce().value).toBeCloseTo(-0.5, 10)
    })

    test('reduce preserves the value for a signed radical', ()=>{
        const cases = [[3, -8], [3, -2], [3, -40], [3, -27]] as const
        for (const [index, radical] of cases) {
            const r = new Root().from(index, radical)
            expect(r.clone().reduce().value).toBeCloseTo(r.value, 10)
        }
    })

    test('reduce leaves an even-index negative radical untouched (not real)', ()=>{
        const r = new Root().from(2, -4).reduce()
        expect(Number.isNaN(r.value)).toBe(true)
        expect(r.display).toBe('sqrt(-4)')
    })

    test('isRational detects odd-index negative radicals', ()=>{
        // L1: root(3)(-8) = -2 and root(3)(-27) = -3 are rational.
        expect(new Root().from(3, -8).isRational()).toBe(true)
        expect(new Root().from(3, -27).isRational()).toBe(true)
        // root(3)(-2) is irrational; an even root of a negative is not real.
        expect(new Root().from(3, -2).isRational()).toBe(false)
        expect(new Root().from(2, -4).isRational()).toBe(false)
    })
})

describe('root operations', ()=>{
    const R1 = new Root().from(2, 3, 2) // 2sqrt(3)
    const R2 = new Root().from(2, 3, 5) // 5sqrt(3)
    const R3 = new Root().from(2, 7, 5) // 5sqrt(7)
    const R4 = new Root().from(3, 7, 5) // 5root(3)(7)

    test('reduce roots', ()=>{
        const R = new Root().from(2, 12, 7).reduce()

        expect(R.display).toBe('14sqrt(3)')
    })
    test('reduce rationalises a fractional radical (any index)', ()=>{
        // √(1/2) = √2 / 2
        expect(new Root().from(2, '1/2').reduce().display).toBe('sqrt(2)/2')

        // root(3)(1/4) = root(3)(2) / 2  (was mathematically wrong for index >= 3)
        expect(new Root().from(3, '1/4').reduce().display).toBe('root(3)(2)/2')
    })
    test('reduce preserves the value', ()=>{
        const cases = [[2, '1/2'], [3, '1/4'], [3, '2/9'], [2, '3/5']] as const
        for (const [index, radical] of cases) {
            const r = new Root().from(index, radical)
            expect(r.clone().reduce().value).toBeCloseTo(r.value, 10)
        }
    })
    test('reduce roots with index >= 3 (perfect power extraction)', ()=>{
        // extracting a perfect cube/4th power must give an exact integer factor.
        expect(new Root().from(3, 16).reduce().display).toBe('2root(3)(2)')
        expect(new Root().from(4, 32).reduce().display).toBe('2root(4)(2)')
    })
    test('isEqual compares exact values across different indices', ()=>{
        // sqrt(9) = root(4)(81) = 3, and root(4)(9) = sqrt(3).
        expect(new Root().from(2, 9).isEqual(new Root().from(4, 81))).toBe(true)
        expect(new Root().from(2, 9).isEqual(new Root(new Fraction(3)))).toBe(true)
        expect(new Root().from(4, 9).isEqual(new Root().from(2, 3))).toBe(true)

        // Non-reduced forms: 2sqrt(3) = sqrt(12).
        expect(new Root().from(2, 3, 2).isEqual(new Root().from(2, 12))).toBe(true)

        // Sign matters: -sqrt(3) != sqrt(3).
        expect(new Root().from(2, 3).opposite().isEqual(new Root().from(2, 3))).toBe(false)

        // Plain inequality.
        expect(new Root().from(2, 2).isEqual(new Root().from(2, 3))).toBe(false)

        // Zero cases.
        expect(new Root().from(2, 0).isEqual(new Root().from(3, 0))).toBe(true)
        expect(new Root().from(2, 0).isEqual(new Root().from(2, 3))).toBe(false)

        // Fractional radical (2/4 = 1/2).
        expect(new Root().from(2, '1/2').isEqual(new Root().from(2, '2/4'))).toBe(true)
    })
    test('add two roots with same radical / index', ()=>{
        expect(R1.clone().add(R1).factor.value).toBe(4)
        expect(R1.clone().add(R2).factor.value).toBe(7)
        expect(()=>R1.clone().add(R3)).toThrowError("Roots must share the same index and radical to be added or subtracted")
        expect(()=>R1.clone().add(R4)).toThrowError("Roots must share the same index and radical to be added or subtracted")
    })

    test('add leaves the receiver unchanged when it throws', ()=>{
        const R = new Root().from(2, 12, 7) // 7sqrt(12), intentionally not reduced
        expect(() => R.add(new Root().from(2, 7)))
            .toThrowError('Roots must share the same index and radical to be added or subtracted')
        expect(R.display).toBe('7sqrt(12)') // NOT reduced to 14sqrt(3)
    })

    test('get opposite of root', ()=>{
        expect(R1.clone().opposite().display).toBe('-2sqrt(3)')
    })
    test('subtract two roots with same radical / index', ()=>{
        expect(R1.clone().subtract(R1).factor.value).toBe(0)
        expect(R1.clone().subtract(R2).factor.value).toBe(-3)
        expect(()=>R1.clone().subtract(R3)).toThrowError("Roots must share the same index and radical to be added or subtracted")
        expect(()=>R1.clone().subtract(R4)).toThrowError("Roots must share the same index and radical to be added or subtracted")
    })

    test('multiply two roots with same radical or index', ()=>{
        // 2sqrt(3)
        // 5sqrt(3)
        // 5sqrt(7) = 5 * 7^(1/2)
        // 5root(3)(7) = 5 * 7^(1/3)

        const R11 = R1.clone().multiply(R1)
        expect(R11.factor.value).toBe(4)
        expect(R11.radical.value).toBe(9)

        const R12 = R1.clone().multiply(R2)
        expect(R12.factor.value).toBe(10)
        expect(R12.radical.value).toBe(9)

        const R13 =R1.clone().multiply(R3)
        expect(R13.factor.value).toBe(10)
        expect(R13.radical.value).toBe(21)

        const R34 = R3.clone().multiply(R4)
        expect(R34.factor.value).toBe(25)
        expect(R34.radical.value).toBe(7**5)
        expect(R34.index).toBe(6)

        expect(()=>R1.clone().multiply(R4)).toThrowError('Multiply can only be done if radical or index as equals.')
    })

    test('multiply/divide leave the receiver unchanged when they throw', ()=>{
        // multiply is atomic like add — a failed op must not corrupt `this`.
        const m = R1.clone() // 2sqrt(3)
        expect(() => m.multiply(R4)).toThrowError('Multiply can only be done if radical or index as equals.')
        expect(m.display).toBe('2sqrt(3)') // factor NOT already multiplied

        const d = R1.clone() // 2sqrt(3)
        expect(() => d.divide(R4)).toThrowError('Multiply can only be done if radical or index as equals.')
        expect(d.display).toBe('2sqrt(3)')
    })

    test('raise root to pow', ()=>{
        const R12 = R1.clone().pow(2).reduce()

        expect(R12.display).toBe('12')

        const R42 = R4.clone().pow(2).reduce()

        expect(R42.display).toBe('25root(3)(49)')
    })

    test('take root from root', ()=>{
        const R12 = R1.clone().sqrt() // sqrt(sqrt(12))

        expect(R12.display).toBe('root(4)(12)')

        const R42 = R4.clone().sqrt() // sqrt(root(3)(875))
        expect(R42.display).toBe('root(6)(875)')

        const R45 = R4.clone().root(5) // root(5)(root(3)(875))
        expect(R45.display).toBe('root(15)(875)')
    })
})

describe('predicates, accessors and edge cases', ()=>{
    test('inverse of a root', ()=>{
        const R = new Root().from(2, 3, 2) // 2sqrt(3)
        R.inverse()
        expect(R.factor.value).toBe(0.5)      // 1/2
        expect(R.radical.value).toBeCloseTo(1 / 3, 10)
        // value rounds to 3 decimals (Numeric.numberCorrection default).
        expect(R.value).toBeCloseTo(1 / (2 * Math.sqrt(3)), 3)
    })

    test('group folds the factor into the radical', ()=>{
        const R = new Root().from(2, 3, 2).group() // 2sqrt(3) -> sqrt(12)
        expect(R.factor.isOne()).toBe(true)
        expect(R.radical.value).toBe(12)
        expect(R.display).toBe('sqrt(12)')
    })

    test('divide two compatible roots', ()=>{
        // 2sqrt(3) / 2sqrt(3) = 1
        expect(new Root().from(2, 3, 2).divide(new Root().from(2, 3, 2)).value).toBe(1)
        // 6sqrt(3) / 2sqrt(3) = 3
        expect(new Root().from(2, 3, 6).divide(new Root().from(2, 3, 2)).value).toBe(3)
    })

    test('isOne / isZero predicates', ()=>{
        expect(new Root().from(2, 1, 1).isOne()).toBe(true)
        expect(new Root().from(2, 3, 1).isOne()).toBe(false)

        expect(new Root().isZero()).toBe(true)              // default: factor 0, radical 0
        expect(new Root().from(2, 0).isZero()).toBe(true)     // zero radical
        expect(new Root().from(2, 5, 0).isZero()).toBe(true)  // zero factor (F1)
        expect(new Root().from(2, 5, 2).isZero()).toBe(false)
    })

    test('value of positive roots', ()=>{
        expect(new Root().from(2, 9).value).toBe(3)
        expect(new Root().from(3, 8).value).toBe(2)
        // value rounds to 3 decimals (Numeric.numberCorrection default).
        expect(new Root().from(2, 3, 2).value).toBeCloseTo(2 * Math.sqrt(3), 3)
    })

    test('index must be a strictly positive integer', ()=>{
        expect(() => new Root().from(0, 5)).toThrowError('Index must be a strictly positive integer.')
        expect(() => new Root().from(-2, 5)).toThrowError('Index must be a strictly positive integer.')
        expect(() => new Root().from(2.5, 5)).toThrowError('Index must be a strictly positive integer.')

        // the setter guards direct assignment too
        const R = new Root()
        expect(() => { R.index = 0 }).toThrowError('Index must be a strictly positive integer.')
    })

    test('withSign forces a leading + on a positive factor', ()=>{
        const R = new Root().from(2, 3, 2)
        expect(R.withSign.display).toBe('+2sqrt(3)')
        expect(R.withSign.tex).toBe('+2 \\sqrt{ 3 }')

        // a negative factor keeps its own sign, no extra +
        expect(new Root().from(2, 3, -2).withSign.display).toBe('-2sqrt(3)')

        // withoutSign removes the forced +
        expect(new Root().from(2, 3, 2).withSign.withoutSign.display).toBe('2sqrt(3)')
    })

    test('from keeps a zero factor and rejects invalid primitives (F1)', ()=>{
        // 0 is a valid factor: `from` must not treat it as "omitted" (falsy).
        const R = new Root().from(2, 5, 0)
        expect(R.factor.isZero()).toBe(true)
        expect(R.isZero()).toBe(true)

        // NaN radical / factor are rejected at Root's boundary.
        expect(() => new Root().from(2, 'abc')).toThrowError('Cannot build a root from an invalid radical: "abc"')
        expect(() => new Root().from(2, 5, 'xyz')).toThrowError('Cannot build a root from an invalid factor: "xyz"')

        // a negative radical is not NaN, so it is still allowed.
        expect(() => new Root().from(2, -4)).not.toThrow()
    })

    test('pow(0) yields 1', ()=>{
        const R = new Root().from(2, 3, 5).pow(0) // (5sqrt(3))^0 = 1
        expect(R.index).toBe(1)
        expect(R.factor.isOne()).toBe(true)
        expect(R.radical.isOne()).toBe(true)
        expect(R.value).toBe(1)
        expect(R.isOne()).toBe(true)
    })

    test('root() validates its degree and stays atomic', ()=>{
        for (const bad of [0, -1, 1.5]) {
            expect(() => new Root().from(2, 3, 2).root(bad))
                .toThrowError('The root degree must be a strictly positive integer.')
        }
        // Atomicity: a rejected root() must not have folded the factor (group()).
        const R = new Root().from(2, 3, 2) // 2sqrt(3)
        expect(() => R.root(0)).toThrow()
        expect(R.display).toBe('2sqrt(3)')
    })

    test('pow() stays atomic on a rejected fractional exponent', ()=>{
        // Negative factor + fractional exponent -> Fraction.pow throws; the clone
        // absorbs the mutation, so the receiver is intact.
        const R = new Root().from(2, 3, -2) // -2sqrt(3)
        expect(() => R.pow(0.5)).toThrow(MathError)
        expect(R.display).toBe('-2sqrt(3)')
    })

    test('#parse_root rejects malformed factor/radical', ()=>{
        expect(() => new Root('root(3)(abc)')).toThrowError('Invalid root format: "root(3)(abc)"')
        expect(() => new Root('abcroot(3)(5)')).toThrowError('Invalid root format: "abcroot(3)(5)"')
    })

    test('inverse and divide reject a zero root', ()=>{
        expect(() => new Root(0).inverse()).toThrowError('Cannot invert a zero root.')
        expect(() => new Root().from(2, 3, 2).divide(new Root(0))).toThrow(MathError)
    })

    test('factor/radical setters reject an invalid (NaN) fraction', ()=>{
        const R = new Root().from(2, 3, 2)
        expect(() => { R.radical = new Fraction(NaN) }).toThrow()
        expect(() => { R.factor = new Fraction(NaN) }).toThrow()
    })
})