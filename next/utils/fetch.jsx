import 'isomorphic-fetch'

import { isServer, isObject, getUrlQuery } from '_'
import { getToken } from '_/token'

const config = require('../../config')

const prefix = `http://${isServer ? '127.0.0.1' : config.host}:${config.port}`

const getDefaultOpt = () => ({
  cache: 'no-cache',
  credentials: 'same-origin',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referrer'
})
const getUrl = (url, needPrefix = true) => {
  if (needPrefix) {
    return `${prefix}${url}`
  }
  return url
}
// 组装 fetch 参数
// 此种赋值方式会有一定问题，例如 extra 中的 headers 会完全覆盖掉默认的 headers，有些默认的是不应该被覆盖的，反之亦然
const getOpt = (optObj, extraObj = {}) => {
  let obj = optObj
  let extra = extraObj
  if (!isObject(optObj)) {
    obj = {}
  }
  if (!isObject(extraObj)) {
    extra = {}
  }
  const newOpt = Object.assign(getDefaultOpt(), obj, extra)
  // 非服务端时，给所有请求添加 token 字段
  if (!isServer) {
    if (!newOpt.headers) {
      newOpt.headers = {}
    }
    newOpt.headers['access-token'] = getToken()
  }
  return newOpt
}

const xhr = {
  get(url, data = {}, extra) {
    const query = `?${getUrlQuery(data)}`
    return fetch(`${getUrl(url)}${query}`, getOpt({
      method: 'GET'
    }, extra)).then(res => res.json())
  },
  post(url, data = {}, extra) {
    return fetch(getUrl(url), getOpt({
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json;charset=UTF-8',
        'access-token': getToken()
      },
      body: JSON.stringify(data)
    }, extra)).then(res => res.json())
  },
  del(url, data = {}, extra) {
    const query = `?${getUrlQuery(data)}`
    return fetch(`${getUrl(url)}${query}`, getOpt({
      method: 'DELETE'
    }, extra)).then(res => res.json())
  },
  put(url, data = {}, extra) {
    const query = `?${getUrlQuery(data)}`
    return fetch(`${getUrl(url)}${query}`, getOpt({
      method: 'put'
    }, extra)).then(res => res.json())
  }
}

export default xhr
