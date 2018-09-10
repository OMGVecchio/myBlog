import 'isomorphic-fetch'

import { isServer, isObject, getUrlQuery } from 'utils'
import { getToken } from 'utils/token'

const config = require('../../config')

const prefix = `http://${isServer ? '127.0.0.1' : config.host}:${config.port}`
const fetchOpt = {
  cache: 'no-cache',
  credentials: 'same-origin',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referrer'
}

const getUrl = (url, needPrefix = true) => {
  if (needPrefix) {
    return `${prefix}${url}`
  }
  return url
}
// 组装 fetch 参数
const getOpt = (optObj, extraObj = {}) => {
  let obj = optObj
  let extra = extraObj
  if (!isObject(optObj)) {
    obj = {}
  }
  if (!isObject(extraObj)) {
    extra = {}
  }
  return Object.assign(obj, fetchOpt, extra)
}

const xhr = {
  get(url, data = {}, extra) {
    const query = `?${getUrlQuery(data)}`
    return fetch(`${getUrl(url)}${query}`, getOpt({
      method: 'GET'
      // error
      // headers: {
      //   'access-token': getToken()
      // }
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
