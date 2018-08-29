'use strict'

/**
 * code:
 *  200:成功 201:登录成功
 *  401:授权失败 403:禁止访问
 *  500:失败
 */
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
