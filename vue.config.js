console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const proxyTarget = 'http://192.168.14.201:8088'
module.exports = {
  publicPath: process.env.NODE_ENV === 'git' ? '/mall/dist/' : '',
  // outputDir: process.env.NODE_ENV === 'git'
  //   ? 'doc'
  //   : 'dist',
  configureWebpack: {},
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/home': {
        target: proxyTarget,
        changeOrigin: true
      },
      '/wechat': {
        target: proxyTarget,
        changeOrigin: true
      }
    }
  }
}
