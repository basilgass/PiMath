declare function decompose(value: number): number[][];
declare function divideNumbersByGCD(...values: number[]): number[];
declare function dividers(value: number): number[];
declare function greatestCommonDivisor(...values: number[]): number;
declare function leastCommonMultiple(...values: number[]): number;
declare function numberCorrection(value: number, number_of_digits?: number): number;
declare function periodic(value: number): number;
declare function primes(nb?: number): number[];
declare function pythagoreanTripletsWithTarget(target: number, targetIsSquare?: boolean): [number, number, number][];
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
//# sourceMappingURL=numeric.d.ts.map