import { Circle } from "../../geometry/circle"
import { randomInt } from "../rndHelpers"
import type { randomGeometryCircleConfig } from "../rndTypes"
import { rndVector } from "./rndVector"

export function rndCircle(userConfig?: randomGeometryCircleConfig): Circle {
    const config = Object.assign(
        {
            center: {
                x: { min: -10, max: 10 },
                y: { min: -10, max: 10 }
            },
            pointsOnCircle: 8
        }, userConfig)

    const center = rndVector(config.center)

    let rv, r
    if (config.pointsOnCircle === 8) {
        rv = randomInt(1, 3),
            r = rv ** 2 + (rv + 1) ** 2
    } else {
        r = randomInt(1, 20)
    }

    return new Circle(center, r, true)
}