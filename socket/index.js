'use strict'

const http = require('http')
const socket = require('socket.io')
const { info, warn, error } = require('../utils').out

module.exports = app => {
  const server = http.createServer(app.callback())
  const io = socket(server)
  global.$io = io
  server.listen(app.config.port)

  io.on('connection', client => {

    info('来了个新成员', client.id)

    client.on('single-message', data => {
      const { msg, to } = data
      const param = {
        data: msg,
        isMedia: false,
        from: client.id
      }
      const toClient = io.sockets.sockets[to];
      if (!toClient) {
        return
      }
      toClient.emit('single-message', param)
    })

    client.on('disconnect', () => {
      console.warn('连接关闭了', client.id)
    })

    client.on('newMember', () => {
      io.sockets.emit('refreshFriendList', Object.keys(io.sockets.sockets))
    })
  })
}
