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
  options: {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryName: "antd",
          // libraryDirectory: 'lib',
          libraryDirectory: "es", // for webpack 4 !!!!!
          style: true,
        }),
      ],
    }),
  },
};

const styleLoader = {
  loader: "style-loader", // creates style nodes from JS strings
};

const cssLoader = {
  loader: "css-loader", // translates CSS into CommonJS
};

const cssModulesLoader = {
  loader: "css-loader",
  options: {
    importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    modules: true,
  },
};

const TypingsLessModulesLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    importLoaders: 2,
    modules: true,
    namedExport: true,
    camelCase: true,
    localIdentName: "[name]__[local]___[hash:base64:5]",
  },
};

const postcssLoader = "postcss-loader";

const util = {
  loaders: {
    babelLoader,
    tsLoader,
    styleLoader,
    cssLoader,
    cssModulesLoader,
    TypingsLessModulesLoader,
    postcssLoader,
  },
};

module.exports = util