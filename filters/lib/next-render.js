'use strict'

/**
 * next、api 渲染、接口操作分离
 */

const apiReg = /^\/api\//
const routeReg = /^\/(article|compose)\//

module.exports = async (ctx, next) => {
  const { path } = ctx
  if (apiReg.test(path)) {
    // api 直接走 koa 路由
    await next()
  } else {
    /**
     * next renderToHtml 接收 (req, res, path, query)
     * handleRequest、run 接收 (req, res, parsedUrl)
     */
    if (routeReg.test(path)) {
      // 需要变动的路由在 routes/pages.js 中单独配置 parsedUrl 后 nextHandl 输出
      await next()
    } else {
      // 其余资源直接走 next 输出
      await nextHandle(ctx.req, ctx.res)
    }
    ctx.respond = false
  }
}
