'use strict'

const { dbs } = require('../utils')
const tagDB = dbs('tags.json')

Router.get('/api/tags', async (ctx) => {
  try {
    const tags = await tagDB.value()
    ctx.apiSuccess(Object.keys(tags))
  } catch (err) {
    console.error(err)
  }
})
