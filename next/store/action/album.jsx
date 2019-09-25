const actionTypes = {
  FETCH_ALBUM_CATEGORY_LIST: 'album/fetch_album_category_list'
}

export default actionTypes

export const setAlbumCategoryList = albumCategoryList => ({
  type: actionTypes.FETCH_ALBUM_CATEGORY_LIST,
  albumCategoryList
})
