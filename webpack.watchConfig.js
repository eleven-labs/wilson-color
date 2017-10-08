const baseConfig = require('./webpack.config')
const buildConfig = Object.assign({}, baseConfig, {
  watch: true,
  devtools: 'source-map'
})

module.exports = buildConfig
