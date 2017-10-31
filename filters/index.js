'use strict'

const Logger = require('koa-logger')
const Router = require('../routes')

module.exports = (app) => {
    app.use(Logger)
    app.use(Router)
}
