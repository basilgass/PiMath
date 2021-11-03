declare const _exports: {
    mode: string;
    entry: string;
    devtool: string;
    module: {
        rules: {
            test: RegExp;
            use: string;
            exclude: RegExp;
        }[];
    };
    resolve: {
        extensions: string[];
    };
    output: {
        filename: string;
        path: string;
        library: string;
        libraryTarget: string;
    };
};
export = _exports;
