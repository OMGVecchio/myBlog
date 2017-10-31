'use strict'

const Koa = require('koa')
const app = new Koa()
require('./filters')(app)
app.listen(require('./config').port)
