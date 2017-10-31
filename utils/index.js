'use strict'

const mapKey = [
    'traverse'
]
let utils = {}

mapKey.map(key => {
    utils[key] = require(`./lib/${key}`)
})

module.exports = utils
