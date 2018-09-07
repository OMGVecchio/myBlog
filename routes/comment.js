'use strict'

const uuid = require('uuid')
const { db } = require('../utils')

const { commentDB } = db

// 新增评论
Router.post('/api/comment/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  const {
    reviewId,
    comment,
    username = '',
    userblog = ''
  } = ctx.request.body
  if (!articleId) {
    return ctx.apiError('缺少评论的文章ID')
  }
  if (!comment) {
    return ctx.apiError('缺少评论的内容')
  }
  // 这里就暂时不检查文章是否存在了吧
  // 直接用 JSON，有时候数据结构确实不好把控
  const commentMap = await commentDB.get(articleId).value()
  const commentId = uuid.v1()
  if (!commentMap) {
    const firstLevel = [{
      id: commentId,
      comment,
      username,
      userblog,
      isFirst: true,
      createTime: Date.now(),
      sub: []
    }]
    await commentDB.set(articleId, firstLevel).write()
    ctx.apiSuccess('评论成功')
  } else {
    if (reviewId) {
      const secondLevel = {
        id: commentId,
        comment,
        username,
        userblog,
        isFirst: false,
        createTime: Date.now()
      }
      await commentDB.get(articleId).find({id: reviewId}).get('sub').push(secondLevel).write()
      ctx.apiSuccess('评论成功')
    } else {
      const firstLevel = {
        id: commentId,
        comment,
        username,
        userblog,
        isFirst: true,
        createTime: Date.now(),
        sub: []
      }
      await commentDB.get(articleId).push(firstLevel).write()
      ctx.apiSuccess('评论成功')
    }
  }
})

// 获取评论
Router.get('/api/comment/:articleId', async (ctx) => {
  const { articleId = '' } = ctx.params
  if (!articleId) {
    return ctx.apiError('缺少评论的文章ID')
  }
  const commentList = await commentDB.get(articleId).value()
  ctx.apiSuccess(commentList || [])
})
