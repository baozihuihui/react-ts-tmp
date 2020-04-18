const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path')

module.exports = {
    mode:'production',
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'./dist/js'),
        filename:'[name]-[hash].js'
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
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'public/index.html',
            filename:'index.html',
            inject:true,
        }),
        new CleanWebpackPlugin(), // 生产环境我们只先添加build清除文件，用来清除每次build产生的hash文件，避免因为无用文件导致打包过大
    ]
}