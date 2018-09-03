import Immutable from 'immutable'
import types from 'store/action/article'

const defaultState = Immutable.fromJS({
  articleList: [],
  articleDetail: {},
  commentMap: {}
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FILL_LIST:
      return initState.set('articleList', action.articleList)
    case types.FILL_DETAIL:
      return initState.updateIn(['articleDetail', action.articleId], () => action.articleDetail)
    case types.FILL_COMMENT:
      return initState.updateIn(['commentMap', action.articleId], () => action.commentList)
    default:
      return initState
  }
}
