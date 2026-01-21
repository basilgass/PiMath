declare function decompose(value: number): number[][];
declare function divideNumbersByGCD(...values: number[]): number[];
/**
 * Get the list of all dividers of a number.
 * @param value
 */
declare function dividers(value: number): number[];
/**
 * Great Common Divisor
 * @param values : number values
 */
declare function greatestCommonDivisor(...values: number[]): number;
/**
 * Least Common Multiple
 * @param values: list of numbers
 */
declare function leastCommonMultiple(...values: number[]): number;
declare function numberCorrection(value: number, number_of_digits?: number): number;
declare function periodic(value: number): number;
/**
 * Get the list of the nth first prime numbers.
 * @param nb : number of primes to choose from
 */
declare function primes(nb?: number): number[];
declare function pythagoreanTripletsWithTarget(target: number, targetIsSquare?: boolean): number[][];
declare function round(value: number, decimals?: number): number;
declare function greatestPower(value: number, index: number): number;
export declare const Numeric: {
    decompose: typeof decompose;
    dividers: typeof dividers;
    divideNumbersByGCD: typeof divideNumbersByGCD;
    gcd: typeof greatestCommonDivisor;
    lcm: typeof leastCommonMultiple;
    numberCorrection: typeof numberCorrection;
    periodic: typeof periodic;
    primes: typeof primes;
    pythagoreanTripletsWithTarget: typeof pythagoreanTripletsWithTarget;
    round: typeof round;
    greatestPower: typeof greatestPower;
};
export {};
