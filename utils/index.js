'use strict'

const mapKey = [
  'traverse'
]
const utils = {}
const load = require

mapKey.forEach((key) => {
  const method = load(`./lib/${key}`)
  utils[key] = method
})

module.exports = utils
