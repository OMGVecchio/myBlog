import combineReducers from 'utils/combine-reducers'
import common from './modules/common'
import article from './modules/article'

const reducer = combineReducers({
  common,
  article
})

export default reducer
