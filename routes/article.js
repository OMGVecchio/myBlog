'use strict'

const { dbs } = require('../utils')
const articleList = dbs('article-list.json')
const articleContent = dbs('article-content.json')
const tagList = dbs('tags.json')
const uuid = require('uuid')

const LIST = 'list'

Router.post('/api/article', async (ctx) => {
  const articleId = uuid.v1()
  const { body } = ctx.request
  const timestamp = Date.now()
  const {
    title,
    desc,
    article,
    category,
    tags
  } = body
  try {
    await articleList.defaults({[LIST]: []}).get(LIST).push({
      id: articleId,
      title,
      desc,
      category,
      tags,
      createTime: timestamp,
      lastModify: timestamp
    }).write()
    await articleContent.set(articleId, article).write()
  } catch (err) {
    console.error(err)
  }
  // try {
  //   const tagsList = await tagDB.get(LIST).value()
  // } catch (err) {
  //   console.error(err)
  // }
  ctx.apiSuccess('文章创建成功')
})

Router.get('/api/article', async (ctx) => {
  try {
    const articles = await articleList.get(LIST).value()
    ctx.apiSuccess(articles)
  } catch (err) {
    console.error(err)
  }
})

Router.get('/api/article/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  try {
    const articleObj = await articleList.get(LIST).find({id: articleId}).value()
    const article = await articleContent.get(articleId).value()
    articleObj.article = article
    ctx.apiSuccess(articleObj)
  } catch (err) {
    console.error(err)
  }
})
