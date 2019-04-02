'use strict'

const http = require('http')
const socket = require('socket.io')
const { out, wx } = require('../utils')
const { info, warn } = out
const { checkUserInfo } = wx

module.exports = app => {
  const server = http.createServer(app.callback())
  const io = socket(server)
  global.$io = io
  server.listen(app.config.port)

  io.on('connection', client => {

    info(`${client.id} 已上线`)

    client.on('message', data => {
      const {
        msg,
        to,
        mediaType,
        timestamp,
        avatar
      } = data
      const param = {
        data: msg,
        from: client.userInfo.openId,
        mediaType,
        timestamp,
        avatar
      }
      // 蠢办法，先不做缓存，直接遍历取吧
      Object.keys(io.sockets.sockets).forEach(socketId => {
        const currentClient = io.sockets.sockets[socketId]
        if (currentClient.userInfo.openId === to) {
          console.log(currentClient.userInfo.openId)
          console.log(to)
          currentClient.emit('message', param)
        }
      })
    })

    client.on('disconnect', () => {
      warn(`${client.id}已下线`)
      io.sockets.emit('refreshFriendList', Object.keys(io.sockets.sockets))
    })

    client.on('newMember', async (data = {}) => {
      const { sessionId, userInfo, openId } = data
      const sessionInfo = await $redis.get(sessionId)
      const { session_key } = JSON.parse(sessionInfo)
      const { rawData, signature } = userInfo
      if (checkUserInfo(rawData, session_key, signature) === true) {
        const userInfoJSON = JSON.parse(rawData)
        userInfoJSON.openId = openId
        client.userInfo = userInfoJSON
      }
      const allUserInfo = []
      Object.keys(io.sockets.sockets).forEach(socketId => {
        const { userInfo } = io.sockets.sockets[socketId]
        allUserInfo.push(userInfo)
      })
      io.sockets.emit('refreshFriendList', allUserInfo)
    })
  })
}
