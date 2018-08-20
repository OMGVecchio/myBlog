'use strict'

const util = require('util')
const fs = require('fs')
const { resolve } = require('path')
const multer = require('koa-multer')

const uploader = multer()
const writeFile = util.promisify(fs.writeFile)
const imagesPath = resolve(__dirname, '../static/images/')

Router.post('/api/images/upload', uploader.single('file'), async (ctx) => {
  const { file } = ctx.req
  const { buffer, originalname } = file
  // 先不纠结正则的存在的问题了
  const filename = originalname.replace(/\./ig, `_${Date.now()}.`)
  const filepath = resolve(imagesPath, filename)
  try {
    await writeFile(filepath, buffer)
  } catch (err) {
    console.error('图片写入失败', err)
  }
  ctx.apiSuccess(filename)
})
