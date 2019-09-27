import Router from 'next/router'

import { message } from 'antd'

import 'isomorphic-fetch'

import { isServer, isObject, getUrlQuery } from '_'
import { getToken, removeToken } from '_/token'

const config = require('../../config')
// 请求接口的地址前缀
const prefix = isServer ? `http://127.0.0.1:${config.port}` : ''

// fetch 基础配置
const getDefaultOpt = () => ({
  cache: 'no-cache',
  credentials: 'same-origin',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referrer'
})
// 获取请求接口的完整地址
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
// 请求回调函数
const resolveData = res => res.json()
const resolveStatus = (response) => {
  if (response.code === 403 && !isServer) {
    removeToken()
    Router.push('/login')
  }
  if (response.code === 200 && response.success === false && !isServer) {
    message.error(response.data)
  }
  return response
}

// restful 请求方式
const get = (url, data = {}, extra) => {
  const query = `?${getUrlQuery(data)}`
  return fetch(`${getUrl(url)}${query}`, getOpt({
    method: 'GET'
  }, extra)).then(resolveData).then(resolveStatus)
}

const post = (url, data = {}, extra) => fetch(getUrl(url), getOpt({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'access-token': getToken()
  },
  body: JSON.stringify(data)
}, extra)).then(resolveData).then(resolveStatus)

const del = (url, data = {}, extra) => {
  const query = `?${getUrlQuery(data)}`
  return fetch(`${getUrl(url)}${query}`, getOpt({
    method: 'DELETE'
  }, extra)).then(resolveData).then(resolveStatus)
}

const put = (url, data = {}, extra) => {
  const query = `?${getUrlQuery(data)}`
  return fetch(`${getUrl(url)}${query}`, getOpt({
    method: 'put'
  }, extra)).then(resolveData).then(resolveStatus)
}

const xhr = {
  get, post, del, put
}

const isFailed = (data, info) => {
  if (data.code !== 200 && !isServer) {
    const errorInfo = info || data.data
    message.error(errorInfo)
    return true
  }
  return false
}

export default xhr

export { get, post, del, put, isFailed }
