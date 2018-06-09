import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { Map } from 'immutable'
import reducer from './reducer'
import saga from './saga'

const defaultState = Map({
  asideIsOpen: true
})

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  createLogger({ collapsed: true })
]
const enhance = composeWithDevTools(applyMiddleware(...middlewares))

const storeFactory = (initialState = defaultState) => {
  const store = createStore(reducer, initialState, enhance)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(saga)
  }
  store.runSagaTask()
  return store
}

export default storeFactory
