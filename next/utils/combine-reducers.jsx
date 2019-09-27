/**
 * Concise combineReducer supported for immutableJS
 * depressed
 */

import { is } from 'immutable'

const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  })
  const finalReducerKeys = Object.keys(finalReducers)

  return (state, action) => {
    let hasChanged = false
    let nextState = state
    finalReducerKeys.some((key) => {
      const reducer = finalReducers[key]
      const previousStateForKey = state.get(key)
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState = nextState.set(key, nextStateForKey)
      hasChanged = !is(nextStateForKey, previousStateForKey)
      return hasChanged
    })
    return hasChanged ? nextState : state
  }
}

export default combineReducers
