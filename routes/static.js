'use strict'

const util = require('util')
const fs = require('fs')
const { resolve } = require('path')
const multer = require('koa-multer')

const { qiniu } = require('../utils')

const uploader = multer()
const writeFile = util.promisify(fs.writeFile)
const imagesPath = resolve(__dirname, '../static/images/')

const saveImage = async (ctx, imgTag, useQiniu = true) => {
  const { file } = ctx.req
  const { buffer, originalname } = file
  const filename = originalname.replace(/\./ig, `_${Date.now()}.`)
  let imgUrl
  if (useQiniu) {
    imgUrl = await qiniu.upload(ctx, filename, buffer)
  } else {
    const filepath = resolve(imagesPath, imgTag, filename)
    try {
      imgUrl = `/images/${imgTag}/${filename}`
      await writeFile(filepath, buffer)
    } catch (err) {
      console.error('图片写入失败', err)
    }
  }
  ctx.apiSuccess(imgUrl)
}

Router.post('/api/auth/upload/illustrati', uploader.single('file'), async (ctx) => {
  await saveImage(ctx, 'illustrati')
})

Router.post('/api/auth/upload/cover', uploader.single('cover'), async (ctx) => {
  await saveImage(ctx, 'cover')
})
