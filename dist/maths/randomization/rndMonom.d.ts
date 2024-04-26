import { Monom } from '../algebra/monom';
import { randomMonomConfig } from './rndTypes';
import { randomCore } from './randomCore';

/**
 * Create a random monom based on a based configuration
 */
export declare class rndMonom extends randomCore {
    protected _config: randomMonomConfig;
    protected _defaultConfig: randomMonomConfig;
    generate: () => Monom;
    constructor(userConfig?: randomMonomConfig);
}
