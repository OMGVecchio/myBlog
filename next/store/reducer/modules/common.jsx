import Immutable from 'immutable'
import types from 'store/action/common'

const defaultState = Immutable.fromJS({
  asideIsOpen: true,
  isLongScroll: false
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.OPEN_ASIDE:
      return initState.set('asideIsOpen', true)
    case types.CLOSE_ASIDE:
      return initState.set('asideIsOpen', false)
    case types.SHOW_HEADER_SHADOW:
      return initState.set('isLongScroll', true)
    case types.HIDE_HEADER_SHADOW:
      return initState.set('isLongScroll', false)
    default:
      return initState
  }
}
