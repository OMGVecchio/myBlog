'use strict'

/**
 * 绑定 Redis 实例
 */

const Redis = require('ioredis')

const config = require('../../config/redis')
const { info, error } = require('../../utils').out

class RedisFactory {
  constructor(conf) {
    this.hasInited = false
    this.redisInstance = null
    this.conf = {
      redisHost: conf.redisHost || '127.0.0.1',
      redisPort: conf.redisPort || '6397',
      redisPrefix: conf.redisPrefix || 'blog-',
      redisTTL: conf.redisTTL || 60 * 60 * 24
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
      ttl: this.conf.redisTTL
    })
    this.redisInstance = redisInstance
    this.hasInited = true
    redisInstance.on('error', (err) => {
      error('redis 连接失败', err)
    })
    redisInstance.on('connect', (err) => {
      if (err) {
        error('redis 连接失败', err)
      } else {
        info('redis 连接成功')
      }
    })
    redisInstance.on('close', (err) => {
      if (err) {
        error('redis 关闭失败', err)
      } else {
        info('redis 关闭成功')
      }
    })
    redisInstance.on('reconnecting', (err) => {
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

module.exports = async (ctx, next) => {
  ctx.redis = redis
  await next()
}
