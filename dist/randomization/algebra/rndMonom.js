import { Monom } from "../../algebra/monom";
import { rndFraction } from "../coefficient/rndFraction";
import { randomItem } from "../rndHelpers";
export function rndMonom(userConfig) {
    const config = Object.assign({
        letters: 'x',
        degree: 2,
        fraction: true,
        zero: false
    }, userConfig);
    const M = new Monom();
    M.coefficient = rndFraction({
        zero: config.zero,
        reduced: true,
        natural: !config.fraction
    });
    if (config.letters.length > 1) {
        for (const L of config.letters.split('')) {
            M.setLetter(L, 0);
        }
        for (let i = 0; i < config.degree; i++) {
            const L = randomItem(config.letters.split(""));
            M.setLetter(L, M.degree(L).clone().add(1));
        }
    }
    else {
        M.setLetter(config.letters, config.degree);
    }
    return M;
}
//# sourceMappingURL=rndMonom.js.map