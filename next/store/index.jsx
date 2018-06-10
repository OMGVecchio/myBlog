import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  createLogger({ collapsed: true })
]
const enhance = composeWithDevTools(applyMiddleware(...middlewares))

const storeFactory = (initialState = {}) => {
  const store = createStore(reducer, initialState, enhance)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(saga)
  }
  store.runSagaTask()
  return store
}

export default storeFactory
