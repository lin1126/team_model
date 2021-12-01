module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '智慧教室管控系统'
        return args
      })
  }
}
