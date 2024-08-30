import { Fraction } from "../../coefficients/fraction";
import { randomInt, randomIntSym } from "../rndHelpers";
export function rndFraction(userConfig) {
    const config = Object.assign({
        negative: true,
        max: 10,
        reduced: true,
        zero: true,
        natural: false
    }, userConfig);
    const Q = new Fraction();
    if (config.negative) {
        Q.numerator = randomIntSym(config.max, config.zero);
    }
    else {
        Q.numerator = randomInt(config.zero ? 0 : 1, config.max);
    }
    if (config.natural) {
        Q.denominator = 1;
    }
    else {
        let securityCount = 0;
        while (Q.isRelative() && securityCount < 10) {
            Q.denominator = randomInt(1, config.max);
            securityCount++;
        }
    }
    return config.reduced ? Q.reduce() : Q;
}
//# sourceMappingURL=rndFraction.js.map