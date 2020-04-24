/** @format */
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const util = require('./util')

module.exports = {
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            // loader use数组 是逆序使用
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
            // /src
            {
                // cssModulesTypescriptLoader 必须在 css-loader后进行
                test: /\.css$/,
                use: [util.loaders.styleLoader, util.loaders.cssModulesTypescriptLoader, util.loaders.cssLoader],
            },
            {
                test: /\.less$/,
                exclude: /node-modules/,
                use: [
                    // postcss必须在css和less中间
                    util.loaders.styleLoader,
                    util.loaders.cssLoader,
                    util.loaders.postcssLoader,
                    util.loaders.lessLoader,
                ],
            },
            // /node-modules
            {
                test: /\.less$/,
                include: /node-modules/, // parse antd style , no css modules option
                use: [
                    util.loaders.styleLoader,
                    util.loaders.cssLoaderNoModules,
                    util.loaders.postcssLoader,
                    util.loaders.lessLoader,
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 如果项目依赖变多时，可以考虑采用下方更精细的分片规则
            // minSize: 60000,
            // minChunks: 3,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // cacheGroups: {
            //     antdUI: {
            //         priority: 20,
            //         name: 'antdUI',
            //         test: /[\\/]node_modules[\\/]antd[\\/]/,
            //     },
            //     antDesign: {
            //         priority: 20,
            //         name: 'antdUI',
            //         test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
            //     },
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //         name: 'vendors',
            //     },
            // },
        },
    },
    plugins: [
        new LodashModuleReplacementPlugin({
            collections: true,
            paths: true,
        }),
    ],
}
