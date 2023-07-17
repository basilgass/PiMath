const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
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
        filename: 'pimath.js',
        path: path.resolve(__dirname, 'dev'),
    },
    optimization: {
        minimize: false
    }
};