'use strict'

const util = require('util')
const fs = require('fs')
const { resolve } = require('path')
const multer = require('koa-multer')

const { qiniu } = require('../utils')

const uploader = multer()
const writeFile = util.promisify(fs.writeFile)
const imagesPath = resolve(__dirname, '../static')

const saveFile = async (ctx, fileDir, useQiniu = false) => {
  const { file, body } = ctx.req
  const { buffer, originalname } = file
  const { to, from, mediaType, timestamp, avatar } = body
  const filename = originalname.replace(/\./ig, `_${Date.now()}.`)
  let fileUrl
  if (useQiniu) {
    fileUrl = await qiniu.upload(ctx, filename, buffer)
  } else {
    const filepath = resolve(imagesPath, fileDir, filename)
    try {
      fileUrl = `/${fileDir}/${filename}`
      await writeFile(filepath, buffer)
    } catch (err) {
      console.error('图片文件失败', err)
    }
  }
  const param = {
    data: fileUrl,
    mediaType,
    from,
    timestamp,
    avatar
  }
  // 蠢办法，先不做缓存，直接遍历取吧
  Object.keys($io.sockets.sockets).forEach(socketId => {
    const currentClient = $io.sockets.sockets[socketId]
    if (currentClient.userInfo.openId === to) {
      currentClient.emit('message', param)
    }
  })
  ctx.apiSuccess(fileUrl)
}

$router.post('/api/socket/msg/media', uploader.single('media'), async (ctx) => {
  await saveFile(ctx, 'temp')
})
