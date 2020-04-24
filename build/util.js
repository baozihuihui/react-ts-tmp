/** @format */

const tsImportPluginFactory = require('ts-import-plugin')

const babelLoader = {
    loader: 'babel-loader',
    options: {
        babelrc: true, // 使用 .babelrc 文件
        cacheDirectory: true,
    },
}

const tsLoader = {
    loader: 'ts-loader',
    options: {
        transpileOnly: true,
        // 因为tsx 引入 ts-loader,antd的按需加载需要 ts-import-plugin
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryName: 'antd',
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
    options: {
        modules: true,
    },
}

const cssLoaderNoModules = {
    loader: 'css-loader', // antd包 不需要模块化，否则会无法加载
}

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => [require('autoprefixer')()],
    },
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
    },
}

const cssModulesTypescriptLoader = {
    loader: 'css-modules-typescript-loader',
}

const util = {
    loaders: {
        babelLoader,
        tsLoader,
        styleLoader,
        cssLoader,
        lessLoader,
        postcssLoader,
        cssModulesTypescriptLoader,
        cssLoaderNoModules,
    },
}

module.exports = util
