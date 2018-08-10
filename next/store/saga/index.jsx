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
import articleTypes, { fillList, fillDetail } from 'store/action/article'
import tagTypes, { fillList as fillTagList } from 'store/action/tag'

function* fetchList() {
  const res = yield xhr.get('/api/article')
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillList(data))
}

function* fetchDetail({ articleId }) {
  const res = yield xhr.get(`/api/article/${articleId}`)
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillDetail(data))
}

function* fetchTagList() {
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
  const res = yield xhr.get('/api/tags')
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillTagList(data))
}

function* rootSaga() {
  yield takeEvery(articleTypes.FETCH_LIST, fetchList)
  yield takeEvery(articleTypes.FETCH_DETAIL, fetchDetail)
  yield takeEvery(tagTypes.FETCH_LIST, fetchTagList)
}

export default rootSaga
