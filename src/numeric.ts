import {InvalidArgumentError} from "./errors"

/** Upper bound of the memoized prime sieve (largest prime below it is 9973). */
const PRIME_LIMIT = 10000
let primeCache: number[] | undefined

/**
 * Sieve of Eratosthenes: all primes up to (and including) limit.
 * @param limit - inclusive upper bound.
 */
function sieve(limit: number): number[] {
    const isComposite = new Uint8Array(limit + 1)
    const result: number[] = []

    for (let n = 2; n <= limit; n++) {
        if (isComposite[n] === 0) {
            result.push(n)
            for (let m = n * n; m <= limit; m += n) {
                isComposite[m] = 1
            }
        }
    }

    return result
}

/**
 * Split a value into all its factor pairs [u, v] such that u * v = value.
 * @param value - the integer to decompose.
 */
function decompose(value: number): number[][] {
    const divs: number[] = dividers(value)
    const arr: number[][] = []
    let u: number
    let v: number

    while (divs.length > 0) {
        u = divs.shift() ?? 1
        v = (divs.length > 0 ? divs.pop() : +u) ?? 1

        arr.push([u, v])
    }

    return arr
}

/**
 * Divide every value by their greatest common divisor (simplify a ratio).
 * @param values - the integers to simplify together.
 */
function divideNumbersByGCD(...values: number[]): number[] {
    const g = greatestCommonDivisor(...values)

    return values.map(x => x / g)
}

/**
 * Get the sorted list of all (unique) dividers of an integer.
 * @param value - an integer (a non-integer input is rejected).
 * @throws {InvalidArgumentError} if value is not a finite integer.
 */
function dividers(value: number): number[] {
    if (!Number.isInteger(value)) {
        throw new InvalidArgumentError(`dividers expects a finite integer, got ${value}`)
    }

    const absV = Math.abs(value)
    const maxV = Math.sqrt(absV)

    // Initialize the list of dividers.
    const D: number[] = []

    for (let i = 1; i <= maxV; i++) {
        if (value % i === 0) {
            D.push(i)
            D.push(absV / i)
        }
    }

    // Order numbers.
    D.sort(function (a, b) {
        return a - b
    })

    // Make sure the array of value is unique.
    return [...new Set(D)]
}

/**
 * Great Common Divisor
 * @param values : number values
 */
function greatestCommonDivisor(...values: number[]): number {
    // Define the gcd for two number
    const gcd2 = function (a: number, b: number): number {
        if(isNaN(a) || isNaN(b)) {
            return NaN
        }
        if (b === 0) {
            return a
        }
        if(a === 0) {
            return b
        }
        return gcd2(b, a % b)
    }

    let g = 1
        let i = 2

    // Nothing is given
    if (values.length === 0) {
        return 1
    }
    // Only one number is given
    if (values.length === 1) {
        // The first number is zero
        if (values[0] === 0) {
            return 1
        }
        // Return the number
        return Math.abs(values[0])
    }

    // We have at least 2 numbers.
    g = gcd2(values[0], values[1])

    // The gcd of the two first value is one ? It's already finished.
    if (g === 1) {
        return 1
    }

    // The current gcd isn't one. Continue with all next values.
    for (i = 2; i < values.length; i++) {
        g = gcd2(g, values[i])
        // Escape if gcd is already one.
        if (g === 1) {
            break
        }
    }

    return Math.abs(g)
}

/**
 * Least Common Multiple
 * @param values: list of numbers
 */
function leastCommonMultiple(...values: number[]): number {
    return values.reduce(function (a, b) {
        return Math.abs(a / greatestCommonDivisor(a, b) * b)
    }, 1)
}

/**
 * Round away floating point representation noise (e.g. 0.1 + 0.2 -> 0.3).
 * @param value - the number to correct.
 * @param number_of_digits - digits to keep, clamped to the [0, 100] toFixed range.
 */
function numberCorrection(value: number, number_of_digits = 3): number {
    const digits = Math.min(100, Math.max(0, Math.trunc(number_of_digits)))
    return +value.toFixed(digits)
}

/**
 * Get the list of the nth first prime numbers.
 * @param nb : number of primes to choose from
 */
function primes(nb?: number): number[] {
    primeCache ??= sieve(PRIME_LIMIT)

    if (nb === undefined) {
        return [...primeCache]
    }

    return primeCache.slice(0, Math.min(primeCache.length, nb))
}

/**
 * Find every pythagorean triplet [u, v, hypotenuse] with u^2 + v^2 = hypotenuse^2.
 * Both (u, v) and (v, u) orderings and zero legs are returned; callers filter them.
 * @param target - the hypotenuse (or its square if targetIsSquare is true).
 * @param targetIsSquare - when true, target is interpreted as the squared hypotenuse.
 */
function pythagoreanTripletsWithTarget(target: number, targetIsSquare?: boolean): [number, number, number][] {
    // Inverse method: `target` is the hypotenuse, unless targetIsSquare is true
    // (then it is its square).
    const targetSquare = targetIsSquare === true ? target : target ** 2
    const hypotenuse = targetIsSquare === true ? Math.sqrt(target) : target

    const triplets: [number, number, number][] = []

    // Legs never exceed the hypotenuse. Both (u, v) and (v, u) orderings and zero
    // legs are returned on purpose; callers filter them as needed (e.g.
    // randomTriplet excludes zeros).
    for (let u = 0; u <= hypotenuse; u++) {
        for (let v = 0; v <= hypotenuse; v++) {
            if (u ** 2 + v ** 2 === targetSquare) {
                triplets.push([u, v, hypotenuse])
            }
        }
    }

    return triplets
}

/**
 * Round a value to a given number of decimals. Negative decimals round to
 * tens, hundreds, etc.
 * @param value - the number to round.
 * @param decimals - decimal places (truncated to an integer); may be negative.
 */
function round(value: number, decimals = 2): number {
    const d = Math.trunc(decimals)
    const exp: number = Math.round(Number(`${value}e${d}`))

    return Number(`${exp}e${-d}`)
}

/**
 * Get the greatest perfect power of the given index that divides value
 * (e.g. greatestPower(50, 2) = 25). Returns 1 when none exists or on
 * invalid arguments (index <= 0 or value < 0).
 * @param value - the value to search into.
 * @param index - the power exponent (root degree).
 */
function greatestPower(value: number, index: number): number {
    if (index <= 0 || value < 0) {
        return 1
    }

    let search_value = Math.floor(Math.pow(value, 1 / index))

    while (search_value > 1) {
        const pow = Math.pow(search_value, index)
        if (value % pow === 0) {
            return pow
        }

        search_value--
    }

    return 1
}


export const Numeric = Object.freeze({
    decompose,
    dividers,
    divideNumbersByGCD,
    gcd: greatestCommonDivisor,
    lcm: leastCommonMultiple,
    numberCorrection,
    primes,
    pythagoreanTripletsWithTarget,
    round,
    greatestPower
})