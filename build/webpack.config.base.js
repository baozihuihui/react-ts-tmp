const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'app': './src/index.ts'   // 入口文件
    },
    output: {
        filename: '[name].[chunkhash:8].js' // 编译的文件以名字.hash值结尾
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'    // 启动HTML文件
        })
    ],
    optimization: { // 简单拆包
        splitChunks: {
            chunks: 'all'
        }
    }
}