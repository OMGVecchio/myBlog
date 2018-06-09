import Immutable from 'immutable'
import types from 'store/action/common'

const defaultState = Immutable.fromJS({
  asideIsOpen: true
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.OPEN_ASIDE:
      return initState.set('asideIsOpen', true)
    case types.CLOSE_ASIDE:
      return initState.set('asideIsOpen', false)
    default:
      return initState
  }
}
