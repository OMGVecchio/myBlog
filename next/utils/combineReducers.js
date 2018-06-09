/**
 * Concise combineReducer supported for immutableJS
 */

import { fromJS } from 'immutable'

const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  })
  const finalReducerKeys = Object.keys(finalReducers)

  return (state = fromJS({}), action) => {
    let hasChanged = false
    const nextState = fromJS({})
    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState.set(key, nextStateForKey)
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    })
    return hasChanged ? nextState : state
  }
}

export default combineReducers
