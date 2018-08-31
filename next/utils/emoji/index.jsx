const map = require('./source')

const list = Object.keys(map)

const Emoji = {
  map,
  list,
  parse(str) {
    return String(str).replace(/:(.+?):/g, (placeholder, key) => map[key] || placeholder)
  }
}

export default Emoji
