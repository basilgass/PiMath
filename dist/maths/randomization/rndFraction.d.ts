import { Fraction } from '../coefficients/fraction';
import { randomCoefficientConfig } from './rndTypes';
import { randomCore } from './randomCore';

/**
 * Create a random monom based on a based configuration
 */
export declare class rndFraction extends randomCore {
    protected _config: randomCoefficientConfig;
    protected _defaultConfig: randomCoefficientConfig;
    constructor(userConfig?: randomCoefficientConfig);
    generate: () => Fraction;
}
