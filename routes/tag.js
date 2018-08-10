'use strict'

const { dbs } = require('../utils')
const tagDB = dbs('tags.json')

const List = 'list'
const SORT = 'sort'

Router.get('/api/tags', async (ctx) => {
  try {
    const tags = await tagDB.get(List).value()
    ctx.apiSuccess(tags)
  } catch (err) {
    console.error(err)
  }
})
