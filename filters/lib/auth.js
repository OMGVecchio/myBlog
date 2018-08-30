'use strict'

const jwt = require('jsonwebtoken')
const { out } = require('../../utils')
const config = require('../../config')
const { error } = out

module.exports = async (ctx, next) => {
  const { headers } = ctx
  const { user, jwtSecret } = config
  const token = headers['vecchio-token']
  if (token) {
    try {
      const decode = jwt.verify(token, jwtSecret)
      const { username, password, exp } = decode
      if (user[username] && user[username] === password) {
        if (exp <= Date.now()) {
          ctx.user = null
          ctx.isExpire = true
          // return ctx.apiError('验证失效，请重新登录', 401)
        } else {
          ctx.user = {
            username,
            password
          }
        }
      } else {
        ctx.user = null
      }
    } catch (err) {
      ctx.user = null
      error('jwt 解析失败', err)
    }
  } else {
    ctx.user = null
  }
  await next()
}
