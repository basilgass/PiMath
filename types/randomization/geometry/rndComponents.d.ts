import { type Point, Vector } from "../../geometry";
import type { RandomCoefficientConfig, RandomRange, RandomVectorOptions } from "../rndTypes";
type VectorOptions = RandomVectorOptions & {
    fraction?: boolean | RandomCoefficientConfig;
    range?: RandomRange;
};
export declare function validateVectorOptions(config: VectorOptions): void;
export declare function drawVector(draw: () => Vector, range: RandomRange, primitive: boolean): Vector;
export declare function drawVectorFromPoints<C extends VectorOptions>(userConfig: C | undefined, drawPoint: (pointConfig: Omit<C, 'allow' | 'primitive'> & {
    allow: {
        origin: boolean;
    };
}) => Point): Vector;
export {};
//# sourceMappingURL=rndComponents.d.ts.map