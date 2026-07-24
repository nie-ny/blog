// webpack.dev.config.js 启动配置
const path = require("path");

module.exports = {
  // 模式 开始模式 会自动预设安装插件 模式不同安装插件不同
  // 可以使用 node 自带的 process.env.NODE_ENV 来获取所在的环境
  mode: 'development',// production 生产模式  development 开发模式

  /* 入口 打包开始的文件*/
  entry:  path.join(__dirname, "src/index.js"),

  /* 输出到dist目录，输出文件名字为dist.js */
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'dist.js',
  },

  /* cacheDirectory是用来缓存编译结果，下次编译加速 */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.join(__dirname, "src"),
      },
    ]
  },

  // webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, // gzip压缩
    host: "0.0.0.0", // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    port: 8111, // 端口
  },
};