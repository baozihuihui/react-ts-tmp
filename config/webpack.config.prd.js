/** @format */

const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const { loader } = require('./util')

module.exports = {
	mode: 'production',
	entry: './src/pages/page1/index.tsx',
	devtool: 'cheap-module-eval-source-map',
	// 输出文件位置
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'js/[name].[chunkhash:6].js',
		chunkFilename: 'js/[name].[chunkhash:6].js',
	},
	// 执行配置项
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // set to true if you want JS source maps
			}),
		],
	},
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
	// 插件
	plugins: [
		new HtmlWebPackPlugin({
			template: 'public/index.html',
			filename: 'index.html',
			inject: true,
			favicon: 'public/favicon.ico',
		}),
		new CleanWebpackPlugin(), // 生产环境我们只先添加build清除文件，用来清除每次build产生的hash文件，避免因为无用文件导致打包过大
		new BundleAnalyzerPlugin(), // 添加打包大小、依赖分析工具
		// new CopyWebpackPlugin(),
	],
}
