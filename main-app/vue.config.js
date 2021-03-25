const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // 打包后console.log消失
  configureWebpack: config => {
    config.optimization.minimizer.push(
      new TerserPlugin({
        extractComments: false,
        terserOptions: { compress: { drop_console: true } },
      })
    )
  },
  devServer: {
    port: 1000,
  },
  // 设置全局css变量使用
  css: {
    loaderOptions: {
      // global scss variables 传递配置选项到 sass-loader
      scss: {
        prependData: `@import "~@/styles/_variable.scss";`,
      },
    },
  },
  transpileDependencies: ['single-spa','qiankun','import-html-entry'],
};
