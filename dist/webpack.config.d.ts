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
    };
    optimization: {
        minimize: boolean;
    };
};
export = _exports;
