const actionTypes = {
  FETCH_LIST: 'tag/fetchlist',
  FILL_LIST: 'tag/filllist'
}

export default actionTypes

export const fetchList = () => ({
  type: actionTypes.FETCH_LIST
})

export const fillList = tagList => ({
  type: actionTypes.FILL_LIST,
  tagList
})
