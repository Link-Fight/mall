module.exports = {
  publicPath: process.env.NODE_ENV === 'git'
    ? '/mall/dist/'
    : '',
  configureWebpack: {
  },
  outputDir: process.env.NODE_ENV === 'production' ? 'D:/job/mall2' : 'dist',
  devServer: {
    proxy: 'http://xct.xair.cn/'
  }
}
