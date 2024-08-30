import { Polynom } from "../../algebra/polynom";
import { Equation } from "../../algebra/equation";
import { rndPolynom } from "./rndPolynom";
export function rndEquation(userConfig) {
    const config = Object.assign({
        letters: 'x',
        degree: 1,
        fraction: false,
        zero: false,
        unit: false,
        factorable: false,
        allowNullMonom: true,
        numberOfMonoms: 0,
        positive: true,
        solution: {
            allowZero: true,
            fraction: false,
            nothing: false,
            everything: false
        }
    }, userConfig);
    const P = new Polynom().one();
    for (let i = 0; i < config.degree; i++) {
        const factor = rndPolynom({
            degree: 1,
            unit: config.unit,
            fraction: config.fraction,
            letters: config.letters,
            zero: config.zero
        });
        P.multiply(factor);
    }
    return new Equation(P, 0);
}
//# sourceMappingURL=rndEquation.js.map