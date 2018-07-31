'use strict'

// 根据文件名自动遍历
const mapKey = [
  'traverse',
  'dbs'
]
const utils = {}
const load = require

mapKey.forEach((key) => {
  const method = load(`./lib/${key}`)
  utils[key] = method
})

module.exports = utils
