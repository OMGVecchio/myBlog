import Immutable from 'immutable'
import types from 'store/action/article'

const { fromJS } = Immutable

const defaultState = fromJS({
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
    case types.REMOVE_ARTICLE_DONE:
      return initState.set('articleList', fromJS(initState.get('articleList').toJS().filter(article => article.id !== action.articleId)))
    case types.ONLINE_ARTICLE_DONE:
      return initState.set('articleList', fromJS(initState.get('articleList').toJS().map((article) => {
        const temp = article
        if (temp.id === action.articleId) {
          temp.online = action.online
        }
        return temp
      })))
    default:
      return initState
  }
}
