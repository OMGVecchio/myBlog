import { isServer } from './index'

const TOKEN = 'token'

export const setToken = (tokenName, token) => {
  if (!isServer) {
    let tn = tokenName
    let t = token
    if (!token) {
      t = tn
      tn = TOKEN
    }
    localStorage.setItem(tn, t)
  }
}

export const getToken = (tokenName = TOKEN) => {
  if (!isServer) {
    return localStorage.getItem(tokenName) || ''
  }
  return ''
}

export const removeToken = (tokenName = TOKEN) => {
  if (!isServer) {
    localStorage.removeItem(tokenName)
  }
}

export default getToken
