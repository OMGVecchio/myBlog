import 'isomorphic-fetch'

import { getToken } from 'utils/token'

const prefix = 'http://127.0.0.1:3000'
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
const getOpt = (optObj) => {
  let obj = optObj
  if (Object.prototype.toString.call(optObj) !== '[object Object]') {
    obj = {}
  }
  return Object.assign(obj, fetchOpt)
}

const xhr = {
  get(url) {
    return fetch(getUrl(url), getOpt({
      method: 'GET'
      // error
      // headers: {
      //   'access-token': getToken()
      // }
    })).then(res => res.json())
  },
  post(url, data) {
    return fetch(getUrl(url), getOpt({
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json;charset=UTF-8',
        'access-token': getToken()
      },
      body: JSON.stringify(data)
    })).then(res => res.json())
  },
  del(url) {
    return fetch(getUrl(url), getOpt({
      method: 'DELETE'
    })).then(res => res.json())
  }
}

export default xhr
