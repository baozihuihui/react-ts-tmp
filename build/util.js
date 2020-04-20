const tsImportPluginFactory = require('ts-import-plugin')

const babelLoader = {
  loader: "babel-loader",
  options: {
    // babel 转义的配置选项
    babelrc: false,
    presets: [
      // 添加 preset-react
      require.resolve("@babel/preset-react"),
      [require.resolve("@babel/preset-env"), { modules: false }],
    ],
    cacheDirectory: true,
  },
};

const tsLoader = {
  loader: "ts-loader", 
};

const styleLoader = {
  loader: "style-loader", // creates style nodes from JS strings
};

const cssLoader = {
  loader: "css-loader", // translates CSS into CommonJS
};

const lessLoader = {
  loader: 'less-loader',
}

const util = {
  loaders: {
    babelLoader,
    tsLoader,
    styleLoader,
    cssLoader,
    lessLoader,
  },
};

module.exports = util