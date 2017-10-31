'use strict'

const Router = require('koa-router')
const traverse = require('../utils').traverse
const resolve = require('path').resolve

traverse(resolve(__dirname, 'lib/test'))

module.exports = Router
