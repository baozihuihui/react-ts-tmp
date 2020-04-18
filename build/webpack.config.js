const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const devConfig = require('./webpack.config.dev')
const prdConfig = require('./webpack.config.prd')

// const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : prdConfig; // 通过不同的环境，我们运行不同的webpack文件
    return merge(baseConfig, config);
};