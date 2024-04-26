import { Point } from '../geometry/point';
import { randomGeometryPointConfig } from './random';
import { randomCore } from './randomCore';

/**
 * Create a random monom based on a based configuration
 */
export declare class rndGeometryPoint extends randomCore {
    protected _config: randomGeometryPointConfig;
    protected _defaultConfig: randomGeometryPointConfig;
    constructor(userConfig?: randomGeometryPointConfig);
    generate: () => Point;
}
