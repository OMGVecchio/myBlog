'use strict'

const { resolve } = require('path')
const statics = require('koa-static')

const root = resolve(__dirname, '../../static')
const opt = {
  maxage: 60 * 60 * 24 * 3 * 1000,
  extensions: false
}

module.exports = statics(root, opt)
