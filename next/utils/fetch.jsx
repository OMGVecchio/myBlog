import 'isomorphic-fetch'

const prefix = 'http://127.0.0.1:3000'

const xhr = {
  get(url) {
    return fetch(`${prefix}${url}`)
  },
  post(url, data) {
    return fetch(`${prefix}${url}`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(data)
    })
  }
}

export default xhr
