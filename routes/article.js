'use strict'

const { db } = require('../utils')
const { alDB, acDB, tagDB } = db
const uuid = require('uuid')

const ALDBKEY = 'list'
const TAGDBKEY = 'map'

Router.post('/api/article', async (ctx) => {
  const articleId = uuid.v1()
  const { body } = ctx.request
  const timestamp = Date.now()
  const {
    title,
    cover,
    desc,
    article,
    category,
    tags
  } = body
  try {
    await alDB.defaults({[ALDBKEY]: []}).get(ALDBKEY).push({
      id: articleId,
      title,
      cover,
      desc,
      category,
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

Router.get('/api/article', async (ctx) => {
  try {
    const articles = await alDB.get(ALDBKEY).orderBy('lastModify', 'desc').value()
    ctx.apiSuccess(articles)
  } catch (err) {
    console.error(err)
  }
})

Router.get('/api/article/:articleId', async (ctx) => {
  // 获取文章详情的接口在前端会做个缓存，所以其实在这里记录文章的访问量也没什么吧
  const { articleId = '' } = ctx.params
  try {
    const articleObj = await alDB.get(ALDBKEY).find({id: articleId}).value()
    const article = await acDB.get(articleId).value()
    articleObj.article = article
    // await alDB.get(ALDBKEY).find({id: articleId}).set('',)
    ctx.apiSuccess(articleObj)
  } catch (err) {
    console.error(err)
  }
})
