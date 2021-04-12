const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasureWebpackPlugin();

module.exports = smp.wrap({
  //...
  // 打包后console.log消失
  //其他配置....
  // configureWebpack: {
  //   plugins: [

  //   ]
  // },
  // configureWebpack: config => {
  //   config.optimization.minimizer.push(
  //     new TerserPlugin({
  //       extractComments: false,
  //       terserOptions: { compress: { drop_console: true } },
  //     })
  //   )
  // },
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
});
