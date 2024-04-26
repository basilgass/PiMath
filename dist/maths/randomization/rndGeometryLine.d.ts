import { Line } from '../geometry/line';
import { randomGeometryLineConfig } from './random';
import { randomCore } from './randomCore';

/**
 * Create a random monom based on a based configuration
 */
export declare class rndGeometryLine extends randomCore {
    protected _config: randomGeometryLineConfig;
    protected _defaultConfig: randomGeometryLineConfig;
    constructor(userConfig?: randomGeometryLineConfig);
    generate: () => Line;
}
