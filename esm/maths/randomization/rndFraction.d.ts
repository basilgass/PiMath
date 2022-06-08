import { randomCore } from "./randomCore";
import { randomCoefficientConfig } from "./rndTypes";
import { Fraction } from "../coefficients/fraction";
/**
 * Create a random monom based on a based configuration
 */
export declare class rndFraction extends randomCore {
    protected _config: randomCoefficientConfig;
    protected _defaultConfig: randomCoefficientConfig;
    constructor(userConfig?: randomCoefficientConfig);
    generate: () => Fraction;
}
