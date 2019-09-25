'use strict'

const dbs = require('./dbs')
const dbMap = {
  alDB: dbs('article-list.json'),
  acDB: dbs('article-content.json'),
  tagDB: dbs('tags.json'),
  commentDB: dbs('comment.json'),
  albumCategoryListDB: dbs('album_category_list.json')
}

module.exports = dbMap
