'use strict'

module.exports = {
  // http 服务基础配置
  host: '127.0.0.1',
  port: 3000,

  // next 相关配置
  nextDir: 'next',

  // redis 相关配置
  redisHost: '127.0.0.1',
  redisPort: 6379,
  redisPrefix: 'blog-',
  redisTTL: 60 * 60 * 24,

  // auth 相关配置
  user: {
    'vecchio': '314159'
  },
  jwtSecret: 'vecchio'
}
