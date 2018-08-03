const actionTypes = {
  FETCH_LIST: 'article/fetchlist',
  FILL_LIST: 'article/filllist',
  FETCH_DETAIL: 'article/fetchdetail',
  FILL_DETAIL: 'article/filldetail'
}

export default actionTypes

export const fetchList = () => ({
  type: actionTypes.FETCH_LIST
})
export const fillList = articleList => ({
  type: actionTypes.FILL_LIST,
  articleList
})

export const fetchDetail = articleId => ({
  type: actionTypes.FETCH_DETAIL,
  articleId
})
export const fillDetail = articleDetail => ({
  type: actionTypes.FILL_DETAIL,
  articleDetail
})
