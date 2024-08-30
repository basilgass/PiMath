import { Fraction } from "../../coefficients/fraction"
import type { randomGeometryPointConfig } from "../rndTypes"
import { rndFraction } from "../coefficient/rndFraction"
import { randomIntSym } from "../rndHelpers"
import { Point } from "../../geometry/vector"

export function rndPoint(userConfig?: randomGeometryPointConfig): Point {
    const config: {
        axis: 'x' | 'y' | 'z' | null,
        fraction: boolean,
        max: number,
        quadrant: number | null
    } = Object.assign(
        {
            axis: true,
            fraction: false,
            max: 10,
            quadrant: null
        }, userConfig)

    const zeroX = config.axis === 'x',
        zeroY = config.axis === 'y'


    const x = config.fraction ?
        rndFraction({ max: config.max, zero: zeroX }) :
        new Fraction(randomIntSym(config.max, zeroX))

    const y = config.fraction ?
        rndFraction({ max: config.max, zero: zeroY }) :
        new Fraction(randomIntSym(config.max, zeroY))

    if (Number(config.quadrant) === 1) {
        x.abs()
        y.abs()
    }
    if (Number(config.quadrant) === 2) {
        if (x.isPositive()) {
            x.opposite()
        }
        if (y.isNegative()) {
            y.opposite()
        }
    }
    if (Number(config.quadrant) === 3) {
        if (x.isPositive()) {
            x.opposite()
        }
        if (y.isPositive()) {
            y.opposite()
        }
    }
    if (Number(config.quadrant) === 4) {
        if (x.isNegative()) {
            x.opposite()
        }
        if (y.isPositive()) {
            y.opposite()
        }
    }

    return new Point(x, y)
}
