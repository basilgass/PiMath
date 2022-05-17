"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCore = void 0;
class randomCore {
    constructor() {
        this.mergeConfig = (config, defaultConfig) => {
            if (config !== undefined) {
                return { ...defaultConfig, ...config };
            }
            return defaultConfig;
        };
        this.generate = () => {
            return undefined;
        };
        this.config = (config) => {
            this._config = this.mergeConfig(config, this._defaultConfig);
            return this;
        };
    }
}
exports.randomCore = randomCore;
//# sourceMappingURL=randomCore.js.map