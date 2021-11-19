import randomCore from "./randomCore";
import { randomMonomConfig, randomPolynomConfig } from "./rndTypes";
import Monom from "../algebra/monom";
export default class rndMonom extends randomCore {
    protected _config: randomMonomConfig;
    protected _defaultConfig: randomPolynomConfig;
    constructor(userConfig?: randomMonomConfig);
    generate: () => Monom;
}
