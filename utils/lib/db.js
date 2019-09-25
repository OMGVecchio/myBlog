'use strict'

const dbs = require('./dbs')
const dbMap = {
  alDB: dbs('article-list.json'),
  acDB: dbs('article-content.json'),
  tagDB: dbs('tags.json'),
  commentDB: dbs('comment.json'),
  album: dbs('album.json')
}

module.exports = dbMap
