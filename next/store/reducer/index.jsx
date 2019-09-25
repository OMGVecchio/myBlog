import combineReducers from 'utils/combine-reducers'
import common from './modules/common'
import article from './modules/article'
import tag from './modules/tag'
import album from './modules/album'

const reducer = combineReducers({
  common,
  article,
  tag,
  album
})

export default reducer
