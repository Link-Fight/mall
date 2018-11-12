console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
  // outputDir: process.env.NODE_ENV === 'git'
  //   ? 'doc'
  //   : 'dist',
  outputDir: 'doc',
  configureWebpack: {
  },
  devServer: {
    proxy: 'http://localhost:97'
  }
}
