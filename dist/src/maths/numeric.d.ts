export declare class Numeric {
    static round(value: number, decimals?: number): number;
    static prime(nb?: number): number[];
    static dividers(value: number): number[];
    static gcd(...values: number[]): number;
    static lcm(...values: number[]): number;
    static randomBool(percent?: number): boolean;
    static randomInt(a: number, b?: number): number;
    static randomIntSym(max: number, zero?: boolean): number;
    static randomArray(arr: any[], number?: number): any[];
    static randomItem(arr: any[]): any;
    static shuffleArray(arr: any[]): any[];
}
