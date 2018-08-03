import {
  // all,
  // call,
  // take,
  put,
  takeEvery
} from 'redux-saga/effects'
import xhr from 'utils/fetch'

// import types from 'store/action/common'
import articleTypes, { fillList, fillDetail } from 'store/action/article'

function* fetchList() {
  const res = yield xhr.get('//127.0.0.1:3000/api/article')
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillList(data))
}

function* fetchDetail({ articleId }) {
  const res = yield xhr.get(`//127.0.0.1:3000/api/article/${articleId}`)
  const dataResolve = yield res.json()
  const { data } = dataResolve
  yield put(fillDetail(data))
}

function* rootSaga() {
  yield takeEvery(articleTypes.FETCH_LIST, fetchList)
  yield takeEvery(articleTypes.FETCH_DETAIL, fetchDetail)
}

export default rootSaga
