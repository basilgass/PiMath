/**
 * Random helpers
 */
export declare class rndHelpers {
    /**
     * Random boolean with a percent ratio
     * @param percent
     */
    static randomBool(percent?: number): boolean;
    /**
     * Random integer between two values.
     * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
     * @param b (number) : To this value. If this is ommited.
     */
    static randomInt(a: number, b?: number): number;
    /**
     * Random integer between -max and max value.
     * @param max (number) : determine the limits.
     * @param zero (bool) : determine if zero is allowed or not.
     */
    static randomIntSym(max: number, zero?: boolean): number;
    static randomArray(arr: any[], number?: number): any[];
    static randomItem(arr: any[]): any;
    static shuffleArray(arr: any[]): any[];
}
