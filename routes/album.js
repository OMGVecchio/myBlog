'use strict'

const { db } = require('../utils')
const uuid = require('uuid')
const { albumCategoryListDB } = db

const albumListTag = 'list'

$router.post('/api/auth/album/category/create', async (ctx) => {
  const albumId = uuid.v1()
  const { body } = ctx.request
  const timestamp = Date.now()
  const { title, desc } = body
  try {
    await albumCategoryListDB.defaults({[albumListTag]: []}).get(albumListTag).push({
      id: albumId,
      title,
      desc,
      createTime: timestamp,
      lastModify: timestamp
    }).write()
    ctx.apiSuccess('相册新建成功')
  } catch (err) {
    console.error('相册新建失败', err)
  }
})

$router.get('/api/album/category/query', async (ctx) => {
  try {
    const albumCategoryList = await albumCategoryListDB.defaults({[albumListTag]: []}).get(albumListTag).value()
    ctx.apiSuccess(albumCategoryList)
  } catch (err) {
    console.error('相册种类获取失败', err)
  }
})
