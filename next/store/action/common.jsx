const actionTypes = {
  OPEN_ASIDE: 'common/open_aside',
  CLOSE_ASIDE: 'common/close_aside',
  INCREASE: 'common/increase'
}

export default actionTypes

export const openAside = () => ({
  type: actionTypes.OPEN_ASIDE
})

export const closeAside = () => ({
  type: actionTypes.CLOSE_ASIDE
})

export const increase = () => ({
  type: actionTypes.INCREASE
})
