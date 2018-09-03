import {
  // all,
  // call,
  // take,
  select,
  put,
  takeEvery
} from 'redux-saga/effects'
import xhr from 'utils/fetch'

// import types from 'store/action/common'
import articleTypes, { fillList, fillDetail, fillComment } from 'store/action/article'
import tagTypes, { fillList as fillTagList } from 'store/action/tag'

function* fetchList() {
  const res = yield xhr.get('/api/article')
  const dataResolve = yield res.json()
  const { data } = dataResolve
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
  const res = yield xhr.get(`/api/article/${articleId}`)
  const dataResolve = yield res.json()
  const { data } = dataResolve
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
  const res = yield xhr.get(`/api/comment/${articleId}`)
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillComment(articleId, data))
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
  const res = yield xhr.get('/api/tags')
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillTagList(data))
}

function* rootSaga() {
  yield takeEvery(articleTypes.FETCH_LIST, fetchList)
  yield takeEvery(articleTypes.FETCH_DETAIL, fetchDetail)
  yield takeEvery(articleTypes.FETCH_COMMENT, fetchComment)
  yield takeEvery(tagTypes.FETCH_LIST, fetchTagList)
}

export default rootSaga
