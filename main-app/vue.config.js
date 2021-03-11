const path = require('path');

module.exports = {
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
