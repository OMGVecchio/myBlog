'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const Next = require('next')

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
    socketHandler(this.app)
    this.bindGlobal()
    this.addFilters()
    this.attachEvent()
  }
  bindGlobal() {
    global.Router = this.router
    global.$router = this.router
    global.Config = this.config
    global.$config = this.config
    global.nextHandle = next.getRequestHandler()
    global.$nextHandle = next.getRequestHandler()
    global.isDev = !(process.env.NODE_ENV === 'product')
    global.$isDev = !(process.env.NODE_ENV === 'product')
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

next.prepare().then(() => {
  const application = new Koa()
  const app = new KOA(application)
  app.start()
})
