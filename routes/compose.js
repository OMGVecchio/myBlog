'use strict'

const { dbs } = require('../utils')
const db = dbs('compose.db')

Router.post('/api/compose/save', async (ctx) => {
  // ctx.body = await db.get('id')
  ctx.body = ctx.request.body
})
