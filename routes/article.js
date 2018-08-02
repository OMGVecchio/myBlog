'use strict'

const { dbs } = require('../utils')
const db = dbs('article.db')
const uuid = require('uuid')

const TABLE = 'article'
db.defaults({[TABLE]: []})

Router.post('/api/article', async (ctx) => {
  const articleId = uuid.v1()
  const { body } = ctx.request
  const {
    title,
    article,
    category,
    tags
  } = body
  await db.get(TABLE).push({
    id: articleId,
    title,
    article,
    category,
    tags
  }).write()
  ctx.apiSuccess('文章创建成功')
})

Router.get('/api/article', async (ctx) => {
  const articles = await db.get(TABLE).find({}).value()
  ctx.apiSuccess(articles)
})
