const actionTypes = {
  OPEN_ASIDE: 'common/OPEN_ASIDE',
  CLOSE_ASIDE: 'common/CLOSE_ASIDE'
}

export default actionTypes

export const openAside = () => ({
  type: actionTypes.OPEN_ASIDE
})

export const closeAside = () => ({
  type: actionTypes.CLOSE_ASIDE
})
