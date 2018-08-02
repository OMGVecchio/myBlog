'use strict'

const Redis = require('ioredis')
const config = require('../../config')

class RedisFactory {
  constructor(conf) {
    this.hasInited = false
    this.redisInstance = null
    this.conf.redisHost = conf.redisHost
    this.conf.redisHost = conf.redisPort
    this.conf.redisPrefix = conf.redisPrefix
    this.conf.redisTTL = conf.redisTTL
  }
  createInstance() {
    if (this.hasInited) {
      return this.redisInstance
    }
    const redisInstance = new Redis({
      host: this.conf.redisHost || '127.0.0.1',
      port: this.conf.redisHost || 6379,
      prefix: this.conf.redisPrefix || 'blog-',
      ttl: this.conf.redisTTL || 60 * 60 * 24
    })
    this.redisInstance = redisInstance
    return redisInstance
  }
}

module.exports = async (ctx, next) => {
  ctx.redis = await RedisFactory(config)
  await next()
}
