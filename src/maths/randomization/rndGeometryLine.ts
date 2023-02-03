import {randomCore} from "./randomCore";
import {Random, randomGeometryLineConfig} from "./random";
import {Line} from "../geometry/line";
import {Vector} from "../geometry/vector";
import {PiMath} from "../../index";
import {Point} from "../geometry/point";

/**
 * Create a random monom based on a based configuration
 */
export class rndGeometryLine extends randomCore {
    declare protected _config: randomGeometryLineConfig
    declare protected _defaultConfig: randomGeometryLineConfig

    constructor(userConfig?: randomGeometryLineConfig) {
        super();

        this._defaultConfig = {
            A: {
                x: Random.numberSym(10),
                y: Random.numberSym(10)
            },
        }

        // TODO: Strange that it raise an error
        // @ts-ignore
        this._config = this.mergeConfig(userConfig, this._defaultConfig)
    }

    generate = (): Line => {
        // The A point exists.
        const d = new Vector(
            Random.numberSym(10),
            Random.numberSym(10)
        )

        while(d.isNull){
            d.x = Random.numberSym(10)
            d.y = Random.numberSym(10)
        }

        if(this._config.slope===1){
            if(d.x.sign()!==d.y.sign()){
                d.y.opposed()
            }
        }else if(this._config.slope===-1){
            if(d.x.sign()!==d.y.sign()){
                d.y.opposed()
            }
        }

        return new Line(new Point(this._config.A.x, this._config.A.y), d)
    }
}
