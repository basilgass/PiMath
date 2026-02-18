/**
 * Random boolean with a percent ratio
 * @param percent
 */
export declare function randomBool(percent?: number): boolean;
/**
 * Random integer between two values.
 * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
 * @param b (number) : To this value. If this is ommited.
 */
export declare function randomInt(a: number, b?: number, exclude?: number[]): number;
/**
 * Random integer between -max and max value.
 * @param max (number) : determine the limits.
 * @param zero (bool) : determine if zero is allowed or not.
 */
export declare function randomIntSym(max: number, zero?: boolean): number;
export declare function randomTriplet(target: number, allowZero?: boolean): [number, number, number] | null;
export declare function randomPrime(max?: number): number;
export declare function randomArray<T>(arr: T[], number?: number): T[];
export declare function randomItem<T>(arr: T[]): T;
export declare function shuffleArray<T>(arr: T[]): T[];
