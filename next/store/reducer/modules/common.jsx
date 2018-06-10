import Immutable from 'immutable'
import types from 'store/action/common'

const defaultState = Immutable.fromJS({
  asideIsOpen: true,
  counter: 0
})

export default (initState = defaultState, action) => {
  switch (action.type) {
    case types.OPEN_ASIDE:
      return initState.set('asideIsOpen', true)
    case types.CLOSE_ASIDE:
      return initState.set('asideIsOpen', false)
    case types.INCREASE:
      return initState.set('counter', initState.get('counter') + 1)
    default:
      return initState
  }
}
