import { Numeric } from "../lib/maths/numeric"
import { describe, expect, it } from "vitest"

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

    it.skip('algo perso', () => {
        for (let n = 1000; n < 10000; n++) {
            const a = Math.trunc(n / 1000)
            const b = Math.trunc((n - 1000 * a) / 100)
            const c = Math.trunc((n - 1000 * a - 100 * b) / 10)
            const d = Math.trunc(n - 1000 * a - 100 * b - 10 * c)

            const p = a + b + c + d
            const p2 = a ** 2 + b ** 2 + c ** 2 + d ** 2

            if (n === p * p2 ** 2) {
                console.log(n)
            }
        }
    })
})
