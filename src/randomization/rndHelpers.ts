/**
 * Random helpers
 */
import {Numeric} from "../numeric"


/**
 * Random boolean with a percent ratio
 * @param percent
 */
export function randomBool(percent = 0.5): boolean {
    return Math.random() < percent
}

/**
 * Random integer between two values.
 * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
 * @param b (number) : To this value. If this is ommited.
 */
export function randomInt(a: number, b?: number, exclude?: number[]): number {
    if (b === undefined) {
        if (a >= 0) {
            return randomInt(0, a)
        } else {
            return randomInt(a, 0)
        }
    }

    // Same start and end values
    if (a === b) {
        return a
    }

    // No exclusion
    if (exclude === undefined) {
        return Math.floor(Math.random() * (b - a + 1) + a)
    }

    // With exclusion
    if (Math.abs(b - a) <= exclude.length) {
        throw new Error('The number of excluded values is too high.')
    }

    let r = randomInt(a, b)
    while (exclude.includes(r)) {
        r = randomInt(a, b)
    }
    return r
}

/**
 * Random integer between -max and max value.
 * @param max (number) : determine the limits.
 * @param zero (bool) : determine if zero is allowed or not.
 */
export function randomIntSym(max: number, zero?: boolean): number {
    if (zero === false) {
        return randomBool() ? randomInt(1, max) : -randomInt(1, max)
    } else {
        return randomInt(-max, max)
    }
}

export function randomTriplet(target: number, allowZero?: boolean): [number, number, number] | null {
    const triplets = Numeric.pythagoreanTripletsWithTarget(target)
        .filter(x => allowZero === true || !x.includes(0))

    if (triplets.length === 0) return null

    return randomItem(triplets)
}

export function randomPrime(max?: number): number {
    let primes = Numeric.primes()
    if (max !== undefined) {
        primes = primes.filter(x => x < max)
    }
    return randomItem(primes)
}

export function randomArray<T>(arr: T[], number?: number): T[] {
    if (number === undefined) {
        number = 1
    }

    // Return a clone array
    if (arr.length <= 0) {
        return Object.values(arr)
    }

    // Randomize the array and return the n first elements.
    return shuffleArray(arr).slice(0, number)
}

export function randomItem<T>(arr: T[]): T {
    if (arr.length === 0) {
        return null as T
    }
    return arr[randomInt(0, arr.length - 1)]
}

export function shuffleArray<T>(arr: T[]): T[] {
    // The Fisher-Yates algorithm
    const shuffleArray = Object.values(arr)
    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = shuffleArray[i]
        shuffleArray[i] = shuffleArray[j]
        shuffleArray[j] = temp
    }

    return shuffleArray
}
