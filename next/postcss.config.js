'use strict'

const easyImport = require('postcss-easy-import')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    easyImport({ prefix: '_' }),
    autoprefixer({})
  ]
}
