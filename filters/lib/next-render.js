'use strict'

module.exports = async (ctx, next) => {
  const { path } = ctx
  const apiReg = /^\/api\//
  if (apiReg.test(path)) {
    next()
  } else {
    await nextHandle(ctx.req, ctx.res, path, ctx.query)
    ctx.respond = false
  }
}
