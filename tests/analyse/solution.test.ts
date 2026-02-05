import {describe, expect, test} from "vitest"
import {Solution} from "../../src/analyze/solution"

describe('Solution creation', () => {
    test('create Solution from Fraction', ()=>{
        const S = Solution.fromFraction('2/3')

        expect(S.exact).toBe(true)
        expect(S.fraction.display).toBe('2/3')
        expect(S.root.isZero()).toBe(true)
    })

    test('create Solution from Quadratic', ()=>{
        const S = Solution.fromQuadratic(1, 3, 1)

        expect(S[0].tex).toBe('\\frac{ -3 - \\sqrt{ 5 } }{ 2 }')
        expect(S[1].tex).toBe('\\frac{ -3 + \\sqrt{ 5 } }{ 2 }')

        const S2 = Solution.fromQuadratic(3, 4, -1)

        expect(S2[0].reduce().tex).toBe('\\frac{ -2 - \\sqrt{ 7 } }{ 3 }')
        expect(S2[1].reduce().tex).toBe('\\frac{ -2 + \\sqrt{ 7 } }{ 3 }')

        const S3 = Solution.fromQuadratic(5, 4, -1)

        expect(S3[0].reduce().tex).toBe('-1')
        expect(S3[1].reduce().tex).toBe('\\frac{ 1 }{ 5 }')

        const S4 = Solution.fromQuadratic(5, 12, -4)

        expect(S4[0].reduce().tex).toBe('\\frac{ -6 -2 \\sqrt{ 14 } }{ 5 }')
        expect(S4[1].reduce().tex).toBe('\\frac{ -6 +2 \\sqrt{ 14 } }{ 5 }')
    })
})