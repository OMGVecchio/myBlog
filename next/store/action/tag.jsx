const actionTypes = {
  FETCH_LIST: 'tag/fetchlist',
  FILL_LIST: 'tag/filllist'
}

export default actionTypes

export const fetchList = clearCache => ({
  type: actionTypes.FETCH_LIST,
  clearCache
})

export const fillList = tagList => ({
  type: actionTypes.FILL_LIST,
  tagList
})
