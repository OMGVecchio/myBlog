'use strict'

const { sha1 } = require('./crypto')

module.exports = {
  checkUserInfo(rawData, session_key, signature) {
    const signature2 = sha1(rawData + session_key)
    if (signature === signature2) {
      return true
    }
    return false
  }
}
