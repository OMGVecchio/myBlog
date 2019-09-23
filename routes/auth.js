'use strict'

const jwt = require('jsonwebtoken')
const fetch = require('isomorphic-fetch')
const { stringify, parse } = require('querystring')
const { v1 } = require('uuid')

const config = require('../config')
const { out, crypto } = require('../utils')
const { error } = out
const {
  loginUrl,
  tokenUrl,
  userDataApiUrl,
  clientId,
  clientSecret,
  scope
} = require('../config/github')

// 用户名密码登录
$router.post('/api/login', async (ctx) => {
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
  } catch (e) {
    error('登录时滑动验证码检测有误')
    ctx.apiError('登录失败')
  }
  if (user[username] && user[username].password === crypto.md5(password)) {
    const token = await new Promise((resolve, reject) => {
      jwt.sign({
        exp: Date.now() + 1000 * 60 * 60 * 24,
        username,
        isAdmin: true
      }, config.jwtSecret, (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
    ctx.redis.del(challenge)
    ctx.apiSuccess(token)
  } else {
    ctx.apiError('账户名或密码错误')
  }
})

// Github 登录页
$router.get('/api/login/github', async (ctx) => {
  const param = {
    client_id: clientId,
    scope,
    state: v1()
  }
  const queryStr = stringify(param)
  ctx.redirect(`${loginUrl}?${queryStr}`)
})

// Github 登录回调
$router.get('/api/login/github/callback', async (ctx) => {
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
      throw new Error('Github Token 授权令牌获取有误')
    }
    const userData = await fetch(`${userDataApiUrl}${resJson['access_token']}`).then(res => res.json())
    if (!userData) {
      throw new Error('Github 获取用户数据失败')
    }
    try {
      const { id } = userData
      const token = await new Promise((resolve, reject) => {
        jwt.sign({
          exp: Date.now() + 1000 * 60 * 60 * 24,
          username: id,
          isAdmin: false
        }, config.jwtSecret, (err, token) => {
          if (err) {
            reject(err)
          } else {
            resolve(token)
          }
        })
      })
      ctx.redirect(`/login?token=${token}`)
    } catch (e) {
      throw new Error('Github 登录回调成功，创建 Token 失败')
    }
  } catch (e) {
    error('Github Token 授权过程失败', e)
    ctx.redirect('/login')
  }
})

$router.post('/api/token/check', async (ctx) => {
  const { token = '' } = ctx.request.body
  try {
    jwt.verify(token, config.jwtSecret)
    ctx.apiSuccess('合法 Token')
  } catch (e) {
    error('Token 检测有误，非法数据')
    ctx.apiError('非法 Token，请重新登录')
  }
})
