import type { RandomRange } from "./rndTypes";
export declare const MAX_ATTEMPTS = 1000;
export declare const DEFAULT_RANGE = 10;
export interface Bounds {
    min: number;
    max: number;
}
export declare function normalizeZero(value: number): number;
export declare function toInterval(range: RandomRange | undefined): Bounds;
//# sourceMappingURL=rndInterval.d.ts.map