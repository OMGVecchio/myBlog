'use strict'

const crypto = require('crypto')

module.exports = {
  md5(t) {
    return crypto.createHash('md5').update(t).digest('hex')
  },
  sha1(t) {
    return crypto.createHash('sha1').update(t).digest('hex')
  }
}
