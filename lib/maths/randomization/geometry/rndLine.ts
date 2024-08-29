import { Line } from "../../geometry/line"
import { Vector } from "../../geometry/vector"
import { randomIntSym } from "../rndHelpers"
import type { randomGeometryLineConfig } from "../rndTypes"

export function rndLine(userConfig?: randomGeometryLineConfig): Line {
    const config = Object.assign(
        {
            A: {
                x: randomIntSym(10),
                y: randomIntSym(10)
            },
        }, userConfig)

    // The A point exists.
    const d = new Vector(
        randomIntSym(10),
        randomIntSym(10)
    )

    while (d.isNull) {
        d.x = randomIntSym(10)
        d.y = randomIntSym(10)
    }

    if (config.slope === 1) {
        if (d.x.sign() !== d.y.sign()) {
            d.y.opposite()
        }
    } else if (config.slope === -1) {
        if (d.x.sign() !== d.y.sign()) {
            d.y.opposite()
        }
    }

    return new Line(new Vector(config.A.x, config.A.y), d)
}