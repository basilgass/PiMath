import { Point } from "../../geometry";
import type { RandomGeometryPoint3Config } from "../rndTypes";
import { type ZeroRule } from "../rndCoordinates";
type Triple<T> = [T, T, T];
export type ZeroRules3 = Triple<ZeroRule>;
export declare function rndPoint3(userConfig?: RandomGeometryPoint3Config): Point;
export declare function rndPoint3WithRules(userConfig: RandomGeometryPoint3Config | undefined, rules: ZeroRules3[]): Point;
export declare function isPoint3Feasible(userConfig: RandomGeometryPoint3Config | undefined, rules: ZeroRules3[]): boolean;
export {};
//# sourceMappingURL=rndPoint3.d.ts.map