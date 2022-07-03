'use strict'

/**
 * 绑定 Redis 实例
 */

const Redis = require('ioredis')

const config = require('../../config/redis')
const { info, error } = require('../../utils').out

class MemoryCache {
  static instance

  data = new Map()

  constructor() {
    if (!(this instanceof MemoryCache)) {
      throw new Error('maybe you are not create MemoryCache by new')
    }
    if (global.instance) {
      return MemoryCache.instance
    }
  }

  async set(key, val) {
    this.data.set(key, val)
  }

  async get(key) {
    return this.data.get(key)
  }

  async del(key) {
    this.data.delete(key)
  }
}
class RedisFactory {
  constructor(conf) {
    this.hasInited = false
    this.redisInstance = null
    this.conf = {
      ...conf
    }
    return this.createInstance()
  }
  createInstance() {
    if (this.hasInited) {
      return this.redisInstance
    }
    const redisInstance = new Redis({
      host: this.conf.redisHost,
      port: this.conf.redisPort,
      prefix: this.conf.redisPrefix,
      ttl: this.conf.redisTTL,
      retryStrategy: this.conf.retryStrategy
    })
    this.redisInstance = redisInstance
    this.hasInited = true
    redisInstance.on('error', err => {
      error('redis 连接失败', err)
      global.$redis = new MemoryCache()
    })
    redisInstance.on('connect', err => {
      if (err) {
        error('redis 连接失败', err)
      } else {
        info('redis 连接成功')
      }
    })
    redisInstance.on('close', err => {
      if (err) {
        error('redis 关闭失败', err)
      } else {
        info('redis 关闭成功')
      }
    })
    redisInstance.on('reconnecting', err => {
      if (err) {
        error('redis 重连失败', err)
      } else {
        info('redis 重连成功')
      }
    })
    return redisInstance
  }
}

const redis = new RedisFactory(config)
global.$redis = redis

module.exports = async (ctx, next) => {
  ctx.redis = redis
  await next()
}
