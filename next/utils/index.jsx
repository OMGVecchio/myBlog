export const isServer = typeof window === 'undefined'

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const getUrlQuery = (urlObj) => {
  if (!isObject(urlObj)) {
    return ''
  }
  return Object.keys(urlObj).map(key => `${key}=${urlObj[key]}`).join('&')
}

export default isServer
