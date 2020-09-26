const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_module/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx','.ts', '.js'],
    },
    output: {
        //library: 'Pi',
        //libraryTarget: "umd",
        //globalObject: "this",
        filename: 'pi.js',
        path: path.resolve(__dirname, 'distStatic')
    }
};