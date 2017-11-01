'use strict'

const traverse = require('../utils').traverse
const resolve = require('path').resolve

traverse(resolve(__dirname, 'lib'))

module.exports = (app, router) => {
    app.use(router.routes())
       .use(router.allowedMethods())
}
