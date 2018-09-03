'use strict'

const crypto = require('crypto')

module.exports = {
  md5(t) {
    return crypto.createHash('md5').update(t).digest('hex')
  }
}
