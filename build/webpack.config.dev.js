const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const path = require('path');

module.exports = {
    mode:'development',
    entry:['./src/index.js','./src/dev.js'],
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
    resolve:{
        extensions:['.wasm','.mjs','.js','.json','.jsx']
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        // babel 转义的配置选项
                        babelrc:false,
                        presets:[
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'),{modules:false}]
                        ],
                        cacheDirectory:true
                    }
                }
            },
            {
                test:/\.tsx?$/,
                loader:'awesome-typescript-loader'
            }
        ]
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