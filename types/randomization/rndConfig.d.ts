import type { FractionOrRandom, RandomFraction } from "./rndTypes";
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export declare function isRandomFraction(value: FractionOrRandom): value is RandomFraction;
export declare function mergeConfig<T extends object>(defaults: T, user?: DeepPartial<T>): T;
//# sourceMappingURL=rndConfig.d.ts.map