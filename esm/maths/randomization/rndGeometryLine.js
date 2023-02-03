"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rndGeometryLine = void 0;
const randomCore_1 = require("./randomCore");
const random_1 = require("./random");
const line_1 = require("../geometry/line");
const vector_1 = require("../geometry/vector");
const point_1 = require("../geometry/point");
/**
 * Create a random monom based on a based configuration
 */
class rndGeometryLine extends randomCore_1.randomCore {
    constructor(userConfig) {
        super();
        this.generate = () => {
            // The A point exists.
            const d = new vector_1.Vector(random_1.Random.numberSym(10), random_1.Random.numberSym(10));
            while (d.isNull) {
                d.x = random_1.Random.numberSym(10);
                d.y = random_1.Random.numberSym(10);
            }
            if (this._config.slope === 1) {
                if (d.x.sign() !== d.y.sign()) {
                    d.y.opposed();
                }
            }
            else if (this._config.slope === -1) {
                if (d.x.sign() !== d.y.sign()) {
                    d.y.opposed();
                }
            }
            return new line_1.Line(new point_1.Point(this._config.A.x, this._config.A.y), d);
        };
        this._defaultConfig = {
            A: {
                x: random_1.Random.numberSym(10),
                y: random_1.Random.numberSym(10)
            },
        };
        // TODO: Strange that it raise an error
        // @ts-ignore
        this._config = this.mergeConfig(userConfig, this._defaultConfig);
    }
}
exports.rndGeometryLine = rndGeometryLine;
//# sourceMappingURL=rndGeometryLine.js.map