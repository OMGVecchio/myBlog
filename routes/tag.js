'use strict'

const { db } = require('../utils')
const { tagDB } = db

Router.get('/api/tags', async (ctx) => {
  try {
    const tags = await tagDB.get('map').value()
    ctx.apiSuccess(Object.keys(tags))
  } catch (err) {
    console.error(err)
  }
})
