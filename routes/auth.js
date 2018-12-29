'use strict'

const jwt = require('jsonwebtoken')
const fetch = require('isomorphic-fetch')
const { stringify, parse } = require('querystring')
const { v1 } = require('uuid')

const config = require('../config')
const { error } = require('../utils').out
const {
  loginUrl,
  tokenUrl,
  userDataApiUrl,
  clientId,
  clientSecret,
  scope
} = require('../config/github')

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
    error('登录时滑动验证码检测有误')
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

Router.get('/api/login/github', async (ctx) => {
  const param = {
    client_id: clientId,
    scope,
    state: v1()
  }
  const queryStr = stringify(param)
  ctx.redirect(`${loginUrl}?${queryStr}`)
})

Router.get('/api/login/github/callback', async (ctx) => {
  const { code } = ctx.query
  const param = {
    client_id: clientId,
    client_secret: clientSecret,
    code
  }
  try {
    const resStr = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(res => res.text())
    const resJson = parse(resStr)
    if (!resStr) {
      error('Github Token 授权令牌获取有误', e)
      ctx.redirect('/login')
      return
    }
    const userData = await fetch(`${userDataApiUrl}${resJson['access_token']}`).then(res => res.json())
    if (!userData) {
      error('Github 获取用户数据失败', e)
      ctx.redirect('/login')
      return
    }
    ctx.apiSuccess(userData)
  } catch (e) {
    error('Github Token 授权失败', e)
    ctx.redirect('/login')
  }
})
