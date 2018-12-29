'use strict'

const { out } = require('../../utils')

/**
 * ctx api 处理操作的绑定
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

  ctx.apiError = (data = '接口异常', code = 200) => {
    const res = {
      success: false,
      code,
      data
    }
    ctx.body = res
  }

  ctx.apiJsonp = (data = {}, callbackName = 'callback') => {
    let resData
    try {
      resData = JSON.stringify(data)
    } catch (e) {
      out.error('Jsonp 格式处理错误', e)
      resData = '数据获取失败'
    }
    ctx.type = 'text/javascript; charset=UTF-8'
    ctx.body = `${callbackName}(${resData})`
  }

  ctx.staticImg = (data, suffix = 'jpeg') => {
    ctx.type = `image/${suffix}`
    ctx.body = data
  }

  await next()
}
