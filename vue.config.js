console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
  publicPath: process.env.NODE_ENV === 'git'
    ? '/mall/dist/'
    : '',
  // outputDir: process.env.NODE_ENV === 'git'
  //   ? 'doc'
  //   : 'dist',
  outputDir: 'doc',
  configureWebpack: {
  },
  outputDir: process.env.NODE_ENV === 'production' ? 'D:/job/mall2' : 'dist',
  devServer: {
    proxy: 'http://xct.xair.cn/'
  }
}
