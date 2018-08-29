'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

Router.get('/api/login', async (ctx) => {
  const { username, password } = ctx.query
  const { user } = config
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
