import { randomCore } from "./randomCore";
import { randomMonomConfig } from "./rndTypes";
import { Monom } from "../algebra/monom";
export declare class rndMonom extends randomCore {
    protected _config: randomMonomConfig;
    protected _defaultConfig: randomMonomConfig;
    constructor(userConfig?: randomMonomConfig);
    generate: () => Monom;
}
