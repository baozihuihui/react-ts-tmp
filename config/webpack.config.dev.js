/** @format */

const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const { loader } = require('./util')

module.exports = {
	// 模式
	mode: 'development',
	// 入口文件 ，若多入口，则数组表示多个入口
	entry: ['./src/pages/page1/index.dev.tsx'],
	output: {
		publicPath: '/', // app.js => /app.js for H5 HistoryAPI staticPath
	},
	// 开发环境我们只添加  忽略列信息的ts源码的sourcemap
	devtool: 'cheap-module-eval-source-map',
	// 本地服务器
	devServer: {
		contentBase: path.join(__dirname, './src/'),
		publicPath: '/',
		host: '127.0.0.1',
		port: 3000,
		hot: true,
		stats: {
			colors: true,
		},
		historyApiFallback: true, // H5 historyAPI
		disableHostCheck: true, // 启动的项目配置host 允许访问
	},
	// 引用的loader
	module: {
		rules: [
			// css less cssModule
			// src css
			{
				test: loader.loaderRegx.cssRegx,
				exclude: loader.loaderRegx.nodeModulesRegx, // exclude antd default style
				use: [
					loader.styleLoader,
					loader.getcssLoader({
						importLoaders: 1,
					}),
				],
				sideEffects: true,
			},
			// src less
			{
				test: loader.loaderRegx.lessRegx,
				exclude: loader.loaderRegx.nodeModulesRegx, // exclude antd default style
				use: [
					loader.styleLoader,
					loader.typingsForCssModulesLoader,
					loader.getcssLoader({
						modules: {
							localIdentName: '[local]_[hash:base64:5]',
						},
						importLoaders: 2,
					}),
					loader.postcssLoader,
					loader.lessLoader,
				],
			},
			//  /node-modules antd 不支持模块化
			{
				test: loader.loaderRegx.lessRegx,
				include: loader.loaderRegx.nodeModulesRegx, // parse antd style , no css modules option
				use: [
					loader.styleLoader,
					loader.getcssLoader({
						importLoaders: 2,
					}),
					loader.postcssLoader,
					loader.lessLoader,
				],
			},
		],
	},
	// 引用的插件
	plugins: [
		new HtmlWebPackPlugin({
			template: 'public/index.html',
			filename: 'index.html',
			inject: true,
			favicon: 'public/favicon.ico',
		}),
		new webpack.HotModuleReplacementPlugin(),
		// 重建编译less会变慢
		// new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
	],
}
