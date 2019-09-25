import Immutable from 'immutable'
import types from 'store/action/album'

const { fromJS } = Immutable

const defaultState = fromJS({
  albumCategoryList: []
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_ALBUM_CATEGORY_LIST:
      return initState.set('albumCategoryList', fromJS(action.albumCategoryList))
    default:
      return initState
  }
}
