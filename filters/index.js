'use strict'

const resolve = require('path').resolve
const template = require('./lib/template')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const statics = require('koa-static')
const Redis = require('ioredis')
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    prefix: 'blog:',
    ttl: 60 * 60 * 24
})

module.exports = (app) => {
    app
       .use(template)
       .use(logger())
       .use(bodyParser())
       .use(statics(
           resolve(__dirname, '../static')
       ))
       .use(async(ctx, next) => {
           ctx.redis = redis
           await next()
       })
}
