'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'"http://120.79.46.38:8761/webservice"'
  // API_HOST:'"http://9ktn9m.natappfree.cc/PAY-CLIENT"'
})
