'use strict'

const request = require('request')
const conf = require('../../config')
const templateDevUrl = `http://${conf.devHost}:${conf.devPort}/index.html`

module.exports = async (ctx, next) => {
    if (ctx.originalUrl.match(/^\/api\//)) {
        next()
    } else {
        if (isDev) {
            let body = await new Promise((resolve, reject) => {
                request.get(templateDevUrl, (err, response, body) => {
                    resolve(body)
                })
            })
            ctx.body = body
        } else {
            next()
        }
    }
}