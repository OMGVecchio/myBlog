'use strict'

const { resolve } = require('path')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const statics = require('koa-static')
const apiUtil = require('./lib/api')
const redis = require('./lib/redis')
const auth = require('./lib/auth')
const check = require('./lib/check')
const nextRender = require('./lib/next-render')
const { traverse } = require('../utils')

module.exports = (app) => {
  const { router } = app
  traverse(resolve(__dirname, '../routes'))
  app
    .use(logger())
    .use(bodyParser())
    .use(statics(resolve(__dirname, '../static')))
    .use(apiUtil)
    .use(redis)
    .use(auth)
    .use(check)
    .use(nextRender)
    .use(router.routes())
    .use(router.allowedMethods())
}
