'use strict'

const resolve = require('path').resolve
const fs = require('fs')

const fsStat = (path) => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if(err) {
                reject(err)
            }
            resolve(stat)
        })
    })
}

const fsReaddir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, stat) => {
            if(err) {
                reject(err)
            }
            resolve(stat)
        })
    })
}

const traverse = async (path, cb) => {
    if(!path) {
        throw new Error(`path is required at traverse`)
    }
    try {
        const stat = await fsStat(path)
        if(stat.isFile()) {
            if(cb) {
                cb(path)
            }else {
                require(path)
            }
        }else {
            const pathList = await fsReaddir(path)
            pathList.map(pathName => {
                const pathSub = resolve(path, pathName)
                traverse(pathSub, cb || null)
            })
        }
    }catch(err) {
        throw new Error(err)
    }
}

module.exports = traverse
