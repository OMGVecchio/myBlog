'use strict'

const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = async (ctx, next) => {
  const { headers } = ctx
  const { user, jwtSecret } = config
  const token = headers['vecchio-token']
  if (token) {
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
  } else {
    ctx.user = null
  }
  await next()
}
