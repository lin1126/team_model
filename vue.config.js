const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '智慧教室管控系统'
      return args
    })
  },
  configureWebpack: config => {
    return {
      plugins: [
        new BundleAnalyzerPlugin()
      ],
      // 开启js代码压缩
      optimization: {
        minimize: true
      }
    }
  },
  publicPath: './',
}
