import { Numeric } from "../numeric";
export function randomBool(percent = 0.5) {
    return Math.random() < percent;
}
export function randomInt(a, b, exclude) {
    if (b === undefined) {
        if (a >= 0) {
            return randomInt(0, a);
        }
        else {
            return randomInt(a, 0);
        }
    }
    if (a === b) {
        return a;
    }
    if (exclude === undefined) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    if (Math.abs(b - a) <= exclude.length) {
        throw new Error('The number of excluded values is too high.');
    }
    let r = randomInt(a, b);
    while (exclude.includes(r)) {
        r = randomInt(a, b);
    }
    return r;
}
export function randomIntSym(max, zero) {
    if (zero === false) {
        return randomBool() ? randomInt(1, max) : -randomInt(1, max);
    }
    else {
        return randomInt(-max, max);
    }
}
export function randomPrime(max) {
    let primes = Numeric.primes();
    if (max !== undefined) {
        primes = primes.filter(x => x < max);
    }
    return randomItem(primes);
}
export function randomArray(arr, number) {
    if (number === undefined) {
        number = 1;
    }
    if (arr.length <= 0) {
        return Object.values(arr);
    }
    return shuffleArray(arr).slice(0, number);
}
export function randomItem(arr) {
    if (arr.length === 0) {
        return null;
    }
    return arr[randomInt(0, arr.length - 1)];
}
export function shuffleArray(arr) {
    const shuffleArray = Object.values(arr);
    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffleArray[i];
        shuffleArray[i] = shuffleArray[j];
        shuffleArray[j] = temp;
    }
    return shuffleArray;
}
//# sourceMappingURL=rndHelpers.js.map