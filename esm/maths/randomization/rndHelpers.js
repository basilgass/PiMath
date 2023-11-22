"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndHelpers = void 0;
/**
 * Random helpers
 */
const numeric_1 = require("../numeric");
class rndHelpers {
    /**
     * Random boolean with a percent ratio
     * @param percent
     */
    static randomBool(percent = 0.5) {
        return Math.random() < percent;
    }
    /**
     * Random integer between two values.
     * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
     * @param b (number) : To this value. If this is ommited.
     */
    static randomInt(a, b, exclude) {
        if (b === undefined) {
            if (a >= 0) {
                return this.randomInt(0, a);
            }
            else {
                return this.randomInt(a, 0);
            }
        }
        // Same start and end values
        if (a === b) {
            return a;
        }
        // No exclusion
        if (exclude === undefined) {
            return Math.floor(Math.random() * (b - a + 1) + a);
        }
        // With exclusion
        if (Math.abs(b - a) <= exclude.length) {
            throw new Error('The number of excluded values is too high.');
        }
        let r = this.randomInt(a, b);
        while (exclude.includes(r)) {
            r = this.randomInt(a, b);
        }
        return r;
    }
    /**
     * Random integer between -max and max value.
     * @param max (number) : determine the limits.
     * @param zero (bool) : determine if zero is allowed or not.
     */
    static randomIntSym(max, zero) {
        if (zero === false) {
            return this.randomBool() ? this.randomInt(1, max) : -this.randomInt(1, max);
        }
        else {
            return this.randomInt(-max, max);
        }
    }
    static randomPrime(max) {
        let primes = numeric_1.Numeric.primes();
        if (max !== undefined) {
            primes = primes.filter(x => x < max);
        }
        return this.randomItem(primes);
    }
    static randomArray(arr, number) {
        if (number === undefined) {
            number = 1;
        }
        // Return a clone array
        if (arr.length <= 0) {
            return Object.values(arr);
        }
        // Randomize the array and return the n first elements.
        return rndHelpers.shuffleArray(arr).slice(0, number);
    }
    static randomItem(arr) {
        if (arr.length === 0) {
            return '';
        }
        return arr[this.randomInt(0, arr.length - 1)];
    }
    static shuffleArray(arr) {
        // The Fisher-Yates algorithm
        let shuffleArray = Object.values(arr);
        for (let i = shuffleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffleArray[i];
            shuffleArray[i] = shuffleArray[j];
            shuffleArray[j] = temp;
        }
        return shuffleArray;
    }
}
exports.rndHelpers = rndHelpers;
//# sourceMappingURL=rndHelpers.js.map