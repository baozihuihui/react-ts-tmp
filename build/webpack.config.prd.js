const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = {
  mode: "production",
  entry:'./src/index.tsx',
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].[chunkhash:6].js",
    chunkFilename: "js/[name].[chunkhash:6].js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: true,
    }),
    new CleanWebpackPlugin(), // 生产环境我们只先添加build清除文件，用来清除每次build产生的hash文件，避免因为无用文件导致打包过大
    new BundleAnalyzerPlugin(), // 添加打包大小、依赖分析工具
  ],
};
