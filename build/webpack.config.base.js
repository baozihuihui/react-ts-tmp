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
                exclude: /(node_modules|dist)/,
                use: util.loaders.babelLoader,
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [util.loaders.babelLoader, util.loaders.tsLoader],
            },
            // /css
            {
                // cssModulesTypescriptLoader 必须在 css-loader后进行
                test: /\.css$/,
                use: [util.loaders.styleLoader, util.loaders.cssLoaderNoModules],
            },
            // src less
            {
                test: /\.less$/,
                exclude: /node-modules/,
                use: [
                    // postcss必须在css和less中间
                    util.loaders.styleLoader,
                    // util.loaders.cssModulesTypescriptLoader,
                    util.loaders.cssLoaderNoModules,
                    util.loaders.postcssLoader,
                    util.loaders.lessLoader,
                ],
            },
            // src /node-modules
            {
                test: /\.less$/,
                exclude: /src/, // parse antd style , no css modules option
                use: [
                    // postcss必须在css和less中间
                    // util.loaders.styleLoader,
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
