import {Line} from "../../geometry/line"
import {Vector} from "../../geometry/vector"
import {randomIntSym} from "../rndHelpers"
import type {randomGeometryLineConfig} from "../rndTypes"

export function rndLine(userConfig?: randomGeometryLineConfig): Line {
    const config = Object.assign(
        {
            A: {
                x: randomIntSym(10),
                y: randomIntSym(10)
            },
        }, userConfig)

    // The A point exists.
    const d = new Vector(0, 0)

    while (d.isNull) {
        d.x = randomIntSym(10, config.allow?.vertical ?? true)
        d.y = randomIntSym(10, config.allow?.horizontal ?? true)
    }

    // slope === 1 => slope must be positive
    if (config.slope === 1) {
        if (d.x.sign() !== d.y.sign()) {
            d.y.opposite()
        }
    } else if (config.slope === -1) {
        if (d.x.sign() !== d.y.sign()) {
            d.y.opposite()
        }
    }

    return new Line().fromPointAndDirection(new Vector(config.A.x, config.A.y), d)
}