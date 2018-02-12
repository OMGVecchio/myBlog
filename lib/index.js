'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const config = require('../config')
const filters = require('../filters')
const routes = require('../routes')

const Next = require('next')
const next = Next({
    dev: process.env.NODE_ENV !== 'production'
})
const port = config.port
const handle = next.getRequestHandler()

next.prepare().then(() => {
    const app = new Koa()
})

class KOA {
    constructor(application) {
        this.app = application
        this.router = router
        this.config = config
    }
    start() {
        this.bindGlobal()
        this.addFilters()
        this.addRoutes()
        this.app.listen(this.config.port)
    }
    bindGlobal() {
        global.Router = this.router
        global.Config = this.config
        global.isDev = !(process.env.NODE_ENV === 'product')
    }
    addFilters() {
        filters(this.app)
    }
    addRoutes() {
        routes(this.app, this.router)
    }
}

module.exports = new KOA(app)
