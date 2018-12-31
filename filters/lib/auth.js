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
  const { jwtSecret } = config
  const token = headers['access-token']
  if (token) {
    try {
      const decode = jwt.verify(token, jwtSecret)
      const { username, isAdmin, exp } = decode
      // 登录过期
      if (exp <= Date.now()) {
        ctx.user = null
        ctx.isExpire = true
      } else {
        ctx.user = {
          username,
          isAdmin
        }
        ctx.isAdmin = isAdmin
        ctx.isLogin = true
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
