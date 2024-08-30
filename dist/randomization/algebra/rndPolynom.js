import { rndMonom } from "./rndMonom";
import { Polynom } from "../../algebra/polynom";
import { Monom } from "../../algebra/monom";
import { randomInt } from "../rndHelpers";
const factorableConfig = {
    letters: 'x',
    degree: 2,
    fraction: false,
    zero: false,
    unit: false,
    factorable: false,
    allowNullMonom: true,
    numberOfMonoms: 0,
    positive: true
};
export function rndPolynom(userConfig) {
    const config = Object.assign(factorableConfig, userConfig);
    const P = new Polynom().empty();
    let M;
    for (let i = config.degree; i >= 0; i--) {
        M = rndMonom({
            letters: config.letters,
            degree: i,
            fraction: config.fraction,
            zero: (i === config.degree) ? false : config.allowNullMonom
        });
        if (config.unit && config.degree === i) {
            M.coefficient.one();
        }
        P.add(M);
    }
    if (config.positive && P.monomByDegree().coefficient.isNegative()) {
        P.monomByDegree().coefficient.opposite();
    }
    if (config.numberOfMonoms
        && config.numberOfMonoms > 0
        && config.numberOfMonoms < P.length) {
        while (P.length > config.numberOfMonoms) {
            const index = randomInt(1, P.length - 1);
            P.monoms.splice(index, 1);
        }
    }
    return P;
}
export function rndFactorablePolynom(userConfig) {
    const config = Object.assign(factorableConfig, userConfig);
    const P = new Polynom().one();
    const _factorableConfig = { ...config };
    _factorableConfig.degree = 1;
    _factorableConfig.factorable = false;
    for (let i = 0; i < config.degree; i++) {
        P.multiply(rndPolynom(_factorableConfig));
    }
    return P;
}
//# sourceMappingURL=rndPolynom.js.map