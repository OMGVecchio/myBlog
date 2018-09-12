import Immutable from 'immutable'
import types from 'store/action/common'

const defaultState = Immutable.fromJS({
  asideIsOpen: true,
  isLongScroll: false,
  pathname: '',
  globalProgress: false
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
    case types.SWITCH_MENU_ITEM:
      return initState.set('pathname', action.pathname)
    case types.SHOW_PROGRESS:
      return initState.set('globalProgress', true)
    case types.HIDE_PROGRESS:
      return initState.set('globalProgress', false)
    default:
      return initState
  }
}
