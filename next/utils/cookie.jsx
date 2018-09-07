import { isServer, isObject } from 'utils'

export const setCookie = (key, value, day = 30) => {
  if (!isServer) {
    const exp = Date.now() + (1000 * 60 * 60 * 24 * day)
    let valueResult = value
    if (isObject(valueResult)) {
      valueResult = JSON.stringify(value)
    }
    document.cookie = `${key}=${encodeURIComponent(valueResult)};expires=${new Date(exp).toGMTString()}`
  }
}

export const getCookie = (key) => {
  if (!isServer) {
    const cookies = document.cookie.split(';') || []
    const cookieObj = {}
    cookies.forEach((cookieStr) => {
      const cookieArr = cookieStr.split('=')
      const cookieKey = (cookieArr[0]).trim()
      const cookieVal = decodeURIComponent(cookieArr[1])
      let cookieValResult
      try {
        cookieValResult = JSON.parse(cookieVal)
      } catch (err) {
        cookieValResult = cookieVal
      }
      cookieObj[cookieKey] = cookieValResult
    })
    if (key) {
      return cookieObj[key]
    }
    return cookieObj
  }
  return {}
}

export const removeCookie = (key) => {
  setCookie(key, '', -1)
}

export default getCookie
