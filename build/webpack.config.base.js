/** @format */
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const {loader} = require('./util')

module.exports = {
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            // loader use数组 是逆序使用
            // 图片文件
            {
                test: loader.loaderRegx.imgRegx,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // outputPath:'../',//输出**文件夹
                            publicPath: '/',
                            name: 'images/[name].[ext]',
                            limit: 1000, //是把小于1000B的文件打成Base64的格式，写入JS
                        },
                    },
                ],
            },
            // 文字文件
            {
                test: loader.loaderRegx.fileRegx,
                exclude: loader.loaderRegx.nodeModulesRegx,
                use: 'url-loader',
            },
            // js 文件
            {
                test: loader.loaderRegx.jsRegx,
                exclude: /(node_modules|dist)/,
                use: loader.babelLoader,
            },
            // tsx 文件
            {
                test: loader.loaderRegx.tsxRegx,
                exclude: loader.loaderRegx.nodeModulesRegx,
                use: [loader.babelLoader, loader.tsLoader],
            },
            // css less cssModule
            // src css
            {
                test: loader.loaderRegx.cssRegx,
                exclude: loader.loaderRegx.nodeModulesRegx, // exclude antd default style
                use: [
                    loader.styleLoader,
                    loader.getcssLoader({
                        importLoaders: 1,
                    }),
                ],
                sideEffects: true,
            },
            // src less
            {
                test: loader.loaderRegx.lessRegx,
                exclude: loader.loaderRegx.nodeModulesRegx, // exclude antd default style
                use: [
                    loader.styleLoader,
                    loader.typingsForCssModulesLoader,
                    loader.getcssLoader({
                        modules: {
                            localIdentName: '[local]_[hash:base64:5]',
                        },
                        importLoaders: 2,
                    }),
                    loader.postcssLoader,
                    loader.lessLoader,
                ],
            },
            //  /node-modules antd 不支持模块化
            {
                test: loader.loaderRegx.lessRegx,
                include: loader.loaderRegx.nodeModulesRegx, // parse antd style , no css modules option
                use: [
                    loader.styleLoader,
                    loader.getcssLoader({
                        importLoaders: 2,
                    }),
                    loader.postcssLoader,
                    loader.lessLoader,
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
