import 'isomorphic-fetch'

import { getToken } from 'utils/token'

const prefix = 'http://127.0.0.1:3000'

const xhr = {
  get(url) {
    return fetch(`${prefix}${url}`, {
      method: 'GET'
      // error
      // headers: {
      //   'access-token': getToken()
      // }
    })
  },
  post(url, data) {
    return fetch(`${prefix}${url}`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json;charset=UTF-8',
        'access-token': getToken()
      },
      body: JSON.stringify(data)
    })
  }
}

export default xhr
