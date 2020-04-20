/** @format */

const util = require('./util')

module.exports = {
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: util.loaders.babelLoader,
                exclude: /(node_modules|dist)/,
            },
            {
                test: /\.tsx?$/,
                use: [util.loaders.babelLoader, util.loaders.tsLoader],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/, // exclude antd default style
                use: [util.loaders.styleLoader, util.loaders.cssLoader],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/, // exclude antd default style
                use: [util.loaders.styleLoader, util.loaders.cssLoader, util.loaders.lessLoader],
            },
        ],
    },
    optimization: {
        // 简单拆包
        splitChunks: {
            chunks: 'all',
        },
    },
}
