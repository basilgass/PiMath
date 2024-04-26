import {randomCore} from "./randomCore";
import {Random, randomGeometryCircleConfig} from "./random";
import {Circle} from "../geometry/circle";

/**
 * Create a random monom based on a based configuration
 */
export class rndGeometryCircle extends randomCore {
    declare protected _config: randomGeometryCircleConfig
    declare protected _defaultConfig: randomGeometryCircleConfig

    generate = (): Circle => {
        const center = Random.Geometry.point(this._config.center)

        let rv, r
        if (this._config.pointsOnCircle === 8) {
            rv = Random.number(1, 3),
                r = rv ** 2 + (rv + 1) ** 2
        } else {
            r = Random.number(1, 20)
        }

        const c = new Circle(center, r, true)


        // let pts = c.getPointsOnCircle(true)
        //
        // pts = Random.shuffle(pts)
        // let ptt = pts.shift(),
        //     pt1 = pts.shift(),
        //     pt2
        //
        // for (let pt of pts) {
        //     if (!pt1.x.isEqual(pt.x) && !pt1.y.isEqual(pt.y) && !A.isEqual(new Point().middleOf(pt1, pt))) {
        //         pt2 = pt.clone()
        //         break
        //     }
        // }

        return c

    }

    constructor(userConfig?: randomGeometryCircleConfig) {
        super();

        this._defaultConfig = {}
        this._config = this.mergeConfig(userConfig, this._defaultConfig)
    }
}
