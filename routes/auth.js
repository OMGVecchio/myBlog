'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const { out } = require('../utils')

Router.post('/api/login', async (ctx) => {
  const {
    username,
    password,
    challenge,
    token
  } = ctx.request.body
  const { user } = config
  try {
    const realToken = await ctx.redis.get(challenge)
    if (token !== realToken) {
      return ctx.apiError('滑动验证码错误')
    }
    await ctx.redis.del(challenge)
  } catch (e) {
    out.error('登录时滑动验证码检测有误')
    ctx.apiError('登录失败')
  }
  if (user[username] && user[username] === password) {
    const token = await new Promise((resolve, reject) => {
      jwt.sign({
        exp: Date.now() + 1000 * 60 * 60 * 24,
        username,
        password
      }, config.jwtSecret, (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
    ctx.apiSuccess(token, 201)
  } else {
    ctx.apiError('账户名或密码错误')
  }
})
