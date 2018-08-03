'use strict'

const { dbs } = require('../utils')
const db = dbs('article.db')
const uuid = require('uuid')

const TABLE = 'article'

Router.post('/api/article', async (ctx) => {
  const articleId = uuid.v1()
  const { body } = ctx.request
  const timestamp = Date.now()
  const {
    title,
    desc = '看怎么实现简介吧',
    article,
    category,
    tags
  } = body
  try {
    await db.defaults({[TABLE]: []}).get(TABLE).push({
      id: articleId,
      title,
      desc,
      category,
      tags,
      createTime: timestamp,
      lastModify: timestamp
    }).write()
    await db.set(articleId, article).write()
  } catch (err) {
    console.error(err)
  }
  ctx.apiSuccess('文章创建成功')
})

Router.get('/api/article', async (ctx) => {
  try {
    const articles = await db.get(TABLE).value()
    ctx.apiSuccess(articles)
  } catch (err) {
    console.error(err)
  }
})

Router.get('/api/article/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  try {
    const articleObj = await db.get(TABLE).find({id: articleId}).value()
    const article = await db.get(articleId).value()
    articleObj.article = article
    ctx.apiSuccess(articleObj)
  } catch (err) {
    console.error(err)
  }
})
