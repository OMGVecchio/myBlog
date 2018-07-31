import 'isomorphic-fetch'

const xhr = {
  get(url) {
    return fetch(url)
  },
  post(url, data) {
    return fetch(url, {
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
