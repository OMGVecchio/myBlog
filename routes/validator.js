'use strict'

const { validator } = require('../utils')

Router.get('/api/validator/info', async (ctx) => {
  const validatorInfo = {
    fullBackground: '/api/validator/fullBackground',
    slice: '/api/validator/slice'
  }
  ctx.apiSuccess(validatorInfo)
})

Router.get('/api/validator/fullBackground', async (ctx) => {
  const fbg = await validator.fullBackground()
  if (fbg) {
    ctx.staticImg(fbg, fbg.options ? fbg.options.formatOut : '')
  } else {
    ctx.apiError('获取图片失败')
  }
})

Router.get('/api/validator/slice', async (ctx) => {
  const slice = await validator.slicePicture()
  if (slice) {
    ctx.staticImg(slice, slice.options ? slice.options.formatOut : '')
  } else {
    ctx.apiError('获取图片失败')
  }
})
