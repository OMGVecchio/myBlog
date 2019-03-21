'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const Next = require('next')
const http = require('http')
const socket = require('socket.io')

const config = require('./config')
const filters = require('./filters')
const { out } = require('./utils')
const socketHandler = require('./socket')

const { error } = out

const next = Next({
  dev: process.env.NODE_ENV !== 'production',
  dir: config.nextDir
})

class KOA {
  constructor(application) {
    this.app = application
    this.app.router = router
    this.router = router
    this.app.config = config
    this.config = config
  }
  start() {
    this.bindGlobal()
    this.addFilters()
    this.attachEvent()
    const server = http.createServer(this.app.callback())
    const ioServer = socket(server)
    server.listen(this.config.port)
    socketHandler(ioServer)

      const io = ioServer
      io.on('connection', client => {

        console.log('来了个新成员', client.id)

        client.on('single-message', data => {
          const { msg, to } = data
          const param = {
            msg,
            from: client.id
          }
          io.sockets.sockets[to].emit('single-message', param)
        })

        client.on('disconnect', () => {
          console.log('连接关闭了', client.id)
        })

        client.on('newMember', () => {
          io.sockets.emit('refreshFriendList', Object.keys(io.sockets.sockets))
        })
      })
  }
  bindGlobal() {
    global.Router = this.router
    global.Config = this.config
    global.nextHandle = next.getRequestHandler()
    global.isDev = !(process.env.NODE_ENV === 'product')
  }
  addFilters() {
    filters(this.app)
  }
  attachEvent() {
    this.app.on('error', err => {
      error('服务器异常', err)
    })
  }
}

// next.prepare().then(() => {
  const application = new Koa()
  const app = new KOA(application)
  app.start()
// })
