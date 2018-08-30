'use strict'

module.exports = {
  info(d, ...i) {
    console.info(`--- ${d} ---`, ...i)
  },
  warn(d, ...w) {
    console.warn(`--- ${d} ---`, ...w)
  },
  error(d, ...e) {
    console.error(`--- ${d} ---`, ...e)
  }
}
