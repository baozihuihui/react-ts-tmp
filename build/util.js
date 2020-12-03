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
                    style: true, // style :true 加载less文件
                }),
            ],
        }),
    },
}

const styleLoader = {
    loader: 'style-loader', // creates style nodes from JS strings
}

const getcssLoader = options => ({
    loader: 'css-loader', // translates CSS into CommonJS
    options,
})

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
        ],
    },
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        lessOptions: {
            javascriptEnabled: true,
        },
    },
}

const util = {
    loaders: {
        babelLoader,
        tsLoader,
        styleLoader,
        getcssLoader,
        lessLoader,
        postcssLoader,
    },
}

module.exports = util
