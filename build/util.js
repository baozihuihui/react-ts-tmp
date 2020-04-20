/** @format */

const tsImportPluginFactory = require('ts-import-plugin')

const babelLoader = {
    loader: 'babel-loader',
    options: {
        babelrc: true,
        cacheDirectory: true,
    },
}

const tsLoader = {
    loader: 'ts-loader',
    options: {
        transpileOnly: true,
        // 因为引入tsx->ts-loader,antd的按需加载需要 ts-import-plugin
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryName: 'antd',
                    // libraryDirectory: 'lib',
                    libraryDirectory: 'es', // for webpack 4 !!!!!
                    style: true,
                }),
            ],
        }),
    },
}

const styleLoader = {
    loader: 'style-loader', // creates style nodes from JS strings
}

const cssLoader = {
    loader: 'css-loader', // translates CSS into CommonJS
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
    },
}

const util = {
    loaders: {
        babelLoader,
        tsLoader,
        styleLoader,
        cssLoader,
        lessLoader,
    },
}

module.exports = util
