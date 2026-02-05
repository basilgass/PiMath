import {describe, test} from "vitest"
import {Random} from "../src/randomization/random"
import {PolyFactor} from "../src/algebra/polyFactor"
import {Vector} from "../src/geometry/vector"
import {determinantFromVectors} from "../src/geometry/geomMath"
import {Matrix, Point} from "../src"

describe('Debug tests', ()=>{
    test('polynom randomisation', ()=>{
        let question="", answer=""


        const P = Random.polynom({
                degree: 1,
                allowNullMonom: false,
                unit: true
            }),
            Q = Random.polynom({
                degree: 1,
                allowNullMonom: false,
                unit: true
            })

        P.divide(P.gcdNumerator())
        Q.divide(Q.gcdNumerator())

        answer = new PolyFactor(P, Q).display
        question = P.multiply(Q).tex
        console.log(question)
        console.log(answer)

        return {question, answer}
    })

    test('cross', ()=>{
        console.log('d=',
            new Vector(2,-1,1).cross(new Vector(1,-3,1)).display)
        const V1 = new Vector(1,2,-3)
        const V2 = new Vector(2,-1,7)

        const C = V1.cross(V2)
        console.log(C.display)
        console.log(C.normSquare.display)
        const A1A2 = new Vector(4,0,3)
        console.log(C.dot(A1A2).display)
        console.log(C.dot(A1A2).value / C.norm)

        console.log(determinantFromVectors(
            V2, V1, new Vector(-1,3,-10)
        ).value)
    })

    test('ba', ()=>{
        const A= new Point(1,3,2)
        const B = new Point(-2,1,-2)
        // const I = new Point(-1,7, 0)
        // const I = new Point(58,0,0)
        const I = new Point(-3,-12,-2)

        const AB = new Vector(A, B)
        // AB.x = 1
        // AB.y = 2
        AB.z = 0
        console.log(AB.display)
        const AI = new Vector(A, I)
        console.log(AI.display)
        const IB = new Vector(I, B)
        console.log(IB.display)

        const cross = AB.cross(AI)
        // const cross = IB.cross(AI.opposite())
        console.log(cross.display)
        console.log(cross.normSquare.display)
        console.log(cross.norm / 2)
    })

    test('4', ()=>{
        const v1 = new Vector(4,3,-4)
        const v2 = new Vector(4,0,3)
        const v3 = new Vector(6,32,3)

        console.log(determinantFromVectors(v1, v2, v3).display)
    })

    test('4d6 * 6', ()=>{
        const results: number[] = []

        for(let i=0; i<6; i++){
            const d6:number[] = []
            for(let d=0; d<4;d++){
                d6.push( Random.number(1,6))
            }

            d6.sort()
            d6.shift()
            results.push( d6.reduce((a,b)=>a+b, 0) )
        }

        console.log(results)
    })

    test('ex supp', ()=>{
        const CI = new Matrix().fromValues([
            [345, 31, 42, 8]
        ])
        const P = new Matrix().fromValues([
            [0.74, 0.15, 0.08, 0.03],
            [0.47, 0.29, 0.18, 0.06],
            [0.25, 0.36, 0, 0.39],
            [0.03, 0.42, 0, 0.55]
        ])

        const X = CI.clone().multiply(P)
        console.log(X.toFixed(2).display)
    })
})