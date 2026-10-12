import type {Vector} from "../../geometry"
import type {RandomGeometryVectorConfig} from "../rndTypes"
import {drawVectorFromPoints} from "./rndComponents"
import {rndPoint} from "./rndPoint"

/**
 * Generates a random 2D `Vector`.
 *
 * The components are drawn like the coordinates of `rndPoint`, with the same options: `axis`, `quadrant`,
 * `range` and `fraction` (see `rndPoint`). Two options are specific to vectors (see `RandomVectorOptions` in
 * `rndTypes.ts`): `allow.zero` (the null vector is excluded by default; it replaces the `allow.origin` of
 * points) and `primitive` (integer components with no common divisor).
 *
 * @throws {InvalidArgumentError} if `allow.origin` is given (use `allow.zero`), if `allow.zero` or `primitive`
 *   is not a boolean, or if `primitive` is combined with fractions.
 * @throws {InvalidArgumentError} for any invalid or incompatible point option (see `rndPoint`), or if no
 *   primitive vector within `range` is found.
 */
export function rndVector(userConfig?: RandomGeometryVectorConfig): Vector {
    return drawVectorFromPoints(userConfig, rndPoint)
}
