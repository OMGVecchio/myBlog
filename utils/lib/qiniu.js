'use strict'

const qiniu = require('qiniu')

const config = require('../../config')

const {
  accessKey,
  secretKey,
  bucket,
  qiniuDomain
} = config
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const REDIS_TAG = 'qiniu-token'
const TOKEN_LIFE = 3600

const setToken = async (ctx, opt = {}) => {
  const option = {
    scope: bucket,
    expires: TOKEN_LIFE
  }
  Object.assign(option, opt)
  const putPolicy = new qiniu.rs.PutPolicy(option)
  const uploadToken = putPolicy.uploadToken(mac)
  await ctx.redis.set(REDIS_TAG, uploadToken, 'EX', TOKEN_LIFE)
  return uploadToken
}
const getToken = async (ctx) => {
  let token = await ctx.redis.get(REDIS_TAG)
  if (!token) {
    token = await setToken(ctx)
  }
  return token
}
const upload = async (ctx, key, buffer) => {
  const qiniuConfig = new qiniu.conf.Config()
  const putExtra = new qiniu.form_up.PutExtra()
  const formUploader = new qiniu.form_up.FormUploader(qiniuConfig)
  const token = await getToken(ctx)
  return await new Promise((resolve, reject) => {
    formUploader.put(token, key, buffer, putExtra, function(respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        const { key } = respBody
        resolve(`//${qiniuDomain}/${key}`)
      } else {
        resolve(respBody)
      }
    })
  })
}

module.exports = {
  setToken,
  getToken,
  upload
}
