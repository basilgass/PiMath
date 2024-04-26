import { Polynom } from '../algebra/polynom';
import { randomPolynomConfig } from './rndTypes';
import { randomCore } from './randomCore';

/**
 * Random polynoms
 */
export declare class rndPolynom extends randomCore {
    protected _config: randomPolynomConfig;
    protected _defaultConfig: randomPolynomConfig;
    generate: () => Polynom;
    constructor(userConfig?: randomPolynomConfig);
    factorable: () => Polynom;
}
