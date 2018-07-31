'use strict'

const low = require('lowdb')
const { resolve } = require('path')
const FileSync = require('lowdb/adapters/FileSync')
const dbPath = resolve(__dirname, '../../dbs')

module.exports = (dbName = 'db.json') => {
    const adapter = new FileSync(resolve(dbPath, dbName))
    const db = low(adapter)
    return db
}
