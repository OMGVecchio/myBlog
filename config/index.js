'use strict'

module.exports = {
  port: 3000,

  nextDir: 'next',

  redisHost: '127.0.0.1',
  redisPort: 6379,
  redisPrefix: 'blog-',
  redisTTL: 60 * 60 * 24,

  user: {
    'vecchio': '314159'
  },
  jwtSecret: 'vecchio'
}
