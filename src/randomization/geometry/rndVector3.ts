import type {Vector} from "../../geometry"
import type {RandomGeometryVector3Config} from "../rndTypes"
import {drawVectorFromPoints} from "./rndComponents"
import {rndPoint3, rndPoint3WithRules, type ZeroRules3} from "./rndPoint3"

/**
 * Generates a random 3D `Vector`.
 *
 * The components are drawn like the coordinates of `rndPoint3`, with the same options: `axis`, `plane`,
 * `octant`, `range` and `fraction` (see `rndPoint3`). Two options are specific to vectors (see
 * `RandomVectorOptions` in `rndTypes.ts`): `allow.zero` (the null vector is excluded by default; it replaces the
 * `allow.origin` of points) and `primitive` (integer components with no common divisor).
 *
 * @throws {InvalidArgumentError} if `allow.origin` is given (use `allow.zero`), if `allow.zero` or `primitive`
 *   is not a boolean, or if `primitive` is combined with fractions.
 * @throws {InvalidArgumentError} for any invalid or incompatible point option (see `rndPoint3`), or if no
 *   primitive vector within `range` is found.
 */
export function rndVector3(userConfig?: RandomGeometryVector3Config): Vector {
    return drawVectorFromPoints(userConfig, rndPoint3)
}

/**
 * Internal variant of {@link rndVector3} where the zero rules of the components are given instead of derived
 * from `axis` and `plane` (which are ignored), see `rndPoint3WithRules`.
 *
 * @throws {InvalidArgumentError} as {@link rndVector3}, except for `axis` and `plane`, which are not read.
 */
export function rndVector3WithRules(userConfig: RandomGeometryVector3Config | undefined, rules: ZeroRules3[]): Vector {
    return drawVectorFromPoints(userConfig, (pointConfig) => rndPoint3WithRules(pointConfig, rules))
}
