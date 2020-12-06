/** @format 代码格式化 配置在这里*/

module.exports = {
	printWidth: 100, // 多长的文本换行，html与js超过字符长度，都会换行
	tabWidth: 4, // 制表符空格数 4
	useTabs: true, //使用 Tab进行缩紧
	semi: false, // 是否跟分号
	singleQuote: true, // 是否为单引号
	jsxSingleQuote: true, // jsx 中是否为单引号
	trailingComma: 'all', // 结尾是否尾随逗号
	bracketSpacing: true, // 大括号有空格 { foo : bar }
	jsxBracketSameLine: true, // jsx换行
	htmlWhitespaceSensitivity: 'ignore', // 是否对空格敏感
	arrowParens: 'avoid', // 尽可能 为箭头函数省去 x => x
	proseWrap: 'always', // 是否换行
	endOfLine: 'lf', // 结尾行
}
