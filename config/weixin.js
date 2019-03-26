'use strict'

const appId = 'wxb7791d1e9388d9b3'
const appSecret = 'db4440835e26d7a008d53f3c5d71a549'

module.exports = {
  appId,
  appSecret,
  code2SessionPath: code => `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
}
