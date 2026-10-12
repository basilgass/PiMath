import type { Vector } from "../../geometry";
import type { RandomGeometryVector3Config } from "../rndTypes";
import { type ZeroRules3 } from "./rndPoint3";
export declare function rndVector3(userConfig?: RandomGeometryVector3Config): Vector;
export declare function rndVector3WithRules(userConfig: RandomGeometryVector3Config | undefined, rules: ZeroRules3[]): Vector;
//# sourceMappingURL=rndVector3.d.ts.map