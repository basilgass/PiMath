import { Fraction } from "../coefficients";
import type { RandomCoefficientConfig } from "./rndTypes";
import { type Bounds } from "./rndInterval";
export type ZeroRule = 'zero' | 'nonzero' | 'free';
export declare function restrict(interval: Bounds, sign: 1 | -1 | undefined): Bounds;
export declare function ruleProblem(interval: Bounds, rule: ZeroRule): string | null;
export declare function rulesProblem(intervals: readonly Bounds[], rules: readonly ZeroRule[]): string | null;
export declare function assertRule(interval: Bounds, rule: ZeroRule): void;
export declare function rndCoordinate(interval: Bounds, rule: ZeroRule, fraction: boolean | RandomCoefficientConfig | undefined): Fraction;
//# sourceMappingURL=rndCoordinates.d.ts.map