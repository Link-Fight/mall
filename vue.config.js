module.exports = {
  baseUrl: process.env.NODE_ENV === 'git'
    ? '/mall/dist/'
    : '/',
  configureWebpack: {
  },
  devServer: {
    proxy: 'http://localhost:97'
  }
}
