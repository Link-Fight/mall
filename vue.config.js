module.exports = {
  baseUrl: process.env.NODE_ENV === 'git'
    ? '/mall/dist/'
    : '',
  configureWebpack: {
  },
  outputDir: process.env.NODE_ENV === 'production' ? 'C:/xampp/htdocs/agri_bpmn_v3/trunk/public/mall2' : 'dist',
  devServer: {
    proxy: 'http://localhost:97'
  }
}
