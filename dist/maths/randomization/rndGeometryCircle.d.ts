import { Circle } from '../geometry/circle';
import { randomGeometryCircleConfig } from './random';
import { randomCore } from './randomCore';

/**
 * Create a random monom based on a based configuration
 */
export declare class rndGeometryCircle extends randomCore {
    protected _config: randomGeometryCircleConfig;
    protected _defaultConfig: randomGeometryCircleConfig;
    generate: () => Circle;
    constructor(userConfig?: randomGeometryCircleConfig);
}
