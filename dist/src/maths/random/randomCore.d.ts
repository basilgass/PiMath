export default class randomCore {
    protected _config: Object;
    protected _defaultConfig: Object;
    mergeConfig: (config: Object, defaultConfig: Object) => Object;
    generate: () => unknown;
    config: (config: Object) => randomCore;
}
