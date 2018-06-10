/**
 * Concise combineReducer supported for immutableJS
 */

import { fromJS, is } from 'immutable'

const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  })
  const finalReducerKeys = Object.keys(finalReducers)

  return (state = {}, action) => {
    let hasChanged = false
    let nextState = fromJS({})
    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(fromJS(previousStateForKey), action)
      nextState = nextState.set(key, nextStateForKey)
      hasChanged = hasChanged || !is(nextStateForKey, previousStateForKey)
    })
    return hasChanged ? nextState : state
  }
}

export default combineReducers
