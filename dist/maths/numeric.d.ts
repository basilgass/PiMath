export declare class Numeric {
    static round(value: number, decimals?: number): number;
    /**
     * Get the list of the nth first prime numbers.
     * @param nb : number of primes to choose from
     */
    static primes(nb?: number): number[];
    /**
     * Get the list of all dividers of a number.
     * @param value
     */
    static dividers(value: number): number[];
    /**
     * Great Common Divisor
     * @param values : number values
     */
    static gcd(...values: number[]): number;
    static divideNumbersByGCD(...values: number[]): number[];
    /**
     * Least Common Multiple
     * @param values: list of numbers
     */
    static lcm(...values: number[]): number;
    static pythagoricianTripletsWithTarget(target: number, targetIsSquare?: boolean): number[][];
    static numberCorrection(value: number, epsilonDigit?: number, epsilonNumberOfDigits?: number, number_of_digits?: number): number;
    static periodic(value: number): number;
    static decompose(value: number): number[][];
}
