import { isServer } from './index'

export const setToken = (token) => {
  if (!isServer) {
    localStorage.setItem('token', token)
  }
}
export const getToken = () => {
  if (!isServer) {
    return localStorage.getItem('token') || ''
  }
  return ''
}

export default getToken
