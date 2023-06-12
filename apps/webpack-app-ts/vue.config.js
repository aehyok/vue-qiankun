const { name } = require('./package')

module.exports = {
  publicPath: './',
  lintOnSave: false,
  outputDir: '../../../release/qiankun/child/webpack-app',
  devServer: {
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/so': {
        target: 'http://101.35.211.235:3001', // 代理接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/so': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(() => ({ name: '/fonts/[name].[hash:8].[ext]' }))
      .end()
  },
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
