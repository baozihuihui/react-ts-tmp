/** @format
 * eslint  配置在这里
 */

module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: ['prettier/@typescript-eslint', 'plugin:react/recommended'], //定义文件继承的子规范
    plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
    env: {
        //指定代码的运行环境
        es6: true,
        browser: true,
        node: true,
    },
    settings: {
        //自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    parserOptions: {
        //指定ESLint可以解析JSX语法
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-console': 'warn', // 使用console 抛出警告
        'no-use-before-define': 'off', // 在变量定义之前使用它们 react-script 和 eslint 有版本冲突，需要关闭
        'block-scoped-var': 'error', // 强制把变量的使用限制在其定义的作用域范围内
        'no-shadow': 'error', // 禁止变量声明与外层作用域的变量同名
    },
}
