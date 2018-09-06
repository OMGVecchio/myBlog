const actionTypes = {
  FETCH_LIST: 'article/fetchlist',
  FILL_LIST: 'article/filllist',
  FETCH_DETAIL: 'article/fetchdetail',
  FILL_DETAIL: 'article/filldetail',
  FETCH_COMMENT: 'article/fetchcomment',
  FILL_COMMENT: 'article/fillcomment',
  REMOVE_ARTICLE: 'article/removearticle',
  REMOVE_ARTICLE_DONE: 'article/removearticledone',
  ONLINE_ARTICLE: 'article/onlinearticle',
  ONLINE_ARTICLE_DONE: 'article/onlinearticledone'
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
export const fillDetail = (articleId, articleDetail) => ({
  type: actionTypes.FILL_DETAIL,
  articleId,
  articleDetail
})
export const fetchComment = articleId => ({
  type: actionTypes.FETCH_COMMENT,
  articleId
})
export const fillComment = (articleId, commentList) => ({
  type: actionTypes.FILL_COMMENT,
  articleId,
  commentList
})

export const removeArticle = articleId => ({
  type: actionTypes.REMOVE_ARTICLE,
  articleId
})
export const removeArticleDone = articleId => ({
  type: actionTypes.REMOVE_ARTICLE_DONE,
  articleId
})

export const onlineArticle = (articleId, online) => ({
  type: actionTypes.ONLINE_ARTICLE,
  articleId,
  online
})
export const onlineArticleDone = (articleId, online) => ({
  type: actionTypes.ONLINE_ARTICLE_DONE,
  articleId,
  online
})
