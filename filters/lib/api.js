'use strict'

module.exports = async (ctx, next) => {
  ctx.apiSuccess = (data = {}, code = 200) => {
    const res = {
      success: true,
      code,
      data
    }
    ctx.body = res
  }
  ctx.apiError = (data = '接口异常', code = 500) => {
    const res = {
      success: false,
      code,
      data
    }
    ctx.body = res
  }
  ctx.apiJsonp = () => {

  }
  await next()
}
