import Immutable from 'immutable'
import types from 'store/action/tag'

const { fromJS } = Immutable

const defaultState = fromJS({
  tagList: []
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FILL_LIST:
      return initState.set('tagList', fromJS(action.tagList))
    default:
      return initState
  }
}
