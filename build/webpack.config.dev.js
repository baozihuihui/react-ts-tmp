const  HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack  = require('webpack')
const path  = require('path')

module.exports = {
    mode:'development',
    entry:['./src/index.tsx','./src/dev.js'],
    devtool: 'cheap-module-eval-source-map', // 开发环境我们只添加  忽略列信息的ts源码的sourcemap
    devServer:{
        contentBase:path.join(__dirname,'./src/'),
        publicPath:'/',
        host:'127.0.0.1',
        port:3000,
        hot:true,
        stats:{
            colors:true
        }
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'public/index.html',
            filename:'index.html',
            inject:true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}