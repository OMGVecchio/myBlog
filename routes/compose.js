'use strict'

const { lowdb } = require('../utils')
const db = lowdb('compose.db')

Router.post('/api/compose/save', async (ctx) => {
  // ctx.body = await db.get('id')
  ctx.body = ctx.request.body

})
