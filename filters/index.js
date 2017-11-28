'use strict'

const { resolve } = require('path')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const statics = require('koa-static')
const template = require('./lib/template')
const redis = require('./lib/redis')

module.exports = (app) => {
    app
        .use(template)
        .use(logger())
        .use(bodyParser())
        .use(statics(resolve(__dirname, '../static')))
        .use(redis)
}
