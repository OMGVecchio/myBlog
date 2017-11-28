'use strict'

const { traverse } = require('../utils')
const { resolve } = require('path')

traverse(resolve(__dirname, 'lib'))

module.exports = (app, router) => {
    app.use(router.routes())
        .use(router.allowedMethods())
}
