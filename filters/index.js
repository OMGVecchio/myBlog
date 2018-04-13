'use strict'

const { resolve } = require('path')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const statics = require('koa-static')
// const redis = require('./lib/redis')
const nextRender = require('./lib/next-render')
const { traverse } = require('../utils')

module.exports = (app) => {
    const { router } = app
    traverse(resolve(__dirname, '../routes'))
    app
        .use(logger())
        .use(bodyParser())
        .use(statics(resolve(__dirname, '../static')))
        // .use(redis)
        .use(nextRender)
        .use(router.routes())
        .use(router.allowedMethods())
}
