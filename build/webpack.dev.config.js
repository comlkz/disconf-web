var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  host : '127.0.0.1',
  port :80,
  noInfo: true
}

module.exports = config
