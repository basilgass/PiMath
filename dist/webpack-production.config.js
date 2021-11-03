const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/main.ts',
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'pi.js',
        path: path.resolve(__dirname, 'distProduction'),
    },
    optimization: {
        minimize: true
    }
};
//# sourceMappingURL=webpack-production.config.js.map