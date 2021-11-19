const { name } = require("./package");
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  outputDir: "../../qiankun/main/child/webpack-app",
  devServer: {
    port: 4000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule("fonts")
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => ({ name: "/fonts/[name].[hash:8].[ext]" }))
      .end();
  },
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: "umd", // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
