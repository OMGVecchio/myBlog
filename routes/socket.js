'use strict'

const util = require('util')
const fs = require('fs')
const { resolve } = require('path')
const multer = require('koa-multer')

const { qiniu } = require('../utils')

const uploader = multer()
const writeFile = util.promisify(fs.writeFile)
const imagesPath = resolve(__dirname, '../static/images/')

const saveImage = async (ctx, imgTag, useQiniu = false) => {
  const { file, body } = ctx.req
  const { buffer, originalname } = file
  const { to, from, mediaType, timestamp, avatar } = body
  const filename = originalname.replace(/\./ig, `_${Date.now()}.`)
  let imgUrl
  if (useQiniu) {
    imgUrl = await qiniu.upload(ctx, filename, buffer)
  } else {
    const filepath = resolve(imagesPath, imgTag, filename)
    try {
      imgUrl = `http://172.31.10.104:3000/images/${imgTag}/${filename}`
      await writeFile(filepath, buffer)
    } catch (err) {
      console.error('图片文件失败', err)
    }
  }
  const param = {
    data: imgUrl,
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
  ctx.apiSuccess(imgUrl)
}

$router.post('/api/socket/msg/media', uploader.single('media'), async (ctx) => {
  await saveImage(ctx, 'temp')
})
