import { randomArray, randomBool, randomInt, randomIntSym, randomItem, randomPrime, shuffleArray } from "./rndHelpers";
import { rndFraction } from "./coefficient/rndFraction";
import { rndMonom } from "./algebra/rndMonom";
import { rndPolynom } from "./algebra/rndPolynom";
import { rndEquation } from "./algebra/rndEquation";
import { rndPoint } from "./geometry/rndPoint";
import { rndCircle } from "./geometry/rndCircle";
import { rndLine } from "./geometry/rndLine";
import { rndLine3 } from "./geometry/rndLine3";
export const Random = {
    equation: (config) => {
        return rndEquation(config);
    },
    polynom: (config) => {
        return rndPolynom(config);
    },
    monom: (config) => {
        return rndMonom(config);
    },
    fraction: (config) => {
        return rndFraction(config);
    },
    number: (from, to, exclude) => {
        return randomInt(from, to, exclude);
    },
    numberSym: (max, allowZero) => {
        return randomIntSym(max, allowZero);
    },
    prime: (max) => {
        return randomPrime(max);
    },
    bool: (percent) => {
        return randomBool(percent);
    },
    array: (arr, number) => {
        return randomArray(arr, number);
    },
    item: (arr) => {
        return randomItem(arr);
    },
    shuffle: (arr) => {
        return shuffleArray(arr);
    },
    line: (config) => {
        return rndLine(config);
    },
    line3: (config) => {
        return rndLine3(config);
    },
    point: (config) => {
        return rndPoint(config);
    },
    circle: (config) => {
        return rndCircle(config);
    }
};
//# sourceMappingURL=random.js.map