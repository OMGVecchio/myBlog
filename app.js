'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const Next = require('next')

const config = require('./config')
const filters = require('./filters')

const next = Next({
    dev: process.env.NODE_ENV !== 'production',
    dir: config.nextDir
})

class KOA {
    constructor(application) {
        this.app = application
        this.app.router = router
        this.router = router
        this.config = config
    }
    start() {
        this.bindGlobal()
        this.addFilters()
        this.app.listen(this.config.port)
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
}

next.prepare().then(() => {
    const application = new Koa()
    const app = new KOA(application)
    app.start()
})
