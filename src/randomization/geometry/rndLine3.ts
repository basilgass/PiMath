import { Line3 } from "../../geometry/line3"
import { Point } from "../../geometry/point"
import { Vector } from "../../geometry/vector"
import { randomIntSym } from "../rndHelpers"
import type { randomGeometryLine3Config } from "../rndTypes"

export function rndLine3(userConfig?: randomGeometryLine3Config): Line3 {
    const config = Object.assign(
        {
            A: {
                x: randomIntSym(10),
                y: randomIntSym(10),
                z: randomIntSym(10)
            },
            direction: {
                x: randomIntSym(10),
                y: randomIntSym(10),
                z: randomIntSym(10)
            }
        }, userConfig)

    // The direction vector exists.
    const A = new Point(config.A.x, config.A.y, config.A.z)
    const d = new Vector(config.direction.x, config.direction.y, config.direction.z)

    return new Line3(A, d)
}