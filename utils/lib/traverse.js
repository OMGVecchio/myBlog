'use strict'

const load = require
const { promisify } = require('util')
const { resolve } = require('path')
const { stat, readdir } = require('fs')

const fsStat = promisify(stat)
const fsReaddir = promisify(readdir)

const traverse = async (path, cb) => {
  if (!path) {
    throw new Error('path is required at traverse')
  }
  try {
    const state = await fsStat(path)
    if (state.isFile()) {
      if (cb) {
        cb(path)
      } else {
        load(path)
      }
    } else {
      const pathList = await fsReaddir(path)
      pathList.forEach((pathName) => {
        const pathSub = resolve(path, pathName)
        traverse(pathSub, cb || null)
      })
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = traverse
