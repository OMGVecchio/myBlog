import {
  select,
  put,
  takeEvery
} from 'redux-saga/effects'
import { message } from 'antd'
import { isServer } from '_'

import xhr from '_/fetch'

import articleTypes, {
  fillList,
  fillDetail,
  fillComment,
  removeArticleDone,
  onlineArticleDone
} from '#/action/article'
import tagTypes, { fillList as fillTagList } from '#/action/tag'

const isFailed = (data, info) => {
  if (data.code !== 200 && !isServer) {
    const errorInfo = info || data.data
    message.error(errorInfo)
    return true
  }
  return false
}

function* fetchList() {
  const articleList = yield select((state) => {
    const result = state.getIn(['article', 'articleList'])
    if (result && result.toJS) {
      return result.toJS()
    }
    return []
  })
  if (articleList.length !== 0) {
    return
  }
  const dataResolve = yield xhr.get('/api/article')
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(fillList(data))
}

function* fetchDetail({ articleId }) {
  const detailCache = yield select((state) => {
    const detail = state.getIn(['article', 'articleDetail', articleId])
    if (detail && detail.toJS) {
      return detail.toJS()
    }
    return {}
  })
  if (detailCache[articleId]) {
    return
  }
  const dataResolve = yield xhr.get(`/api/article/${articleId}`)
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(fillDetail(articleId, data))
}

function* fetchComment({ articleId }) {
  // 评论不做缓存吧
  // const commentCache = yield select((state) => {
  //   const comment = state.getIn(['article', 'commentMap', articleId])
  //     if (comment && comment.toJS) {
  //       return comment.toJS()
  //     }
  //     return {}
  // })
  // if (commentCache[articleId]) {
  //   return
  // }
  const dataResolve = yield xhr.get(`/api/comment/${articleId}`)
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(fillComment(articleId, data))
}

function* removeArticle({ articleId }) {
  const dataResolve = yield xhr.del(`/api/auth/article/${articleId}`)
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(removeArticleDone(articleId))
}

function* onlineArticle({ articleId, online }) {
  // on:上线  off:下线
  const tag = online ? 'on' : 'off'
  const dataResolve = yield xhr.put(`/api/auth/article/${articleId}`, { online: tag })
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(onlineArticleDone(articleId, online))
}

function* fetchTagList({ clearCache = false }) {
  if (!clearCache) {
    const tagList = yield select((state) => {
      const tag = state.get('tag')
      if (tag) {
        return tag.get('tagList').toJS()
      }
      return []
    })
    if (tagList.length !== 0) {
      return
    }
  }
  const dataResolve = yield xhr.get('/api/tags')
  const { data } = dataResolve
  if (isFailed(dataResolve)) {
    return
  }
  yield put(fillTagList(data))
}

function* rootSaga() {
  yield takeEvery(articleTypes.FETCH_LIST, fetchList)
  yield takeEvery(articleTypes.FETCH_DETAIL, fetchDetail)
  yield takeEvery(articleTypes.FETCH_COMMENT, fetchComment)
  yield takeEvery(articleTypes.REMOVE_ARTICLE, removeArticle)
  yield takeEvery(articleTypes.ONLINE_ARTICLE, onlineArticle)
  yield takeEvery(tagTypes.FETCH_LIST, fetchTagList)
}

export default rootSaga
