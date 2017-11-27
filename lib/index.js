'use strict'

const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const config = require('../config')
const filters = require('../filters')
const routes = require('../routes')

class KOA {
    constructor(app) {
        this.app = app
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
        global.isDev = process.env.NODE_ENV === 'product' ? false : true
    }
    addFilters() {
        filters(this.app)
    }
    addRoutes() {
        routes(this.app, this.router)
    }
}

module.exports = new KOA(app)
