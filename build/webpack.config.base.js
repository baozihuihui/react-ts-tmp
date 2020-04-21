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
                // exclude: /node_modules/, // exclude antd default style
                use: [util.loaders.styleLoader, util.loaders.cssLoader],
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/, // exclude antd default style
                use: [util.loaders.styleLoader, util.loaders.cssLoader, util.loaders.lessLoader],
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
}
