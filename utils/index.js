'use strict'

// 根据文件名自动遍历
const mapKey = [
  'traverse',
  'dbs',
  'db',
  'crypto',
  'out',
  'qiniu',
  'validator'
]
const utils = {}
const load = require

mapKey.forEach((key) => {
  let name
  let path
  if (typeof key === 'string') {
    name = key
    path = key
  } else if (key instanceof Array){
    name = key[0]
    path = key[1]
  }
  const method = load(`./lib/${path}`)
  utils[name] = method
})

module.exports = utils
