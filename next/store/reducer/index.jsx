import combineReducers from 'utils/combine-reducers'
import common from './modules/common'
import article from './modules/article'
import tag from './modules/tag'

const reducer = combineReducers({
  common,
  article,
  tag
})

export default reducer
