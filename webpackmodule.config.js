const path = require('path');
/*const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;*/

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
        extensions: ['.tsx','.ts', '.js'],
    },
    output: {
        filename: 'pi.esm.js',
        path: path.resolve(__dirname, 'esm'),
        library: 'Pi',
        libraryTarget: "umd"
    },
    /*plugins: [
        new BundleAnalyzerPlugin()
    ]*/
};