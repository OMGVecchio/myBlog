'use strict'

const { v1 } = require('uuid')

const { validator, out } = require('../utils')
const { accuracy } = require('../config/validator')

// 获取行为验证码初始参数
$router.get('/api/validator/info', async (ctx) => {
  const challenge = v1()
  const picture = validator.randomPicture()
  const offsetX = validator.randomOffsetX()
  const offsetY = validator.randomOffsetY()
  const challengeInfo = { picture, offsetX, offsetY }
  await ctx.redis.set(challenge, JSON.stringify(challengeInfo), 'EX', 60)
  const validatorInfo = {
    challenge,
    offsetY,
    fullBackground: `/api/validator/fullBackground/${challenge}`,
    slice: `/api/validator/slice/${challenge}`
  }
  ctx.apiSuccess(validatorInfo)
})

// 获取行为验证码 token
$router.post('/api/validator/token', async (ctx) => {
  const { body } = ctx.request
  const { offset, challenge } = body
  try {
    const challengeInfo = await ctx.redis.get(challenge)
    const { offsetX } = JSON.parse(challengeInfo)
    if (Math.abs(offsetX - offset) < accuracy) {
      const token = v1()
      await ctx.redis.set(challenge, token, 'EX', 60)
      ctx.apiSuccess(token)
    } else {
      ctx.apiError('请将图片移动至正确的缺块上')
    }
  } catch (e) {
    out.error('验证码缓存获取失败')
    ctx.apiError('验证失败')
  }
})

// 获取行为验证码背景图
$router.get('/api/validator/fullBackground/:challenge', async (ctx) => {
  try {
    const { challenge } = ctx.params
    const challengeInfo = await ctx.redis.get(challenge)
    const { picture, offsetX, offsetY } = JSON.parse(challengeInfo)
    const fbg = await validator.fullBackground(picture, offsetX, offsetY)
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

// 获取行为验证码滑动图
$router.get('/api/validator/slice/:challenge', async (ctx) => {
  try {
    const { challenge } = ctx.params
    const challengeInfo = await ctx.redis.get(challenge)
    const { picture, offsetX, offsetY } = JSON.parse(challengeInfo)
    const slice = await validator.slicePicture(picture, offsetX, offsetY)
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
