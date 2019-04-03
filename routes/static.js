'use strict'

const util = require('util')
const fs = require('fs')
const { resolve, join } = require('path')
const multer = require('koa-multer')
const sharp = require('sharp')

const { qiniu, out } = require('../utils')

const uploader = multer()
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const imagesPath = resolve(__dirname, '../static/images/')
const staticPath = resolve(__dirname, '../static/')
const { error } = out

const saveImage = async (ctx, imgTag, useQiniu = false) => {
  const { file } = ctx.req
  const { buffer, originalname } = file
  const filename = originalname.replace(/\./ig, `_${Date.now()}.`)
  let imgUrl
  if (useQiniu) {
    imgUrl = await qiniu.upload(ctx, filename, buffer)
  } else {
    const filepath = join(imagesPath, imgTag, filename)
    try {
      imgUrl = `/images/${imgTag}/${filename}`
      await writeFile(filepath, buffer)
    } catch (err) {
      error('图片写入失败', err)
    }
  }
  ctx.apiSuccess(imgUrl)
}

$router.post('/api/auth/upload/illustrati', uploader.single('file'), async ctx => {
  await saveImage(ctx, 'illustrati')
})

$router.post('/api/auth/upload/cover', uploader.single('cover'), async ctx => {
  await saveImage(ctx, 'cover')
})

$router.get('/api/pict-tool', async ctx => {
  const { pictPath, quality } = ctx.query
  const filePath = join(staticPath, decodeURIComponent(pictPath))
  try {
    const buffer = await readFile(filePath)
    const newBuffer = await sharp(buffer).jpeg({ quality: parseInt(quality, 10) }).toBuffer()
    ctx.staticImg(newBuffer)
  } catch (err) {
    error('图片读取失败', err)
  }
})
