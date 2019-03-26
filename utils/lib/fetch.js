'use strict'

const fetch = require('isomorphic-fetch')
const { warn, error } = require('./out')

module.exports = {
  async fetch(...args) {
    try {
      const rawRes = await fetch(...args)
      if (rawRes.ok) {
        return rawRes.json()
      } else {
        warn('fetch 请求失败', rawRes.statusText)
        return null
      }
    } catch (e) {
      error('fetch 请求错误', e)
      return null
    }
  }
}
