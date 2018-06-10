import { all, call, take, put, takeEvery } from 'redux-saga/effects'

import types from 'store/action/common'

function* test() {
  console.log('异步请求?')
}

function* rootSaga() {
  yield takeEvery(types.INCREASE, test)
}

export default rootSaga
