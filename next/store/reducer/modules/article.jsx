import Immutable from 'immutable'
import types from 'store/action/article'

const defaultState = Immutable.fromJS({
  articleList: []
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_LIST:
      return initState.set('articleList', action.articleList)
    default:
      return initState
  }
}
