'use strict'

module.exports = {
  info(d, ...i) {
    console.info(`--- ${d} ---\n`, ...i)
  },
  warn(d, ...w) {
    console.warn(`--- ${d} ---\n`, ...w)
  },
  error(d, ...e) {
    console.error(`--- ${d} ---\n`, ...e)
  }
}
