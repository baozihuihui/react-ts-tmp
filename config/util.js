/** @format */

const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path')

// loader 生效范围
const loaderRegx = {
	imgRegx: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片
	fontsRegx: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 文件
	mediaRegx: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 视频、音频
	jsRegx: /\.js$/, // js 文件
	tsxRegx: /\.tsx?$/, // ts/jsx 文件
	cssRegx: /\.css$/, // css 文件
	lessRegx: /\.less$/, // less 文件
	nodeModulesRegx: /node_modules/, // node_module 包文件
}

// 文件转换
const babelLoader = {
	loader: 'babel-loader',
	options: {
		babelrc: true, // 使用 .babelrc 文件
		cacheDirectory: true,
	},
}

// ts文件转换
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

/**
 *
 * @param {string} name 生成名称时的前缀 默认规则 ${name}/[filename].[hash:7].[ext]
 */
const getUrlLoader = name => ({
	loader: 'url-loader',
	options: {
		limit: 10000,
		name: `${name}/[name].[hash:7].[ext]`,
	},
})

// 将CSS 添加到<style />中
const styleLoader = {
	loader: 'style-loader', // creates style nodes from JS strings
}

/**
 * 获取 css-loader
 * @param {object} options css-loader 参数
 */
const getcssLoader = options => ({
	loader: 'css-loader', // translates CSS into CommonJS
	options,
})

// 为css 添加前缀
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

// 编译时为 less文件生成 .d.ts
const typingsForCssModulesLoader = {
	loader: '@teamsupercell/typings-for-css-modules-loader',
	options: {
		formatter: 'prettier',
		banner:
			'// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
	},
}

// 编译less文件
const lessLoader = {
	loader: 'less-loader',
	options: {
		lessOptions: {
			javascriptEnabled: true,
		},
	},
}

/**
 *
 * @param {string} absolutePath 路径映射对应的绝对地址
 */
const getResloveAlias = absolutePath => {
	return path.join(__dirname, '..', absolutePath)
}

const util = {
	path,
	fileName: __filename,
	dirName: __dirname,
	getResloveAlias,
	loader: {
		loaderRegx,
		babelLoader,
		tsLoader,
		styleLoader,
		getcssLoader,
		getUrlLoader,
		lessLoader,
		postcssLoader,
		typingsForCssModulesLoader,
	},
}

module.exports = util