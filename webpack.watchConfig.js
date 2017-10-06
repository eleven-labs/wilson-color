const baseConfig = require('./webpack.config')
const buildConfig = Object.assign({}, baseConfig, {watch: true})

module.exports = buildConfig
