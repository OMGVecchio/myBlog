'use strict'

const { db } = require('../utils')
const { albumDB } = db

$router.get('/api/album/list', async (ctx) => {
  try {
    const tags = await albumDB.get('map').value()
    ctx.apiSuccess(Object.keys(tags))
  } catch (err) {
    console.error(err)
  }
})
