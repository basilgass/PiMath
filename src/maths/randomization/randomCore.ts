export class randomCore {
    protected _config: Object
    protected _defaultConfig: Object
    mergeConfig = (config: Object, defaultConfig: Object): Object => {
        if (config !== undefined) {
            return {...defaultConfig, ...config}
        }
        return defaultConfig
    }

    generate = (): unknown => {
        return undefined
    }

    config = (config: Object): randomCore => {
        this._config = this.mergeConfig(config, this._defaultConfig)
        return this
    }
}