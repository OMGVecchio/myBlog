'use strict'

const { code2SessionPath } = require('../config/weixin')
const { fetch } = require('../utils').fetch
const uuid = require('uuid')

$router.post('/api/wx/auth', async ctx => {
  const { code } = ctx.request.body
  const res = await fetch(code2SessionPath(code))
  if (res && res.session_key) {
    const key = uuid.v1()
    ctx.redis.set(key, res)
    ctx.apiSuccess(key)
  }
})
