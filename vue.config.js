module.exports = {
  baseUrl: process.env.NODE_ENV === 'git'
    ? '/dist/'
    : '/',
  configureWebpack: {
  }
}
