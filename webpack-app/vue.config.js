const { name } = require("./package");
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  outputDir: "../../qiankun/main/child/webpack-app",
  devServer: {
    port: 4000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      '/so': {
        target: 'http://139.186.205.7:5000', // 代理接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/so': '',
        },
      },
    },
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
