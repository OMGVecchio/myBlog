'use strict'

const resolve = require('path').resolve
const fs = require('fs')

const readFile = async (path, cb) => {
    return new Promise((res, rej) => {
        if(!path) {
            throw new Error(`path are required at traverse`)
        }
        fs.stat(path, (err, stat) => {
            if(stat.isFile()) {
                console.log('-----')
                if(cb) {
                    cb(path)
                }else {
                    require(path)
                }
            }else {
                fs.readdir(path, (err, pathList) => {
                    pathList.map(pathName => {
                        const pathSub = resolve(path, pathName)
                        readFile(pathSub)
                    })
                })
            }
        })
    })
}

module.exports = readFile
