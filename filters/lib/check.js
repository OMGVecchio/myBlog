'use strict'

/**
 * 路由权限检测
 */

// 需要权限认证的接口的路由匹配规则
const pattern = /^\/api\/auth\//gi

module.exports = async (ctx, next) => {
  const { url } = ctx
  if (pattern.test(url) && ctx.isLogin !== true) {
    let msg = '亲，请先登录哦~'
    if (ctx.isExpire) {
      msg = '亲，登录已过期，请重新登录'
    }
    return ctx.apiError(msg, 403)
  } else {
    await next()
  }
}
