import randomCore from "./randomCore";
import { randomPolynomConfig } from "./rndTypes";
import Polynom from "../algebra/polynom";
export default class rndPolynom extends randomCore {
    protected _config: randomPolynomConfig;
    protected _defaultConfig: randomPolynomConfig;
    constructor(userConfig?: randomPolynomConfig);
    generate: () => Polynom;
    factorable: () => Polynom;
}
