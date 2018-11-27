'use strict'

// 优化路由展现形式的服务端支持，所有需要额外访问路由的链接都需要在此处进行配置
// 尤其考虑跟 nuxt 做成一样的，统一管理？

Router.get('/article/:articleId', async (ctx) => {
  const parsedUrl = {
    pathname: '/article',
    query: {
      articleId: ctx.params.articleId
    }
  }
  await nextHandle(ctx.req, ctx.res, parsedUrl)
})

Router.get('/compose/:articleId', async (ctx) => {
  const parsedUrl = {
    pathname: '/compose',
    query: {
      articleId: ctx.params.articleId
    }
  }
  await nextHandle(ctx.req, ctx.res, parsedUrl)
})
