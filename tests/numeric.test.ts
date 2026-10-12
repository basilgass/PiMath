import {Numeric} from "../src"
import {describe, expect, it, test} from "vitest"

describe('Numeric', () => { // the tests container
    it('Correct number', () => {
        const a = 0.1 + 0.2
        expect(Numeric.numberCorrection(a)).to.be.equal(0.3)
        const b = Math.pow(10, -5)

        expect(Numeric.numberCorrection(b, 8)).to.be.equal(0.00001)
    })

    it('should simplify numbers by the gcd', () => {
        let a = 12, b = 15, c = 33, d = 303;

        [a, b, c, d] = Numeric.divideNumbersByGCD(a, b, c, d)

        expect([a, b, c, d]).to.have.all.members([4, 5, 11, 101])
    })

    it('should decompose a number in two factors', function () {
        expect(Numeric.decompose(25).map(x => x.join(','))).to.have.all.members(['1,25', '5,5'])
        expect(Numeric.decompose(6).map(x => x.join(','))).to.have.all.members(['1,6', '2,3'])
    })

    it('should propagate the integer check of dividers', () => {
        // decompose relays the throw from dividers on a non-integer input.
        expect(() => Numeric.decompose(2.5)).to.throw()
    })

    describe('gcd (greatest common divisor)', () => {
        it('should compute the gcd of several numbers', () => {
            expect(Numeric.gcd(12, 18)).to.equal(6)
            expect(Numeric.gcd(12, 15, 33, 303)).to.equal(3)
            expect(Numeric.gcd(7, 13)).to.equal(1)
        })

        it('should always return a positive value with negative inputs', () => {
            // the single-argument path must apply Math.abs like the >=2 path.
            expect(Numeric.gcd(-5)).to.equal(5)
            expect(Numeric.gcd(-12, 18)).to.equal(6)
            expect(Numeric.gcd(-12, -18)).to.equal(6)
        })

        it('should handle edge cases (empty, zero)', () => {
            expect(Numeric.gcd()).to.equal(1)
            expect(Numeric.gcd(0)).to.equal(1)
            expect(Numeric.gcd(0, 5)).to.equal(5)
        })
    })

    describe('lcm (least common multiple)', () => {
        it('should compute the lcm of several numbers', () => {
            expect(Numeric.lcm(4, 6)).to.equal(12)
            expect(Numeric.lcm(3, 4, 5)).to.equal(60)
            expect(Numeric.lcm(6)).to.equal(6)
        })

        it('should return 1 for an empty argument list without throwing', () => {
            // reduce with an initial value avoids the TypeError on [].
            expect(() => Numeric.lcm()).to.not.throw()
            expect(Numeric.lcm()).to.equal(1)
        })

        it('should stay exact for large numbers (no overflow)', () => {
            // a * b = 5.4e19 overflows MAX_SAFE_INTEGER, but a / gcd * b = 1.8e10 stays exact.
            const a = 6000000000
            const b = 9000000000
            expect(a * b).to.be.greaterThan(Number.MAX_SAFE_INTEGER)
            expect(Numeric.lcm(a, b)).to.equal(18000000000)
        })

        it('should return 0 when any value is 0', () => {
            // lcm with a zero collapses to 0.
            expect(Numeric.lcm(0, 5)).to.equal(0)
            expect(Numeric.lcm(5, 0)).to.equal(0)
        })
    })

    test('get pythagorician triplets', ()=>{
        const triples: number[] = []

        for(let i=1; i<100; i++){
            const t = Numeric.pythagoreanTripletsWithTarget(i).filter(x=>!x.includes(0))
            if(t.length>0){
                triples.push(i)
            }
        }

        console.log(triples.join(','))

    })

    describe('pythagoreanTripletsWithTarget', () => {
        it('should find the (3, 4, 5) triplet from the hypotenuse', () => {
            const triplets = Numeric.pythagoreanTripletsWithTarget(5)
                .map(t => t.join(','))
            expect(triplets).to.include('3,4,5')
            // Both orderings and zero legs are returned on purpose.
            expect(triplets).to.include('4,3,5')
            expect(triplets).to.include('0,5,5')
        })

        it('should return the hypotenuse (not its square) when targetIsSquare', () => {
            // with targetIsSquare the third component must be sqrt(target) = 5, not 25.
            const triplets = Numeric.pythagoreanTripletsWithTarget(25, true)
            const nonZero = triplets.filter(t => !t.includes(0))
            expect(nonZero.map(t => t.join(','))).to.include('3,4,5')
            expect(nonZero.every(t => t[2] === 5)).to.equal(true)
        })

        it('should throw on a negative or non-integer target', () => {
            // no more silent [] on invalid input.
            expect(() => Numeric.pythagoreanTripletsWithTarget(-5)).to.throw()
            expect(() => Numeric.pythagoreanTripletsWithTarget(2.5)).to.throw()
            expect(() => Numeric.pythagoreanTripletsWithTarget(2.25, true)).to.throw()
            expect(() => Numeric.pythagoreanTripletsWithTarget(NaN)).to.throw()
        })

        it('should yield the single [0, 0, 0] triplet for target 0', () => {
            expect(Numeric.pythagoreanTripletsWithTarget(0)).to.deep.equal([[0, 0, 0]])
        })
    })

    describe('round', () => {
        it('should round to the given number of decimals', () => {
            expect(Numeric.round(3.14159)).to.equal(3.14)
            expect(Numeric.round(3.14159, 3)).to.equal(3.142)
            expect(Numeric.round(2.5, 0)).to.equal(3)
        })

        it('should round to tens/hundreds with negative decimals', () => {
            // negative decimals used to produce NaN (e--1); now round to 10, 100, ...
            expect(Numeric.round(157, -1)).to.equal(160)
            expect(Numeric.round(1449, -2)).to.equal(1400)
        })

        it('should truncate a non-integer decimals argument', () => {
            expect(Numeric.round(3.14159, 2.9)).to.equal(3.14)
        })

        it('should truncate a negative non-integer decimals argument', () => {
            // -1.9 truncates to -1, so 157 rounds to the nearest ten.
            expect(Numeric.round(157, -1.9)).to.equal(160)
        })
    })

    describe('nthRoot', () => {
        it('should return the exact integer root of a perfect power', () => {
            // Math.pow(perfectPower, 1/index) used to produce float noise.
            expect(Numeric.nthRoot(25, 2)).to.equal(5)
            expect(Numeric.nthRoot(8, 3)).to.equal(2)
            expect(Numeric.nthRoot(16, 4)).to.equal(2)
            expect(Numeric.nthRoot(1000, 3)).to.equal(10)
        })

        it('should handle trivial cases', () => {
            expect(Numeric.nthRoot(0, 3)).to.equal(0)
            expect(Numeric.nthRoot(1, 5)).to.equal(1)
            expect(Numeric.nthRoot(7, 1)).to.equal(7)
        })

        it('should fall back to the real root for a non-perfect power', () => {
            expect(Numeric.nthRoot(10, 3)).to.be.closeTo(Math.cbrt(10), 1e-9)
            expect(Number.isInteger(Numeric.nthRoot(10, 3))).to.equal(false)
        })

        it('should support negative values for odd indices only', () => {
            expect(Numeric.nthRoot(-8, 3)).to.equal(-2)
            expect(Numeric.nthRoot(-4, 2)).to.be.NaN
        })

        it('should return NaN for an invalid index', () => {
            expect(Numeric.nthRoot(8, 0)).to.be.NaN
        })
    })

    describe('numberCorrection', () => {
        it('should correct floating point noise', () => {
            expect(Numeric.numberCorrection(0.1 + 0.2)).to.equal(0.3)
        })

        it('should clamp the digits argument to a valid toFixed range', () => {
            // out-of-range digits used to throw a RangeError.
            expect(() => Numeric.numberCorrection(1.2345, -1)).to.not.throw()
            expect(() => Numeric.numberCorrection(1.2345, 500)).to.not.throw()
            expect(Numeric.numberCorrection(1.2345, -1)).to.equal(1)
        })
    })

    describe('dividers', () => {
        it('should list the sorted unique dividers of an integer', () => {
            expect(Numeric.dividers(12)).to.deep.equal([1, 2, 3, 4, 6, 12])
            expect(Numeric.dividers(13)).to.deep.equal([1, 13])
            expect(Numeric.dividers(25)).to.deep.equal([1, 5, 25])
        })

        it('should use the absolute value for negative integers', () => {
            expect(Numeric.dividers(-6)).to.deep.equal([1, 2, 3, 6])
        })

        it('should return [] for 0', () => {
            // 0 is divisible by every integer; no finite list is returned.
            expect(Numeric.dividers(0)).to.deep.equal([])
        })

        it('should throw on a non-integer input', () => {
            // the integer hypothesis is now validated.
            expect(() => Numeric.dividers(2.5)).to.throw()
            expect(() => Numeric.dividers(NaN)).to.throw()
        })
    })

    describe('greatestPower', () => {
        it('should return the greatest perfect power dividing the value', () => {
            expect(Numeric.greatestPower(50, 2)).to.equal(25)
            expect(Numeric.greatestPower(54, 3)).to.equal(27)
        })

        it('should return 1 when no perfect power divides the value', () => {
            expect(Numeric.greatestPower(7, 2)).to.equal(1)
        })

        it('should guard against invalid arguments', () => {
            // index <= 0 returns 1 instead of NaN/garbage.
            expect(Numeric.greatestPower(50, 0)).to.equal(1)
        })

        it('should return 1 for value 0', () => {
            // nothing to extract from 0.
            expect(Numeric.greatestPower(0, 2)).to.equal(1)
            expect(Numeric.greatestPower(0, 3)).to.equal(1)
        })

        it('should propagate the sign for a negative value with an odd index', () => {
            // L1: an odd root of a negative is real; the sign is carried out so
            // Root.reduce can pull -1 from the radical.
            expect(Numeric.greatestPower(-8, 3)).to.equal(-8)
            expect(Numeric.greatestPower(-54, 3)).to.equal(-27)
            expect(Numeric.greatestPower(-40, 3)).to.equal(-8)
            expect(Numeric.greatestPower(-2, 3)).to.equal(-1)
        })

        it('should return 1 for a negative value with an even index', () => {
            // L1: an even root of a negative is not real, nothing to extract.
            expect(Numeric.greatestPower(-50, 2)).to.equal(1)
        })
    })

    describe('primes', () => {
        it('should return the full list without argument', () => {
            const all = Numeric.primes()
            expect(all[0]).to.equal(2)
            expect(all[1]).to.equal(3)
            expect(all[all.length - 1]).to.equal(9973)
        })

        it('should return the nth first primes', () => {
            expect(Numeric.primes(5)).to.deep.equal([2, 3, 5, 7, 11])
            expect(Numeric.primes(0)).to.deep.equal([])
        })

        it('should cap nb to the list length', () => {
            const all = Numeric.primes()
            expect(Numeric.primes(all.length + 1000)).to.have.lengthOf(all.length)
        })

        it('should return a copy that does not affect the source', () => {
            // the returned array is a copy, mutating it must not leak.
            const first = Numeric.primes()
            first[0] = -1
            expect(Numeric.primes()[0]).to.equal(2)
        })
    })

    describe('Numeric namespace', () => {
        it('should be frozen against mutation', () => {
            // the shared namespace must not be mutable.
            expect(Object.isFrozen(Numeric)).to.equal(true)
        })
    })
})

describe('Numeric.greatestPower with exact integer roots', () => {
    it('extracts perfect cubes whose floating cube root falls just below the integer', () => {
        expect(Numeric.greatestPower(64, 3)).toBe(64)
        expect(Numeric.greatestPower(-64, 3)).toBe(-64)
        expect(Numeric.greatestPower(64 * 3, 3)).toBe(64)
        expect(Numeric.greatestPower(1000, 3)).toBe(1000)
    })
})

describe('Numeric edge cases', () => {
    it('lcm of only zeros is 0, not NaN', () => {
        expect(Numeric.lcm(0, 0)).to.equal(0)
        expect(Numeric.lcm(0)).to.equal(0)
        expect(Numeric.lcm(0, 0, 3)).to.equal(0)
    })

    it('round handles values written with an exponent', () => {
        expect(Numeric.round(1e-7, 9)).to.equal(1e-7)
        expect(Numeric.round(1.5e21, 2)).to.equal(1.5e21)
        expect(Numeric.round(1.2345e-3, 4)).to.equal(0.0012)
    })

    it('round keeps the existing behaviour and passes non-finite values through', () => {
        expect(Numeric.round(1.005, 2)).to.equal(1.01)
        expect(Numeric.round(1234, -2)).to.equal(1200)
        expect(Numeric.round(-2.5, 0)).to.equal(-2)
        expect(Numeric.round(Infinity)).to.equal(Infinity)
        expect(Number.isNaN(Numeric.round(NaN))).to.equal(true)
    })

    it('primes rejects a negative or non-integer count and caps an oversized one', () => {
        expect(() => Numeric.primes(-3)).to.throw()
        expect(() => Numeric.primes(2.5)).to.throw()
        expect(Numeric.primes(0)).to.deep.equal([])
        expect(Numeric.primes(3)).to.deep.equal([2, 3, 5])
        expect(Numeric.primes(100000)).to.have.length(1229)
    })
})
