const webpack = require('webpack')
const packageName = require('./package.json').name

module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: '../../../release/qiankun/child/map-app',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end()
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end()
  },
  // 打包方式设置为umd
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    },
    plugins: [
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('')
      })
    ]
  },

  devServer: {
    port: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/infra': {
        target: 'http://101.35.211.235:3001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/infra': ''
        }
      }
    }
  }
}
