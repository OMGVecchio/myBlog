const actionTypes = {
  FETCH_LIST: 'article/fetchlist'
}

export default actionTypes

export const fetchListData = () => ({
  type: actionTypes.FETCH_LIST
})
