'use strict'

const { db } = require('../utils')
const { alDB, acDB, tagDB } = db
const uuid = require('uuid')

const ALDBKEY = 'list'
const TAGDBKEY = 'map'

// 新增文章
Router.post('/api/article', async (ctx) => {
  const articleId = uuid.v1()
  const { body } = ctx.request
  const timestamp = Date.now()
  const {
    title,
    cover,
    desc,
    article,
    tags
  } = body
  try {
    await alDB.defaults({[ALDBKEY]: []}).get(ALDBKEY).push({
      id: articleId,
      title,
      cover,
      desc,
      tags,
      createTime: timestamp,
      lastModify: timestamp
    }).write()
    await acDB.set(articleId, article).write()
  } catch (err) {
    console.error('新建文章失败', err)
  }
  try {
    let tagStore = tagDB.get(TAGDBKEY)
    tags.forEach(tag => {
      if (!tagStore[tag]) {
        tagStore = tagStore.set(tag, true)
      }
    })
    await tagStore.write()
  } catch (err) {
    console.error('Tag操作失败', err)
  }
  ctx.apiSuccess('文章创建成功')
})

// 修改文章
Router.post('/api/article/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  const { body } = ctx.request
  const timestamp = Date.now()
  const {
    title,
    cover,
    desc,
    article,
    tags
  } = body
  try {
    await alDB.get(ALDBKEY).find({id: articleId})
              .set('title', title)
              .set('cover', cover)
              .set('desc', desc)
              .set('tags', tags)
              .set('lastModify', timestamp)
              .write()
    await acDB.set(articleId, article).write()
    ctx.apiSuccess('修改成功')
  } catch (err) {
    console.error(err)
    ctx.apiError('修改失败')
  }
})

// 获取文章列表
Router.get('/api/article', async (ctx) => {
  try {
    const articles = await alDB.get(ALDBKEY).orderBy('lastModify', 'desc').value()
    ctx.apiSuccess(articles)
  } catch (err) {
    console.error(err)
  }
})

// 获取文章详情
Router.get('/api/article/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  try {
    const articleObj = await alDB.get(ALDBKEY).find({id: articleId}).value()
    const article = await acDB.get(articleId).value()
    articleObj.article = article
    ctx.apiSuccess(articleObj)
  } catch (err) {
    console.error(err)
  }
})

// 删除文章
Router.delete('/api/article/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  try {
    await alDB.get(ALDBKEY).remove({id: articleId}).write()
    await acDB.unset(articleId).write()
    ctx.apiSuccess('删除成功')
  } catch (err) {
    console.error(err)
    ctx.apiSuccess('删除失败')
  }
})
