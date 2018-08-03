import Immutable from 'immutable'
import types from 'store/action/article'

const defaultState = Immutable.fromJS({
  articleList: [],
  articleDetail: {}
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FILL_LIST:
      return initState.set('articleList', action.articleList)
    case types.FILL_DETAIL:
      return initState.set('articleDetail', action.articleDetail)
    default:
      return initState
  }
}
