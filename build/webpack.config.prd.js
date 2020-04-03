const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'production',
    entry:'./src/index.js',
    output:{
        path:'./dist/js',
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
        })
    ]
}