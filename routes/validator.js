'use strict'

const { v1 } = require('uuid')

const { validator, out } = require('../utils')

const ACCURACY = 3

Router.get('/api/validator/info', async (ctx) => {
  const challenge = v1()
  const offsetX = validator.randomOffsetX()
  const offsetY = validator.randomOffsetY()
  const challengeInfo = { offsetX, offsetY }
  await ctx.redis.set(challenge, JSON.stringify(challengeInfo), 'EX', 60)
  const validatorInfo = {
    challenge,
    offsetY,
    fullBackground: '/api/validator/fullBackground',
    slice: '/api/validator/slice'
  }
  ctx.apiSuccess(validatorInfo)
})

Router.post('/api/validator/token', async (ctx) => {
  const { body } = ctx.request
  const { offset, challenge } = body
  try {
    const challengeInfo = await ctx.redis.get(challenge)
    const { offsetX } = JSON.parse(challengeInfo)
    if (offsetX - offset < Math.abs(ACCURACY)) {
      const token = v1()
      await ctx.redis.set(challenge, token, 'EX', 60)
      ctx.apiSuccess(token)
    } else {
      ctx.apiError('验证失败')
    }
  } catch (e) {
    out.error('验证码缓存获取失败')
    ctx.apiError('验证失败')
  }
})

Router.get('/api/validator/fullBackground', async (ctx) => {
  try {
    const { challenge } = ctx.query
    const challengeInfo = await ctx.redis.get(challenge)
    const { offsetX, offsetY } = JSON.parse(challengeInfo)
    const fbg = await validator.fullBackground(offsetX, offsetY)
    if (fbg) {
      ctx.staticImg(fbg, fbg.options ? fbg.options.formatOut : '')
    } else {
      ctx.apiError('获取图片失败')
    }
  } catch (e) {
    out.error('验证码缓存获取失败')
    ctx.apiError('图片获取失败')
  }
})

Router.get('/api/validator/slice', async (ctx) => {
  try {
    const { challenge } = ctx.query
    const challengeInfo = await ctx.redis.get(challenge)
    const { offsetX, offsetY } = JSON.parse(challengeInfo)
    const slice = await validator.slicePicture(offsetX, offsetY)
    if (slice) {
      ctx.staticImg(slice, slice.options ? slice.options.formatOut : '')
    } else {
      ctx.apiError('获取图片失败')
    }
  } catch (e) {
    out.error('验证码缓存获取失败')
    ctx.apiError('图片获取失败')
  }
})
