import Immutable from 'immutable'
import types from 'store/action/tag'

const defaultState = Immutable.fromJS({
  tagList: []
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FILL_LIST:
      return initState.set('tagList', action.tagList)
    default:
      return initState
  }
}
