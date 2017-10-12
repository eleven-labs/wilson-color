const baseConfig = require('./webpack.config')
const buildConfig = Object.assign({}, baseConfig, {
  watch: true,
  devtool: 'source-map'
})

module.exports = buildConfig
