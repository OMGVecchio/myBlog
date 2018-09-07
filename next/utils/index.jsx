export const isServer = typeof window === 'undefined'

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export const getUrlQuery = (urlObj) => {
  if (!isObject(urlObj)) {
    return ''
  }
  return Object.keys(urlObj).map(key => `${key}=${urlObj[key]}`).join('&')
}

export const filterArticleList = (articleList, kw = '') => articleList.filter((articel) => {
  const { online, title } = articel
  if (!online) {
    return false
  }
  if (kw) {
    if (title.indexOf(kw) !== -1) {
      return true
    }
    return false
  }
  return true
})

export default isServer
