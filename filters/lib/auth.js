'use strict'

/**
 * 获取权限认证
 */

const jwt = require('jsonwebtoken')
const { out } = require('../../utils')
const config = require('../../config')
const { error } = out

module.exports = async (ctx, next) => {
  const { headers } = ctx
  const { user, jwtSecret } = config
  const token = headers['access-token']
  if (token) {
    try {
      const decode = jwt.verify(token, jwtSecret)
      const { username, password, exp } = decode
      // 账户密码匹配
      if (user[username] && user[username] === password) {
        // 登录过期
        if (exp <= Date.now()) {
          ctx.user = null
          ctx.isExpire = true
        } else {
          ctx.user = {
            username,
            password
          }
          ctx.isLogin = true
        }
      } else {
        ctx.user = null
      }
    } catch (err) {
      ctx.user = null
      error('jwt 解析失败')
    }
  } else {
    ctx.user = null
  }
  await next()
}
