import {describe, test} from "vitest"
import {Random} from "../src/randomization/random"
import {PolyFactor} from "../src/algebra/polyFactor"

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
})