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
            // 图片文件
            {
                test: /\.(png|jpg|gif)$/,
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
                test: /\.(woff|svg|eot|woff2|tff)$/,
                exclude: /node_modules/,
                use: 'url-loader',
            },
            // js 文件
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: util.loaders.babelLoader,
            },
            // tsx 文件
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [util.loaders.babelLoader, util.loaders.tsLoader],
            },
            // css less cssModule
            // src css
            {
                test: /\.css$/,
                exclude: /node_modules/, // exclude antd default style
                use: [
                    util.loaders.styleLoader,
                    util.loaders.getcssLoader({
                        importLoaders: 1,
                    }),
                ],
                sideEffects: true,
            },
            // src less
            {
                test: /\.less$/,
                exclude: /node_modules/, // exclude antd default style
                use: [
                    util.loaders.styleLoader,
                    '@teamsupercell/typings-for-css-modules-loader',
                    util.loaders.getcssLoader({
                        modules: true,
                        importLoaders: 2,
                    }),
                    util.loaders.postcssLoader,
                    util.loaders.lessLoader,
                ],
            },
            //  /node-modules antd 不支持模块化
            {
                test: /\.less$/,
                include: /node_modules/, // parse antd style , no css modules option
                use: [
                    util.loaders.styleLoader,
                    util.loaders.getcssLoader({
                        importLoaders: 2,
                    }),
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
